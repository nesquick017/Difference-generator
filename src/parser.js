import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const getFixturePath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
const getFile = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getType = (filepath) => path.extname(filepath).slice(1);

export default function parser(filepath) {
  const type = getType(filepath);
  const file = getFile(getFixturePath(filepath));
  switch (type) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
      return yaml.load(file);
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`Unknown type ${file}!`);
  }
}
