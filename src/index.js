/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import { fileURLToPath } from 'url';
import formatter from './formatters/index.js';
import getComparison from './comparer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getType = (filePath) => path.extname(filePath).slice(1);
const getFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
export { getFile, getType, getFixturePath };

export default function genDifference(fileName1, fileName2, format = 'stylish') {
    const file1 = parser(getFile(getFixturePath(fileName1)), getType(getFixturePath(fileName1)));
    const file2 = parser(getFile(getFixturePath(fileName2)), getType(getFixturePath(fileName1)));
    return formatter(getComparison(file1, file2), format);
}
