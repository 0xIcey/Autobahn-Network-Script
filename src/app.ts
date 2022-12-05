import web3 from "web3";
import { ABI, ContractAddress } from "./contract.json";
import { getTokenId, holdBeforeExit } from "./input";
import { Account } from "web3-core";
import cron from "node-cron";
import { checkForFirstStart } from "./util";

//Connect to the network
const AutobahnNetwork = new web3("https://autobahn-rpc.com");

//Attemp to set up default wallet from PRIV_KEY
let callerWallet: Account;

let priv_key: string = "";
let token_ids: string[] = [];

async function setKeyAndTokenIds() {
  try {
    const config = await checkForFirstStart();
    priv_key = config.PRIVATE_KEY;
    token_ids = config.TOKEN_IDS;
    console.log(token_ids);
    callerWallet = AutobahnNetwork.eth.accounts.wallet.add(priv_key);
    console.log("Connected to wallet", callerWallet.address);
  } catch (error) {
    console.error("Invalid Private key supplied. Please check config.json!");
    await holdBeforeExit(1);
  }
}

//Set up contract
const carWashContract = new AutobahnNetwork.eth.Contract(
  ABI as any,
  ContractAddress
);

//We figure out if we got tokenIds defined in the config, otherwise we ask for one.
//If we do have one, we can safely enable node-cron

async function main() {
  try {
    await setKeyAndTokenIds();
    const tokensInConfig = token_ids[0] ? true : false;

    if (tokensInConfig) {
      cron.schedule("0 * * * *", main);
      console.log(
        "Detected token(s) written to config. Starting automated washing every day!"
      );
    }

    if (tokensInConfig) {
      const allTokenIds = token_ids;

      for await (const tokenId of allTokenIds) {
        await washCar(tokenId);
      }

      console.log('Cleaned all cars for today!')
    } else {
      const tokenId = await getTokenId();
      await washCar(tokenId);
      holdBeforeExit(0);
    }
  } catch {
    holdBeforeExit(1);
  }
}

async function washCar(tokenId: string) {
  //Little handy function to help estimate gas cost
  const estimateGasCost = async (): Promise<number> =>
    carWashContract.methods
      .carWash(tokenId)
      .estimateGas({ from: callerWallet.address });

  try {
    //Estimating the gas cost for the Contract call

    //Estimating gas cost currently does not work on the proxy contract. Using static value
    //const estimatedGasCost = await estimateGasCost();

    //Using the send function because we actually trigger functionality that uses Gas and potentially alters the Contracts state
    const result = await carWashContract.methods
      .carWash(tokenId)
      .send({ from: callerWallet.address, gas: 25000 });
    //Should this step be successful, we can output a success message to our user
    console.log(
      `Car with tokenId ${tokenId} has been successfully washed! How shiny!`
    );
  } catch (error) {
    //We report the error back to the user and exit.
    console.error(error);
    console.error(
      `\nTransaction failed on tokenId ${tokenId}. Additional information above.`
    );
  }
}

main();
