import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const fileArray = inputFile.split("\r\n");

const p1 = (input) => {
    return input.reduce((acc, input) => {
        const numbers = [...input].filter((e) => !isNaN(e));
    
        const val = numbers[0] + numbers[numbers.length - 1];
    
        return acc + Number(val);
    }, 0);
}

const p2 = (input) => {
        const startTime = Date.now()
    
        const digitDictionary = {
            one: "1",
            two: "2",
            three: "3",
            four: "4",
            five: "5",
            six: "6",
            seven: "7",
            eight: "8",
            nine: "9",
        };
    
        const regex = /\d|one|two|three|four|five|six|seven|eight|nine/g;
        const regexReverse = /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g;
    
        const result = input.split("\n").reduce((acc, element) => {
            const match1 = element.match(regex);
            const match2 = element.split("").reverse().join("").match(regexReverse);
    
            const first = match1[0];
            const last = match2[0].split("").reverse().join("");
    
            const digitOne = !isNaN(first) ? first : digitDictionary[first];
            const digitTwo = !isNaN(last) ? last : digitDictionary[last];
    
            return acc + Number(digitOne + digitTwo);
        }, 0);
    return result
}

console.log(`P1: ${p1(fileArray)}`);
console.log(`P2: ${p2(inputFile)}`);
