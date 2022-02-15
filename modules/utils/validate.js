import path from 'path';
import chalk from 'chalk';
import fs from 'fs';

export function validatePath(input, returnErrorStrings) {
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