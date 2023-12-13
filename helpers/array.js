export const last = (arr) => arr[arr.length - 1];

export const sum = (arr) => arr.reduce((a, b) => a + b, 0);

export const transpose = (array) =>
    array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
