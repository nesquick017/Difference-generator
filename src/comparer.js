import _ from 'lodash';

const buildTree = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    const sortedKeys = _.sortBy(keys);
    const result = sortedKeys.map((key) => {
        if (_.has(obj1, key) && _.has(obj2, key)) {
            if (obj1[key] === obj2[key]) return `    ${key}: ${obj1[key]}`;
        }
        if (!_.has(obj1, key)) {
            return `  + ${key}: ${obj2[key]}`;
        }
        if (!_.has(obj2, key)) {
            return `  - ${key}: ${obj1[key]}`;
        }
        if (obj1[key] !== obj2[key]) {
            return `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
        }
    });
    return `{\n${result.join('\n')}\n}`;
};
export default buildTree;
