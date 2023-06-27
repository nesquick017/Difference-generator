import _ from 'lodash';

const replacer = ' ';
const doubleSpace = '  ';
const spacesCount = 4;
const getIndent = (depth) => replacer.repeat(depth * spacesCount).slice(0, -2);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const lines = Object.entries(value).map(
    ([key, val]) => `${getIndent(depth + 1)}${doubleSpace}${key}: ${stringify(val, depth + 1)}`,
  );
  return `{\n${lines.join('\n')}\n${getIndent(depth)}${doubleSpace}}`;
};

export default function stylish(element, depth = 1) {
  const result = element.map((node) => {
    const {
      type, key, value, oldValue, newValue, children,
    } = node;
    switch (type) {
      case 'deleted': {
        return `${getIndent(depth)}- ${key}: ${stringify(value, depth)}`;
      }
      case 'added': {
        return `${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
      }
      case 'changed': {
        return `${getIndent(depth)}- ${key}: ${stringify(newValue, depth)}\n${getIndent(
          depth,
        )}+ ${key}: ${stringify(oldValue, depth)}`;
      }
      case 'nested': {
        return `${getIndent(depth)}  ${key}: ${stylish(children, depth + 1)}`;
      }
      case 'unchanged': {
        return `${getIndent(depth)}  ${key}: ${stringify(value, 1)}`;
      }
      default: {
        throw new Error(`Unknown type ${type}!`);
      }
    }
  });
  return `{\n${result.join('\n')}\n${getIndent(depth).slice(2)}}`;
}
