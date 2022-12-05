import inquirer from "inquirer";

let prompt = inquirer.createPromptModule();
//Get Parameters for the Contract call

export async function getTokenId() {
  const result = await prompt({
    message: "Input tokenId: ",
    type: "input",
    name: "tokenId",
  });

  if (result) {
    return result.tokenId;
  } else {
    throw {};
  }
}

export async function holdBeforeExit(code: number) {
  const res = await prompt({
    message: "Press the enter key to exit..",
    name: "if this isnt here it does not wait",
  });

  if (res) {
    process.exit(code);
  }
}
