import fs from "fs";

const inputFile = fs.readFileSync("C6/input.txt", "utf-8");
const inputStrings = inputFile.split("\n");

const data = {};

inputStrings.forEach((str) => {
    const [key, valueString] = str.split(":");
    const values = valueString
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map((v) => Number(v));

    data[key.toLowerCase()] = values;
});

const calculateSpeedAndRemainingTime = (holdTime, time, acceleration) => {
    const speed = holdTime * acceleration;

    return { speed, remainingTime: time - holdTime };
};

const calculateIsWin = (speed, remainingTime, expectedDistance) => {
    return speed * remainingTime > expectedDistance;
};

const calculateWinCount = (time, expectedDistance) => {
    let winCount = 0;

    for (let i = 0; i <= time; i++) {
        const { speed, remainingTime } = calculateSpeedAndRemainingTime(i, time, 1);
        if (calculateIsWin(speed, remainingTime, expectedDistance)) {
            winCount++;
        }
    }

    return winCount;
};

const p1 = ({ time, distance }) => {
    const winCounts = [];

    time.forEach((time, index) => {
        const expectedDistance = distance[index];

        winCounts.push(calculateWinCount(time, expectedDistance));
    });

    return winCounts.reduce((a, b) => a * b, 1);
};

const p2 = ({ time, distance }) => {
    const actualTime = Number(time.reduce((a, b) => a + b, ""));
    const actualDistance = Number(distance.reduce((a, b) => a + b, ""));

    return calculateWinCount(actualTime, actualDistance);
};

console.log(p1(data));
console.log(p2(data));
