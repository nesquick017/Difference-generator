/* eslint-disable no-undef */
import path from 'path';
import fs from 'fs';
import parser from './parser.js';
import buildTree from './comparer.js';

const makeCompare = (filePath1, filePath2) => {
    const getType = (filePath) => path.extname(filePath).slice(1);
    const readFile = (filePath) => fs.readFileSync(filePath);

    const fullPath1 = path.resolve(process.cwd(), '__fixtures__', filePath1);
    const fullPath2 = path.resolve(process.cwd(), '__fixtures__', filePath2);
    const file1 = parser(readFile(fullPath1), getType(fullPath1));
    const file2 = parser(readFile(fullPath2), getType(fullPath2));

    return buildTree(file1, file2);
};
export default makeCompare;
