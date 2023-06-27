import _ from 'lodash';

const replacer = ' ';
const doubleSpace = '  ';
const spacesCount = 4;
const space = (depth) => '    '.repeat(depth - 1);
const getIndent = (depth) => replacer.repeat(depth * spacesCount).slice(0, -2);

const getString = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return String(data);
  }
  const str = Object.entries(data).map(
    ([key, value]) => `${getIndent(depth + 1)}${doubleSpace}${key}: ${getString(value, depth + 1)}`,
  );
  return `{\n${str.join('\n')}\n${space(depth + 1)}}`;
};

const stylish = (tree, depth = 1) => {
  const result = tree.map((node) => {
    // eslint-disable-next-line object-curly-newline
    const { key, value, type, oldValue, newValue } = node;

    switch (type) {
      case 'nested': {
        return `${getIndent(depth)}${doubleSpace}${key}: ${stylish(value, depth + 1)}`;
      }
      case 'added': {
        return `${getIndent(depth)}+ ${key}: ${getString(value, depth)}`;
      }
      case 'deleted': {
        return `${getIndent(depth)}- ${key}: ${getString(value, depth)}`;
      }
      case 'unchanged': {
        return `${getIndent(depth)}  ${key}: ${getString(value, depth)}`;
      }
      case 'changed': {
        return `${getIndent(depth)}- ${key}: ${getString(oldValue, depth)}\n${getIndent(
          depth,
        )}+ ${key}: ${getString(newValue, depth)}`;
      }
      default: {
        throw new Error('wrong error');
      }
    }
  });
  return `{\n${result.join('\n')}\n${space(depth)}}`;
};

export default stylish;
