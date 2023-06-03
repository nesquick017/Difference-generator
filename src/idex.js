/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import parser from './parser.js';
import buildTree from './comparer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getType = (filePath) => path.extname(filePath).slice(1);
const getFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
export { getFile, getType, getFixturePath };


const makeCompare = (fileName1, fileName2) => {
    const path1 = getFixturePath(fileName1);
    const path2 = getFixturePath(fileName2);
    const file1 = parser(getFile(path1), getType(path1));
    const file2 = parser(getFile(path2), getType(path2));
    return buildTree(file1, file2);
};
export default makeCompare;
