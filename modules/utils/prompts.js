import inquirer from 'inquirer';

import { validatePath } from './validate.js';

export async function exitPrompt(text, exitAt) {
    if (typeof text != 'string')
        throw TypeError("text argument must be a string")

    if (typeof exitAt != 'boolean')
        throw TypeError("exitAt must be a boolean")

    let answer = await inquirer.prompt({
        name: 'ans',
        type: 'confirm',
        message: text
    });

    if (!answer.ans)
        process.exit(0);
    else
        return answer.ans;
}

export async function pathPrompt(args) {
    if (args.path)
        return args;

    let newPath = await inquirer.prompt({
        name: 'path',
        type: 'input',
        message: 'Insert a valid path to a *.md file',
        validate: (input) => validatePath(input, true)
    });

    return {
        ...args,
        path: newPath.path
    };
}