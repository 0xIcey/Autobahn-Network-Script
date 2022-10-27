import inquirer from 'inquirer';

let prompt = inquirer.createPromptModule();
//Get Parameters for the Contract call

export async function getInternalType() {
    return new Promise((reject, resolve) => {
        prompt({
            message: "Input internalType: ",
            type: "input",
            name: "internalType"
        }).then((answer) => {
            resolve(answer.internalType);
        }).catch((error) => {
            reject(error);
        })
    })
}

export async function getName() {
    return new Promise((reject, resolve) => {
        prompt({
            message: "Input name: ",
            type: "input",
            name: "name"
        }).then((answer) => {
            resolve(answer.name);
        }).catch((error) => {
            reject(error);
        })
    })
}

export async function getType() {
    return new Promise((reject, resolve) => {
        prompt({
            message: "Input type: ",
            type: "input",
            name: "type"
        }).then((answer) => {
            resolve(answer.type);
        }).catch((error) => {
            reject(error);
        })
    })
}