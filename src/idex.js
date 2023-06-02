/* eslint-disable no-undef */
import path from 'path';
import fs from 'fs';
import parser from './parser.js';
import buildTree from './comparer.js';

const getType = (filePath) => path.extname(filePath).slice(1);
const getFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
export { getFile, getType };

const makeCompare = (filePath1, filePath2) => {
    const fullPath1 = path.resolve(process.cwd(), '__fixtures__', filePath1);
    const fullPath2 = path.resolve(process.cwd(), '__fixtures__', filePath2);
    const file1 = parser(getFile(fullPath1), getType(fullPath1));
    const file2 = parser(getFile(fullPath2), getType(fullPath2));
    return buildTree(file1, file2);
};
export default makeCompare;
