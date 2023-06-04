import _ from 'lodash';

const replacer = ' ';
const doubleSpace = replacer.repeat(2);
const spacesCount = 4;
const space = (depth) => '    '.repeat(depth - 1);

const getIndent = (depth) => replacer.repeat(depth * spacesCount).slice(0, -2);

const stringify = (value, depth) => {
    if (!_.isPlainObject(value)) {
        return String(value);
    }
    const lines = Object.entries(value).map(([key, val]) => `${getIndent(depth + 1)}${doubleSpace}${key}: ${stringify(val, depth + 1)}`);
    return `{\n${lines.join('\n')}\n${getIndent(depth)}${doubleSpace}}`;
};

export default function stylish(element, depth = 1) {
    const result = element.map((node) => {
        switch (node.type) {
            case 'deleted': {
                return `${getIndent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
            }
            case 'added': {
                return `${getIndent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
            }
            case 'changed': {
                return `${getIndent(depth)}- ${node.key}: ${stringify(node.newValue, depth)}\n${getIndent(depth)}+ ${node.key}: ${stringify(node.oldValue, depth)}`;
            }
            case 'nested': {
                return `${getIndent(depth)}  ${node.key}: ${stylish(node.children, depth + 1)}`;
            }
            case 'unchanged': {
                return `${getIndent(depth)}  ${node.key}: ${stringify(node.value, 1)}`;
            }
        }
    });
    return `{\n${result.join('\n')}\n${space(depth)}}`;
}
