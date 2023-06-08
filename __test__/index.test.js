/* eslint-disable import/no-extraneous-dependencies */
import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parser from '../src/parser.js';
import genDifference from '../src/index.js';

const getFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getFixturePath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
const getTxtResult = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf8');

test('gendiff --format  should return correct string depends on the formatter. Stylish by default.', () => {
  expect(genDifference('file1.yml', 'file2.yml')).toEqual(getTxtResult('resultStylish.txt'));
  expect(genDifference('file1.json', 'file2.json', 'json')).toEqual(getTxtResult('resultJSON.txt'));
  expect(genDifference('file1.yaml', 'file2.yaml', 'plain')).toEqual(
    getTxtResult('resultPlain.txt'),
  );
});

test('parser should return correct file', () => {
  expect(parser('file1.json')).toEqual(JSON.parse(getFile(getFixturePath('file1.json'))));
  expect(parser('file1.yaml')).toEqual(yaml.load(getFile(getFixturePath('file1.yaml'))));
  expect(parser('file1.yaml')).toEqual(yaml.load(getFile(getFixturePath('file1.yml'))));
});
