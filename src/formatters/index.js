import stylish from '../formatters/stylish.js';

const formatter = (data, format) => {
    switch (format) {
        case 'stylish': {
            return stylish(data);
        }
    }
};
export default formatter;
