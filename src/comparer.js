/* eslint-disable no-param-reassign */
import _ from 'lodash';

const getComparison = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    const sortedKeys = _.sortBy(keys);
    const result = sortedKeys.map((key) => {
        const value1 = obj1[key];
        const value2 = obj2[key];
        if (_.isObject(value1) && _.isObject(value2)) {
            return {
                key,
                type: 'nested',
                children: getComparison(obj1[key], obj2[key]),
            };
        }
        if (!_.has(obj1, key)) {
            return { key, type: 'added', value: value2 };
        }
        if (!_.has(obj2, key)) {
            return { key, type: 'deleted', value: value1 };
        }
        if (_.has(obj1, key) && _.has(obj2, key)) {
            if (value1 !== value2) {
                return {
                    key,
                    type: 'changed',
                    newValue: value1,
                    oldValue: value2,
                };
            }
        }

        return { key, type: 'unchanged', value: value1 };
    });
    return result;
};

export default getComparison;
