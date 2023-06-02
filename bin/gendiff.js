#!/usr/bin/env node
/* eslint-disable no-undef */

import { program } from 'commander';

program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format, <type>', 'output format', 'stylish')
    .parse(process.argv);
