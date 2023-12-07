const fs = require("fs");

const inputFile = fs.readFileSync("C1/input.txt", "utf-8");
const fileArray = inputFile.split("\r\n");

const sum = fileArray.reduce((acc, input) => {
    const numbers = [...input].filter((e) => !isNaN(e));

    const val = numbers[0] + numbers[numbers.length - 1];
    console.log(input, numbers, val);

    return acc + Number(val);
}, 0);

console.log(sum);
