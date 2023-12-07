import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const p1 = (input) => {
    const data = input
        .split("\n")
        .map((el) => el.split(","))
        .map((el) => {
            return el.map((el2) => {
                const [start, end] = el2.split("-");
                return {
                    start: Number(start),
                    end: Number(end),
                    range: Number(end) - Number(start),
                };
            });
        });

    let containedCount = 0;

    data.forEach((pair) => {
        const [one, two] = pair;

        if (
            (one.start <= two.start && one.end >= two.end) ||
            (two.start <= one.start && two.end >= one.end)
        ) {
            containedCount++;
        }
    });

    return containedCount;
};

const p2 = (input) => {
    const data = input
        .split("\n")
        .map((el) => el.split(","))
        .map((el) => {
            return el.map((el2) => {
                const [start, end] = el2.split("-");
                return {
                    start: Number(start),
                    end: Number(end),
                    range: Number(end) - Number(start),
                };
            });
        });

    let overlapCount = 0;

    data.forEach((pair) => {
        const [one, two] = pair;

        if (
            (one.start <= two.start && one.end >= two.start) ||
            (two.start <= one.start && two.end >= one.start)
        ) {
            overlapCount++;
        }
    });

    return overlapCount;
};

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);
