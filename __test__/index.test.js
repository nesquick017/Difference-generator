/* eslint-disable no-undef */
import { noFlat } from '../__fixtures__/result.js';
import { getType, getFixturePath, getFile } from '../src/idex.js';
import { fileURLToPath } from 'url';
import fs from 'fs';
import makeCompare from '../src/idex.js';
import path from 'path';
import getString from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file1 = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');

test('returns the correct fixture path', () => {
    const expectedPath = path.join(__dirname, '..', '__fixtures__', 'file1.json');
    expect(getFixturePath('file1.json')).toBe(expectedPath);
});

test('makeCompare should return the difference', () => {
    expect(getString(makeCompare('file1.json', 'file2.json'))).toEqual(noFlat);
});

test('getType should give us a type of file', () => {
    expect(getType('file1.json')).toEqual('json');
});
test('getFile should give us a proper file', () => {
    expect(getFile(getFixturePath('file1.json'))).toEqual(file1);
});
