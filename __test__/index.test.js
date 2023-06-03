import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parser from '../src/parser.js';
import getString from '../src/formatters/stylish.js';
import { noFlat } from '../__fixtures__/result.js';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import { getType, getFixturePath, getFile, makeCompare } from '../src/idex.js';

const expectedPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__', 'file1.json');
const fileJson = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
const fileYaml = fs.readFileSync(getFixturePath('file1.yaml'), 'utf-8');
const parsedFileJson = JSON.parse(fileJson);
const parsedFileYaml = yaml.load(fileJson);

test('getFixturePath should return the correct fixture path', () => {
    expect(getFixturePath('file1.json')).toBe(expectedPath);
});

test('makeCompare should return the difference between files', () => {
    expect(getString(makeCompare('file1.json', 'file2.json'))).toEqual(noFlat);
    expect(getString(makeCompare('file1.yaml', 'file2.yaml'))).toEqual(noFlat);
});

test('getType should give us a type of file depends on extension', () => {
    expect(getType('file1.yaml')).toEqual('yaml');
    expect(getType('file1.json')).toEqual('json');
});
test('getFile should give us a proper file depends on extension', () => {
    expect(getFile(getFixturePath('file1.json'))).toEqual(fileJson);
    expect(getFile(getFixturePath('file1.yaml'))).toEqual(fileYaml);
});
test('parser should give file depends on extension', () => {
    expect(parser(getFile(getFixturePath('file1.json')), getType('file1.json'))).toEqual(parsedFileJson);
    expect(parser(getFile(getFixturePath('file1.yaml')), getType('file1.yaml'))).toEqual(parsedFileYaml);
});
