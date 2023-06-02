import { flat } from '../__fixtures__/result.js';
import makeCompare from '../src/idex.js';

const fileName1 = 'file1.json';
const fileName2 = 'file2.json';
const result = flat;
test('makeCompare should return the difference', () => {
    expect(makeCompare(fileName1, fileName2)).toEqual(result);
});
