#! /usr/bin/env node

import { cli } from './modules/cli/cli.js';
import { decode } from './modules/decode/decode.js';

let data = await cli(process.argv);
data = await decode(data.fileBuffer, data.encoding);
console.log(data);