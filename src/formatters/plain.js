import _ from 'lodash';

const complexValue = (value) => {
  if (_.isObjectLike(value)) return `[complex value]`;
  if (typeof value === 'string') return `'${value}'`;
  return `${value}`;
};

const plain = (data) => {
  const iter = (obj, path = [data.key], depth = 1) => {
    const result = obj.flatMap((el) => {
      switch (el.type) {
        case 'nested': {
          return iter(el.children, [...path, el.key], depth + 1);
        }
        case 'deleted': {
          return `Property '${[...path, el.key].join('.')}' was removed`;
        }
        case 'added': {
          return `Property '${[...path, el.key].join('.')}' was added with value: ${complexValue(el.value)}`;
        }
        case 'changed': {
          return `Property '${[...path, el.key].join('.')}' was updated. From ${complexValue(el.newValue)} to ${complexValue(el.oldValue)}`;
        }
        case 'unchanged': {
          return [];
        }
      }
    });
    return result.join('\n');
  };
  return iter(data, [], 1);
};
export default plain;
