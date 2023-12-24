import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const inputTestFile = fs.readFileSync(`${__dirname}/input-test.txt`, "utf-8");

const getRepeats = (springMap, brokenSpringLayout, r) => {
    let repSpringMap = "";
    let repBrokenSpringLayout = [0];
    for (let i = 0; i < r; i++) {
        repSpringMap = repSpringMap + (springMap + "?");
        repBrokenSpringLayout = repBrokenSpringLayout.concat(brokenSpringLayout);
    }

    return { repSpringMap, repBrokenSpringLayout };
};

const getCounts = (repSpringMap, repBrokenSpringLayout) => {
    const counts = [];

    for (let i = 0; i < repSpringMap.length; i++) {
        counts[i] = [];
    }

    const getCount = (mi, ni) => {
        if (mi == -1 && ni == 0) return 1;
        if (counts[mi]) return counts[mi][ni] ?? 0;
        return 0;
    };

    for (let ni = 0; ni < repBrokenSpringLayout.length; ni++) {
        for (let mi = 0; mi < repSpringMap.length; mi++) {
            let cur = 0;
            if (repSpringMap[mi] != "#") cur += getCount(mi - 1, ni);
            if (ni > 0) {
                let docount = true;
                for (let k = 1; k <= repBrokenSpringLayout[ni]; k++) {
                    if (repSpringMap[mi - k] == ".") docount = false;
                }
                if (repSpringMap[mi] == "#") docount = false;
                if (docount) cur += getCount(mi - repBrokenSpringLayout[ni] - 1, ni - 1);
            }
            counts[mi][ni] = cur;
        }
    }

    return counts;
};

const solve = (input, r = 1) => {
    let data = input.trim().split("\n");

    let ret = 0;
    for (let line of data) {
        const springMap = line.split(" ")[0];
        const brokenSpringLayout = [...line.matchAll(/\d+/g)].map((x) => +x[0]);
        const { repSpringMap, repBrokenSpringLayout } = getRepeats(
            springMap,
            brokenSpringLayout,
            r,
        );

        const counts = getCounts(repSpringMap, repBrokenSpringLayout);

        ret += counts[repSpringMap.length - 1][repBrokenSpringLayout.length - 1];
    }
    return ret;
};

const p1 = async (input) => solve(input);

const p2 = async (input) => solve(input, 5);

console.log(`P1: ${await p1(inputFile)}`);
console.log(`P2: ${await p2(inputFile)}`);
