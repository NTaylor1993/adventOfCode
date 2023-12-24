import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { getDir, getStartDir, getStartPosition, getDelta } from "./util.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const inputTestFile = fs.readFileSync(`${__dirname}/input-test.txt`, "utf-8");
const inputTestFileP2 = fs.readFileSync(`${__dirname}/input-testP2.txt`, "utf-8");

const p1 = (input) => {
    const data = input.split("\n");

    let { start } = getStartPosition(data);
    let { x, y, dir } = getStartDir(data, start);
    let path = [start, { x, y }];

    while (x !== start.x || y !== start.y) {
        const { deltaX, deltaY } = getDelta(data, dir, x, y);
        dir = getDir(deltaX, deltaY);

        x += deltaX;
        y += deltaY;
        path.push({ x, y });
    }

    return (path.length - 1) / 2;
};

const p2 = (input) => {
    let data = input.split("\n");

    let { start, isLoop } = getStartPosition(data);
    let { x, y, dir } = getStartDir(data, start);
    const startDir = dir;
    let path = [start, { x, y }];
    isLoop[start.y][start.x] = true;
    isLoop[y][x] = true;

    while (x !== start.x || y !== start.y) {
        const { deltaX, deltaY } = getDelta(data, dir, x, y);
        dir = getDir(deltaX, deltaY);

        x += deltaX;
        y += deltaY;

        isLoop[y] = isLoop[y] || [];
        isLoop[y][x] = true;

        path.push({ x, y });
    }

    let count = 0;
    for (let yy = 0; yy < data.length; yy++) {
        let crosses = 0;
        let line = data[yy];
        let corner = false;
        for (let xx = 0; xx < line.length; xx++) {
            if (isLoop[yy][xx]) {
                let current = data[yy][xx];
                if (current === "|") {
                    crosses++;
                } else if (current !== "-") {
                    if (corner) {
                        if (corner === "L" && current === "7") {
                            crosses++;
                        } else if (corner === "F" && current === "J") {
                            crosses++;
                        }
                        corner = false;
                    } else {
                        corner = current;
                    }
                }
            } else if (crosses % 2 === 1) {
                count++;
            }
        }
    }

    // Impossible to test properly without more test data but seems value is one low if start resolves to '-'
    return ["E", "W"].includes(startDir) ? count + 1 : count;
};

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputTestFileP2)}`);
