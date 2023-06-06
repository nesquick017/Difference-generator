import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import parser from '../src/parser.js';
import { resStylish, resPlain, resJSON } from '../__fixtures__/result.js';
import genDifference, { getFile, getType, getFixturePath } from '../src/index.js';

const fileJson = fs.readFileSync(getFixturePath('file1.json'), 'utf-8');
const fileYaml = fs.readFileSync(getFixturePath('file1.yaml'), 'utf-8');
const parsedFileJson = JSON.parse(fileJson);
const parsedFileYaml = yaml.load(fileYaml);
const expectedPathJSON = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '__fixtures__',
  'file1.json'
);
const expectedPathYml = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  '__fixtures__',
  'file1.yml'
);

test('getType should give us a type of file depends on extension', () => {
  expect(getType('file1.yaml')).toEqual('yaml');
  expect(getType('file1.json')).toEqual('json');
});

test('getFile should give us a proper file depends on extension', () => {
  expect(getFile(getFixturePath('file1.json'))).toEqual(fileJson);
  expect(getFile(getFixturePath('file1.yaml'))).toEqual(fileYaml);
});

test('getFixturePath should return the correct fixture path', () => {
  expect(getFixturePath('file1.json')).toEqual(expectedPathJSON);
  expect(getFixturePath('file1.yml')).toEqual(expectedPathYml);
});

test('parser should give file depends on extension', () => {
  expect(parser(getFile(getFixturePath('file1.json')), getType('file1.json'))).toEqual(
    parsedFileJson
  );
  expect(parser(getFile(getFixturePath('file1.yaml')), getType('file1.yaml'))).toEqual(
    parsedFileYaml
  );
  expect(parser(getFile(getFixturePath('file1.yml')), getType('file1.yml'))).toEqual(
    parsedFileYaml
  );
});

test('gendiff --format  should return correct result depends on format and extension', () => {
  expect(genDifference('file1.yml', 'file2.yml')).toEqual(resStylish);
  expect(genDifference('file1.json', 'file2.json', 'json')).toEqual(resJSON);
  expect(genDifference('file1.yaml', 'file2.yaml', 'plain')).toEqual(resPlain);
  expect(genDifference('file1.json', 'file2.json', 'txt')).toEqual('Wrong formatter type txt');
});
