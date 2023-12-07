import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const p1 = (input) => {
    return Math.max(... input.split('\n\n').map(c => c.split('\n').reduce((a, b) => a+ Number(b), 0)));
}

const p2 = (input) => {
    return input.split('\n\n').map(c => c.split('\n').reduce((a, b) => a+ Number(b), 0)).sort((a,b) => b-a).slice(0, 3).reduce((a, b)=> a+b, 0);
}

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);