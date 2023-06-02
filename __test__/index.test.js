/* eslint-disable no-undef */
import { noFlat } from '../__fixtures__/result.js';
import makeCompare from '../src/idex.js';
import { getFile, getType } from '../src/idex.js';
import fs from 'fs';
import getString from '../src/formatters/stylish.js';

const fileName1 = 'file1.json';
const fileName2 = 'file2.json';
const resultGetFile = fs.readFileSync(
    '/Users/nikita_mac/Documents/frontend-project-46/__fixtures__/file1.json',
    'utf-8'
);

test('makeCompare should return the difference', () => {
    expect(getString(makeCompare(fileName1, fileName2))).toEqual(noFlat);
});

test('getType should give us a type of file', () => {
    expect(getType('file1.json')).toEqual('json');
});

test('readFile should give us a proper file', () => {
    expect(
        getFile(
            '/Users/nikita_mac/Documents/frontend-project-46/__fixtures__/file1.json'
        )
    ).toEqual(resultGetFile);
});
