import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { transpose } from "../../helpers/array.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const inputTestFile = fs.readFileSync(`${__dirname}/input-test.txt`, "utf-8");

const findMirror = (pattern, maxSmudges = 0) => {
    for (let mirrorPosition = 1; mirrorPosition < pattern[0].length; mirrorPosition++) {
        const columns = pattern[0].length;
        const startX = Math.max(0, mirrorPosition - (columns - mirrorPosition));
        let smudges = 0;

        for (let y = 0; y < pattern.length; y++) {
            for (let x = startX; x < mirrorPosition; x++) {
                let leftElement = pattern[y][x];
                let rightElement = pattern[y][mirrorPosition + (mirrorPosition - x - 1)];

                if (leftElement !== rightElement) {
                    smudges++;
                }
            }
            if (smudges > maxSmudges) {
                break;
            }
        }

        if (smudges === maxSmudges) {
            return mirrorPosition;
        }
    }

    return 0;
};

const getPatternNotesSum = (input, smudges = 0) => {
    return input
        .split("\n\n")
        .map((pattern) => pattern.split("\n").map((row) => row.split("")))
        .map((pattern) => [pattern, transpose(pattern)])
        .map(
            ([pattern, transposedPattern]) =>
                findMirror(pattern, smudges) + 100 * findMirror(transposedPattern, smudges),
        )
        .reduce((sum, mirrorPosition) => sum + mirrorPosition, 0);
};

const p1 = (input) => getPatternNotesSum(input);

const p2 = (input) => getPatternNotesSum(input, 1);

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);
