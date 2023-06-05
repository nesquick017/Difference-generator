import stylish from '../formatters/stylish.js';
import plain from './plain.js';
import json from './json.js';
const formatter = (data, format) => {
    switch (format) {
        case 'stylish': {
            return stylish(data);
        }
        case 'plain': {
            return plain(data);
        }
        case 'json': {
            return json(data);
        }
        default: {
            return `Wrong formatter type ${format}`;
        }
    }
};
export default formatter;
