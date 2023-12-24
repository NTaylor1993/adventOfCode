import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const gamesStringArray = inputFile.split("\r\n");

const thresholdDict = {
    red: 12,
    green: 13,
    blue: 14,
};

let possibleIdSum = 0;

const p1 = (input) => {
    input.forEach((gamesString) => {
        const [idString, playsString] = gamesString.split(":");
        const roundsString = playsString.split(";");

        const id = Number(idString.trim().split(" ")[1]);

        const isPossible = roundsString.every((colourDrawString) => {
            let isRoundPossible = true;
            const drawsString = colourDrawString.split(",");

            drawsString.forEach((drawString) => {
                const [countString, colour] = drawString.trim().split(" ");

                if (Number(countString) > thresholdDict[colour]) {
                    isRoundPossible = false;
                }
            });

            return isRoundPossible;
        });

        if (isPossible) {
            possibleIdSum += id;
        }
    });

    return possibleIdSum
};

const p2 = (input) => {
    let totalGamePower = 0;

    input.forEach((gameString) => {
        const [idString, playsString] = gameString.split(":");
        const roundsString = playsString.split(";");
    
        const minColourCount = { red: 0, green: 0, blue: 0 };
    
        roundsString.forEach((colourDrawString) => {
            const drawsString = colourDrawString.split(",");
    
            drawsString.forEach((drawString) => {
                const [countString, colour] = drawString.trim().split(" ");
                const count = Number(countString);
    
                if (minColourCount[colour]) {
                    if (minColourCount[colour] < count) {
                        minColourCount[colour] = count;
                    }
                } else {
                    minColourCount[colour] = count;
                }
            });
        });
    
        const gamePower = minColourCount.red * minColourCount.green * minColourCount.blue;
    
        totalGamePower += gamePower;
    });

    return totalGamePower
}

console.log(`P1: ${ p1(gamesStringArray) }`);
console.log(`P2: ${ p2(gamesStringArray) }`);
