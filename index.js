#! /usr/bin/env node

import { cli } from './modules/cli/cli.js'

let data = await cli(process.argv);

console.log(data.toString('utf-8'));