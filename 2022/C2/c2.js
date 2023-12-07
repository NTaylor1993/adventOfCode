import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const winScore = {
    loss: 0,
    draw: 3,
    win: 6,
};

const outcome = {
    X: "lose",
    Y: "draw",
    Z: "win",
};

const matchups = {
    win: {
        A: "Y",
        B: "Z",
        C: "X",
    },
    draw: {
        A: "X",
        B: "Y",
        C: "Z",
    },
    lose: {
        A: "Z",
        B: "X",
        C: "Y",
    },
};

const throwScore = {
    X: 1,
    Y: 2,
    Z: 3,
};

const getMatchupScore = (move1, move2) => {
    if (matchups.draw[move1] === move2) {
        return winScore.draw;
    } else if (matchups.win[move1] === move2) {
        return winScore.win;
    } else {
        return winScore.loss;
    }
};

const getGameScore = (move1, move2) => {
    return getMatchupScore(move1, move2) + throwScore[move2];
};

const p1 = (input) => {
    const data = input.split("\n").map((el) => el.split(" "));

    return data.reduce((acc, game) => {
        const [move1, move2] = game;

        return acc + getGameScore(move1, move2);
    }, 0);
};

const p2 = (input) => {
    const data = input.split("\n").map((el) => el.split(" "));

    return data.reduce((acc, game) => {
        const [move1, desiredOutcome] = game;
        const move2 = matchups[outcome[desiredOutcome]][move1];

        return acc + getGameScore(move1, move2);
    }, 0);
};

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);
