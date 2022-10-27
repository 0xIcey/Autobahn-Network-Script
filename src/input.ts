import inquirer from 'inquirer';

let prompt = inquirer.createPromptModule();
//Get Parameters for the Contract call

export async function getInternalType() {

    const result = await prompt({
        message: "Input internalType: ",
        type: "input",
        name: "internalType",
    });

    if (result) {
        return result.internalType;
    } else {
        throw {}
    }

}

export async function getName() {

    const result = await prompt({
        message: "Input name: ",
        type: "input",
        name: "name"
    });

    if (result) {
        return result.name;
    } else {
        throw {}
    }
}

export async function getType() {

    const result = await prompt({
        message: "Input type: ",
        type: "input",
        name: "type"
    });

    if (result) {
        return result.type;
    } else {
        throw {}
    }

}