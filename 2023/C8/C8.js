import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { lcm } from "../../helpers/math.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const inputTestFile = fs.readFileSync(`${__dirname}/input-test.txt`, "utf-8");
const inputTestFile2 = fs.readFileSync(`${__dirname}/input-test2.txt`, "utf-8");
const inputTestFileP2 = fs.readFileSync(`${__dirname}/input-testP2.txt`, "utf-8");

const isEnd = (el) => {
    const endChar = el.split("").pop();
    if (endChar === "Z") {
        return true;
    }
};

const p1 = (input) => {
    const moveObj = {};
    const [directions, mapString] = input.trim().split("\n\n");

    mapString.split("\n").map((el) => {
        const [position, moveMap] = el.split(" = ");
        const moves = [...moveMap.matchAll(/\w\w\w/g)];
        moveObj[position] = { L: moves[0][0], R: moves[1][0] };
    });

    let moveCount = 0;
    let currentMove = 0;
    let currentLocation = "AAA";

    while (currentLocation !== "ZZZ") {
        if (currentMove === directions.length) {
            currentMove = 0;
        }

        currentLocation = moveObj[currentLocation][directions[currentMove]];
        currentMove++;
        moveCount++;
    }

    return moveCount;
};

const p2 = (input) => {
    const moveObj = {};
    const [directions, mapString] = input.trim().split("\n\n");

    const startPositions = [];

    mapString.split("\n").map((el) => {
        const [position, moveMap] = el.split(" = ");
        const moves = [...moveMap.matchAll(/\w\w\w/g)];

        const endChar = position.split("").pop();
        if (endChar === "A") {
            startPositions.push(position);
        }

        moveObj[position] = { L: moves[0][0], R: moves[1][0] };
    });

    let currentPositions = [...startPositions];

    const moveCounts = [];

    currentPositions.forEach((position, index) => {
        let moveCount = 0;
        let currentMove = 0;
        let innerPosition = position;

        while (innerPosition.split("").pop() !== "Z") {
            if (currentMove === directions.length) {
                currentMove = 0;
            }

            innerPosition = moveObj[innerPosition][directions[currentMove]];

            currentMove++;
            moveCount++;
        }

        moveCounts.push(moveCount);
    });

    return moveCounts.reduce(lcm);
};

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);
