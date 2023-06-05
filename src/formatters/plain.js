import _ from 'lodash';

const plain = (data) => {
    const iter = (obj, path = [data.key], depth = 1) => {
        const result = obj.flatMap((el) => {
            switch (el.type) {
                case 'nested': {
                    return iter(el.children, [...path, el.key], depth + 1);
                }
                case 'deleted': {
                    return `Property ${[...path, el.key].join('.')} was removed`;
                }
                case 'added': {
                    return `Property ${[...path, el.key].join('.')} was added with value: ${el.value} `;
                }
                case 'changed': {
                    return `Property ${[...path, el.key].join('.')} updated from ${el.newValue} to ${el.oldValue}`;
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
