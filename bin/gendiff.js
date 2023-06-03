#!/usr/bin/env node
/* eslint-disable no-undef */

import { program } from 'commander';
import makeCompare from '../src/idex.js';
import getString from '../src/formatters/stylish.js';
const gendiff = program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format, <type>', 'output format', 'stylish')
    .action((filepath1, filepath2) => console.log(getString(makeCompare(filepath1, filepath2))))
    .parse(process.argv);
export default gendiff;
