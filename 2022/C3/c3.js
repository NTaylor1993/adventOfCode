import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const lowercaseOffset = "a".charCodeAt(0) - 1;
const uppercaseOffset = "A".charCodeAt(0) - 27;

const p1 = (input) => {
    const data = input.split("\n");
    return data.reduce((acc, bag) => {
        const [c1, c2] = bag
            .split("")
            .toSpliced(bag.length / 2, 0, " ")
            .join("")
            .split(" ");

        let dupe = "";
        c1.split("").every((c) => {
            if (c2.includes(c)) {
                dupe = c;
                return false;
            }
            return true;
        });

        const code = dupe.charCodeAt(0);
        const value = code >= 97 ? code - lowercaseOffset : code - uppercaseOffset;

        return acc + value;
    }, 0);
};

const p2 = (input) => {
    const data = input.split("\n");

    const groupSize = 3;
    const groupBags = [];

    for (let i = 0; i < data.length; i += groupSize) {
        groupBags.push(data.slice(i, i + groupSize));
    }

    return groupBags.reduce((acc, group) => {
        const [bag1, bag2, bag3] = group;

        let dupe = "";
        bag1.split("").every((c) => {
            if (bag2.includes(c) && bag3.includes(c)) {
                dupe = c;
                return false;
            }
            return true;
        });

        const code = dupe.charCodeAt(0);
        const value = code >= 97 ? code - lowercaseOffset : code - uppercaseOffset;

        return acc + value;
    }, 0);
};

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);
