import chalk from 'chalk';
import arg from 'arg';

import fs from 'fs';
import { Buffer } from 'buffer';

import { createSpinner } from 'nanospinner';

import { validatePath } from '../utils/validate.js';
import { pathPrompt, exitPrompt } from '../utils/prompts.js';

const helpMessage = `
${chalk.bold.cyan("md-todo")}
${chalk.bold.gray("by c0alfox")}

Usage:
md-todo [path] [--port / -p] [--encoding / -e] [--help]

Arguments:

path (String / Path): the path to an existing *.md file. If it's not explicitly said in the arguments or if it is invalid it'll be asked once you run the app
--port / -p (Number - Default: 5000): the port to which the local server is going to be opened
--encoding / -e (String - Default: 'utf-8'): one of the supported nodejs buffer encodings - read more at https://nodejs.org/api/buffer.html#buftostringencoding-start-end
--help: shows this help message
`;

async function parseArguments(rawArgs) {
    const args = arg(
        {
            '--help': Boolean,
            '--port': Number,
            '--encoding': String,

            '-p': '--port',
            '-e': '--encoding'
        },
        {
            argv: rawArgs.slice(2),
        }
    );

    if (args['--help']) {
        console.log(helpMessage);
        process.exit(0);
    }

    let isPathValid = validatePath(args._[0], false);
    if (!isPathValid)
        console.log(`${chalk.bold.blueBright("INFO")} - Path is missing or not valid`);
    
    let isEncodingValid = !args['--encoding'] || Buffer.isEncoding(args['--encoding']);
    if (!isEncodingValid) {
        console.log(`${chalk.bold.redBright("ERROR")} - ${args['--encoding']} is not a valid file encoding`);
        await exitPrompt("Encoding is not valid, should we default to utf-8 and continue?", false);
    }

    return {
        path: isPathValid ? args._[0] : undefined,
        port: args['--port'] || 5000,
        encoding: args['--encoding'] || 'utf-8'
    };
}

export async function cli(args) {
    let options = await parseArguments(args);
    options = await pathPrompt(options);

    const fileLoadingSpinner = createSpinner('Loading File...').start();

    let rawData;
    try {
        rawData = await fs.promises.readFile(options.path);
    } catch (err) {
        fileLoadingSpinner.error({ text: 'Error while loading file' })
        throw err;
    }

    fileLoadingSpinner.success({ text: 'File loaded successfully!' });

    return {
        fileBuffer: rawData,
        encoding: options.encoding
    };
}