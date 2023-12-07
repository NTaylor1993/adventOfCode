import fs from "fs";

import { calculateHandStrength, calculateHandStrengthWildcard, sortHands } from "./util.js";

const inputFile = fs.readFileSync("C7/input.txt", "utf-8");
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

console.log(p1(inputStrings));
console.log(p2(inputStrings));
