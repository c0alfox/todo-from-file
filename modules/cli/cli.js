#! usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import arg from 'arg';
import { createSpinner } from 'nanospinner';
import path from 'path';
import fs from 'fs';

function validatePath(input, returnErrorStrings) {
    if (typeof returnErrorStrings != 'boolean')
        throw TypeError('returnErrorStrings must be a Boolean type')

    // A path is required -- checking if the input exists and normalizing it
    if (!input)
        return returnErrorStrings 
            ? `${chalk.bold.redBright('ERROR')} - Path is required` 
            : false;
    
    let normalizedPath = path.normalize(input);

    // Checking if the path leads to a *.md file.
    const extension = /\.md\n?$/;

    if (!extension.test(normalizedPath)) 
        return returnErrorStrings 
            ? `${chalk.bold.redBright('ERROR')} - Path must point to an existing *.md file` 
            : false;

    if(!path.isAbsolute(normalizedPath))
        normalizedPath = path.join(process.cwd(), normalizedPath);

    if (!fs.existsSync(normalizedPath))
        return returnErrorStrings 
            ? `${chalk.bold.redBright('ERROR')} - Path must point to an existing *.md file` 
            : false;

    return true;
}

function parseArguments(rawArgs) {
    const args = arg(
        {
            '--port': Number,

            '-p': '--port',
        },
        {
            argv: rawArgs.slice(2),
        }
    );

    try {
        let validPath = validatePath(args._[0], false);

        if (!validPath)
            console.log(`${chalk.bold.blueBright("INFO")} - Path is missing or not valid`);

        return {
            path: validPath ? args._[0] : undefined,
            port: args['--port'] || 5000,
        };
    } catch (error) {
        throw error;
    }
}

async function pathPrompt(args) {
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

export async function cli(args) {
    let options = parseArguments(args);
    options = await pathPrompt(options);

    const fileLoadingSpinner = createSpinner("Loading File...").start();


    let rawData;
    try {
        rawData = await fs.promises.readFile(options.path);
    } catch (err) {
        fileLoadingSpinner.error({ text: 'Error while loading file' })
        throw err;
    }

    fileLoadingSpinner.success({ text: 'File loaded successfully!' });

    return rawData;
}