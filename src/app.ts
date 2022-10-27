import web3 from 'web3';
import { ABI, ContractAddress } from './contract.json';
import { PRIV_KEY } from './config.json'
import { getInternalType, getName, getType } from './input';
import { Account } from 'web3-core';

//Connect to the network
const AutobahnNetwork = new web3('https://autobahn-rpc.com');

//Attemp to set up default wallet from PRIV_KEY
let callerWallet: Account;

try {
    callerWallet = AutobahnNetwork.eth.accounts.wallet.add(PRIV_KEY);
} catch (error) {
    console.error("Invalid Private key supplied. Please check config.json!");
    process.exit(1);
}

//Set up contract
const carWashContract = new AutobahnNetwork.eth.Contract(ABI as any, ContractAddress)



async function main() {
    //Get the parameters for the contract call
    const internalType = await getInternalType();
    const name = await getName();
    const type = await getType();
    
    //Little handy function to help estimate gas cost in a bit
    const estimateGasCost = async (): Promise<number> => carWashContract.methods.washCar(internalType, name, type).estimateGas({ from: callerWallet.address });
    
    try {
        //Estimating the gas cost for the Contract call
        const estimatedGasCost = await estimateGasCost();

        //Using the send function because we actually trigger functionality that uses Gas and potentially alters the Contracts state
        const result = await carWashContract.methods.carWash(internalType, name, type).send({ from: callerWallet.address, gas: estimatedGasCost })

        //Should this step be successful, we can output a success message to our user
        console.log('Car has been successfully washed! How shiny!');

        //Now we can gracefully exit
        process.exit(0);

    } catch (error) {
        //We report the error back to the user and exit.
        console.error('Transaction failed. Additional information will be provided below.');
        console.error(error);
        console.error('Exiting..');
        process.exit(1);
    }
}

main();


