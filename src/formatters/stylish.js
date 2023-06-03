import _ from 'lodash';

const replacer = ' ';
const doubleSpace = '  ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount).slice(0, -2);

const stringify = (value, depth) => {
    if (!_.isPlainObject(value)) {
        return String(value);
    }
    const lines = Object.entries(value).map(([key, val]) => `${getIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);
    return `{\n${lines.join('\n')}\n${getIndent(depth)}${doubleSpace}}`;
};

export { stringify };

const getString = (obj) => {
    const iter = (element, depth = 1) => {
        const result = element.map((node) => {
            switch (node.type) {
                case 'deleted': {
                    return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
                }
                case 'added': {
                    return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
                }
                case 'unchanged': {
                    return `${getIndent(depth)}${doubleSpace}${node.key}: ${stringify(node.value, 1)}`;
                }
                case 'changed': {
                    return `${getIndent(depth)}- ${node.key}: ${stringify(node.newValue, depth)}\n${getIndent(depth)}+ ${node.key}: ${stringify(node.oldValue, depth)}`;
                }
                case 'nested': {
                    return `${getIndent(depth)}  ${node.key}: ${iter(node.children, depth + 1)}`;
                }
            }
        });
        if (result.length > 1 && depth === 1) {
            return `{\n${result.join('\n')}\n${getIndent(depth - 1)}}`;
        }
        return `{\n${result.join('\n')}\n${getIndent(depth - 1)}${doubleSpace}}`;
    };
    return iter(obj, 1);
};
export default getString;
