import fs from "fs";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { calculateHandStrength, calculateHandStrengthWildcard, sortHands } from "./util.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const inputStrings = inputFile.split("\n");

const p1 = (input) => {
    const data = [];
    input.forEach((str) => {
        const [hand, bid] = str.split(" ");
        data.push({ hand, bid: Number(bid), handStrength: calculateHandStrength(hand) });
    });
    data.sort(sortHands);

    return data.reduce((a, b, index) => a + b.bid * (index + 1), 0);
};

const p2 = (input) => {
    const data = [];
    input.forEach((str) => {
        const [hand, bid] = str.split(" ");
        data.push({ hand, bid: Number(bid), handStrength: calculateHandStrengthWildcard(hand) });
    });
    data.sort(sortHands);

    return data.reduce((a, b, index) => a + b.bid * (index + 1), 0);
};

console.log(`P1: ${p1(inputStrings)}`);
console.log(`P2: ${p2(inputStrings)}`);
