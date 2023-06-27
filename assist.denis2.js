// тут версия из кода который я прям с твоего коммита взял в треде.

//твой поправленный код: 
import _ from 'lodash';

const addSpace = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);
const space = (depth) => '    '.repeat(depth - 1);
const getString = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return `${data}`;
  }
  const str = Object.entries(data).map(
    ([key, value]) => `${addSpace(depth + 1)}  ${key}: ${getString(value, depth + 1)}`,
  );
  return `{\n${str.join('\n')}\n${addSpace(depth)}  }`;
};

const stylish = (tree) => {
  const iter = (obj, depth = 1) => {
    const str = obj.map((node) => {
      const { key, value, type } = node;

      switch (type) {
        case 'added':
          return `${addSpace(depth)}+ ${key}: ${getString(value, depth)}`;
        case 'deleted':
          return `${addSpace(depth)}- ${key}: ${getString(value, depth)}`;
        case 'unchanged':
          return `${addSpace(depth)}  ${key}: ${getString(value, depth)}`;
        case 'changed':
          return `${addSpace(depth)}- ${key}: ${getString(node.oldValue, depth)}\n${addSpace(
            depth,
          )}+ ${key}: ${getString(node.newValue, depth)}`;
        case 'nested':
          return `${addSpace(depth)}  ${key}: ${iter(value, depth + 1)}`;
        default:
          throw new Error('Unknow type');
      }
    });
    return `{\n${str.join('\n')}\n${addSpace(depth).slice(2)}}`;
  };
  return `${iter(tree)}`;
};
export default stylish;
