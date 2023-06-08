/* eslint-disable import/no-extraneous-dependencies */
import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import parser from '../src/parser.js';
import genDifference from '../src/index.js';
import resultPlain from '../__fixtures__/resultPlain.js';
import reultJSON from '../__fixtures__/resultJSON.js';
import resultStylish from '../__fixtures__/resultStylish.js';

const getFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getFixturePath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);

test('gendiff --format  should return correct result depends on format and extension', () => {
  expect(genDifference('file1.yml', 'file2.yml')).toEqual(resultStylish);
  expect(genDifference('file1.json', 'file2.json', 'json')).toEqual(reultJSON);
  expect(genDifference('file1.yaml', 'file2.yaml', 'plain')).toEqual(resultPlain);
});

test('parser should return correct file', () => {
  expect(parser('file1.json')).toEqual(JSON.parse(getFile(getFixturePath('file1.json'))));
  expect(parser('file1.yaml')).toEqual(yaml.load(getFile(getFixturePath('file1.yaml'))));
  expect(parser('file1.yaml')).toEqual(yaml.load(getFile(getFixturePath('file1.yml'))));
});
