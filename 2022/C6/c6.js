import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const inputTestFile = fs.readFileSync(`${__dirname}/input-test.txt`, "utf-8");
const inputTestFile2 = fs.readFileSync(`${__dirname}/input-test2.txt`, "utf-8");
const inputTestFile3 = fs.readFileSync(`${__dirname}/input-test3.txt`, "utf-8");
const inputTestFile4 = fs.readFileSync(`${__dirname}/input-test4.txt`, "utf-8");
const inputTestFile5 = fs.readFileSync(`${__dirname}/input-test5.txt`, "utf-8");

const findMarker = (inputStr, markerSize) => {
    for (let i = 0; i < inputStr.length; i++) {
        const chars = inputStr.split("").slice(i, i + markerSize);
        const charSet = new Set(chars);

        if (charSet.size !== markerSize) {
            continue;
        } else {
            return i + markerSize;
        }
    }
};

const p1 = (input) => {
    return findMarker(input, 4);
};

const p2 = (input) => {
    return findMarker(input, 14);
};

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);
