import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { spawnSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const inputTestFile = fs.readFileSync(`${__dirname}/input-test.txt`, "utf-8");

function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denominator == 0) {
        return null;
    }

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
    };
}

const p1 = (input, lowerBound = 200000000000000, upperBound = 400000000000000) => {
    const data = input.trim().split(/\r?\n/);

    let bean = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            let line1 = data[i].split(/, | @ /g);
            let line2 = data[j].split(/, | @ /g);
            let x1 = +line1[0];
            let x2 = +line1[3] + x1;
            let x3 = +line2[0];
            let x4 = +line2[3] + x3;
            let y1 = +line1[1];
            let y2 = +line1[4] + y1;
            let y3 = +line2[1];
            let y4 = +line2[4] + y3;
            let intersection = intersect(x1, y1, x2, y2, x3, y3, x4, y4);
            if (intersection) {
                let x = intersection["x"];
                let y = intersection["y"];
                //check event happens in the future
                if (
                    x > x1 == x2 - x1 > 0 &&
                    y > y1 == y2 - y1 > 0 &&
                    x > x3 == x4 - x3 > 0 &&
                    y > y3 == y4 - y3 > 0 &&
                    //check intersection is in bound
                    x >= lowerBound &&
                    x <= upperBound &&
                    y >= lowerBound &&
                    y <= upperBound
                )
                    bean++;
            }
        }
    }

    return bean;
};

const p2 = async () => {
    const process = spawnSync("python3", [`${__dirname}/p2.py`], { encoding: "utf8" });

    return process.stdout;
};

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${await p2(inputTestFile)}`);
