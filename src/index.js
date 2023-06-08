import parser from './parser.js';
import formatDiff from './formatters/index.js';
import buildTree from './buildTree.js';

export default function genDifference(fileName1, fileName2, format = 'stylish') {
  const file1 = parser(fileName1);
  const file2 = parser(fileName2);
  return formatDiff(buildTree(file1, file2), format);
}
