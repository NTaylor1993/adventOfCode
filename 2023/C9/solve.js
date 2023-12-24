import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { last, sum } from "../../helpers/array.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const inputTestFile = fs.readFileSync(`${__dirname}/input-test.txt`, "utf-8");

const getDifferences = (arr) => {
    const diffs = [];

    for (let i = 1; i < arr.length; i += 1) {
        diffs.push(arr[i] - arr[i - 1]);
    }

    return diffs;
};

const getNextValue = (arr) => {
    if (arr.some((entry) => entry !== arr[0])) {
        const diffs = getDifferences(arr);
        const nextDiff = getNextValue(diffs);
        return last(arr) + nextDiff;
    }

    return arr[0];
};

const p1 = (input) => {
    const data = input.split("\n").map((el) => el.split(" ").map(Number));

    const nextVals = data.map(getNextValue);
    return sum(nextVals);
};

const p2 = (input) => {
    const data = input
        .split("\n")
        .map((el) => el.split(" ").map(Number))
        .map((el) => el.reverse());

    const nextVals = data.map(getNextValue);
    return sum(nextVals);
};

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);
