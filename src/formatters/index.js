import stylish from '../formatters/stylish.js';
import plain from './plain.js';
const formatter = (data, format) => {
    switch (format) {
        case 'stylish': {
            return stylish(data);
        }
        case 'plain': {
            return plain(data);
        }
    }
};
export default formatter;
