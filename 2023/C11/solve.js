import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const inputTestFile = fs.readFileSync(`${__dirname}/input-test.txt`, "utf-8");

function galaxyDistanceGradient(galaxy, universe) {
    let gradient = [];
    for (let i = 0; i < universe.length; i++) {
        gradient.push([]);
        for (let j = 0; j < universe[i].length; j++) {
            gradient[i].push(Number.MAX_SAFE_INTEGER);
        }
    }

    gradient[galaxy.row][galaxy.col] = 0;
    let nodes = [];
    nodes.push({ row: galaxy.row, col: galaxy.col, distance: 0 });

    while (nodes.length > 0) {
        let node = nodes.shift();
        if (node.row > 0) {
            let rowCost = node.distance + universe[node.row - 1][node.col].rowCost;
            if (rowCost < gradient[node.row - 1][node.col]) {
                gradient[node.row - 1][node.col] = rowCost;
                nodes.push({ row: node.row - 1, col: node.col, distance: rowCost });
            }
        }

        if (node.row < universe.length - 1) {
            let rowCost = node.distance + universe[node.row + 1][node.col].rowCost;
            if (rowCost < gradient[node.row + 1][node.col]) {
                gradient[node.row + 1][node.col] = rowCost;
                nodes.push({ row: node.row + 1, col: node.col, distance: rowCost });
            }
        }

        if (node.col > 0) {
            let colCost = node.distance + universe[node.row][node.col - 1].colCost;
            if (colCost < gradient[node.row][node.col - 1]) {
                gradient[node.row][node.col - 1] = colCost;
                nodes.push({ row: node.row, col: node.col - 1, distance: colCost });
            }
        }

        if (node.col < universe[0].length - 1) {
            let colCost = node.distance + universe[node.row][node.col + 1].colCost;
            if (colCost < gradient[node.row][node.col + 1]) {
                gradient[node.row][node.col + 1] = colCost;
                nodes.push({ row: node.row, col: node.col + 1, distance: colCost });
            }
        }
    }

    return gradient;
}

function calculateAllDistances(input, expansionFactor) {
    const lines = input.split(/\r?\n/);
    let universe = [];
    let galaxies = [];
    let gradients = [];

    // Read in original universe, expand row cost inline
    for (let i = 0; i < lines.length; i++) {
        let cells = lines[i].split("");
        universe.push([]);
        if (lines[i].indexOf("#") >= 0) {
            for (let j = 0; j < cells.length; j++) {
                universe[i].push({ symbol: cells[j], row: i, col: j, rowCost: 1, colCost: 1 });
            }
        } else {
            for (let j = 0; j < cells.length; j++) {
                universe[i].push({
                    symbols: cells[j],
                    row: i,
                    col: j,
                    rowCost: expansionFactor,
                    colCost: 1,
                });
            }
        }
    }

    // Read each collumn, adjust colCost to expansion factor if no "#" characters are found
    for (let i = 0; i < universe[0].length; i++) {
        let col = [];
        let galaxyFound = false;
        for (let j = 0; j < universe.length; j++) {
            if (universe[j][i].symbol == "#") {
                galaxies.push(universe[j][i]);
                galaxyFound = true;
            }
            col.push(universe[j][i]);
        }
        if (!galaxyFound) {
            for (let j = 0; j < universe.length; j++) {
                universe[j][i].colCost = expansionFactor;
            }
        }
    }

    for (let i = 0; i < galaxies.length; i++) {
        let gradient = galaxyDistanceGradient(galaxies[i], universe);
        gradients.push(gradient);
    }

    // Calculate distance between all galaxy pairs and sum them together
    let sum = 0;
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            sum = sum + gradients[i][galaxies[j].row][galaxies[j].col];
        }
    }

    return sum;
}

const p1 = (input) => {
    return calculateAllDistances(input, 2);
};

const p2 = (input) => {
    return calculateAllDistances(input, 1000000);
};

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);
