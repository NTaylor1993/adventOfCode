import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const inputTestFile = fs.readFileSync(`${__dirname}/input-test.txt`, "utf-8");

const transposeArray = (arr) => arr[0].map((_, c) => arr.map((row) => row[c]));

const parseInput = (input) => input.split("\n").map(([...line]) => line.map(Number));

const mapGrid = (input) =>
    ((grid, transposed = transposeArray(grid)) =>
        grid.flatMap((line, y) =>
            line.map((_, x) => [
                grid[y][x],
                line.slice(0, x).reverse(),
                line.slice(x + 1),
                transposed[x].slice(0, y).reverse(),
                transposed[x].slice(y + 1),
            ]),
        ))(parseInput(input));

const p1 = (input) =>
    mapGrid(input)
        .map(([h, ...arrs]) => arrs.some((a) => a.every((v) => v < h)))
        .filter(Boolean).length;

const p2 = (input) =>
    mapGrid(input)
        .map(([h, ...arrs]) =>
            arrs
                .map((arr) => 1 + arr.findIndex((v) => v >= h) || arr.length)
                .reduce((mul, v) => mul * v),
        )
        .reduce((max, v) => (max > v ? max : v));

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);
