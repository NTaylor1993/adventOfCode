import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const p1 = (input) => {
    const [diagram, moves] = input.split("\n\n");

    const rows = diagram.split("\n");
    const columnIndexKey = rows[rows.length - 1].split("");
    const rowList = rows[rows.length - 1].replaceAll(" ", "").split("");

    const stacks = [];

    rowList.forEach((row) => {
        const columnIndex = columnIndexKey.indexOf(row);

        const stack = [];
        for (let i = rows.length - 2; i >= 0; i--) {
            const row = rows[i].split("");

            if (row[columnIndex].trim()) {
                stack.push(row[columnIndex]);
            }
        }
        stacks.push(stack);
    });

    const regex = /\w+ \d+/g;

    moves.split("\n").forEach((move) => {
        const m = [...move.matchAll(regex)].reduce((acc, el) => {
            const [key, val] = el[0].split(" ");
            acc[key] = Number(val);

            return acc;
        }, {});

        const fromStack = stacks[m.from - 1];
        const toStack = stacks[m.to - 1];

        for (let i = 0; i < m.move; i++) {
            const movedItem = fromStack.pop();

            toStack.push(movedItem);
        }
    });

    return stacks.reduce((acc, stack) => acc + stack[stack.length - 1], "");
};

const p2 = (input) => {
    const [diagram, moves] = input.split("\n\n");

    const rows = diagram.split("\n");
    const columnIndexKey = rows[rows.length - 1].split("");
    const rowList = rows[rows.length - 1].replaceAll(" ", "").split("");

    const stacks = [];

    rowList.forEach((row) => {
        const columnIndex = columnIndexKey.indexOf(row);

        const stack = [];
        for (let i = rows.length - 2; i >= 0; i--) {
            const row = rows[i].split("");

            if (row[columnIndex].trim()) {
                stack.push(row[columnIndex]);
            }
        }
        stacks.push(stack);
    });

    const regex = /\w+ \d+/g;

    moves.split("\n").forEach((move) => {
        const m = [...move.matchAll(regex)].reduce((acc, el) => {
            const [key, val] = el[0].split(" ");
            acc[key] = Number(val);

            return acc;
        }, {});

        const fromStack = stacks[m.from - 1];
        const toStack = stacks[m.to - 1];

        const movedItems = [];
        for (let i = 0; i < m.move; i++) {
            movedItems.push(fromStack.pop());
        }
        movedItems.reverse();

        toStack.push(...movedItems);
    });

    return stacks.reduce((acc, stack) => acc + stack[stack.length - 1], "");
};

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);
