import fs from "fs";

const inputFile = fs.readFileSync("C2/input.txt", "utf-8");
const gamesStringArray = inputFile.split("\r\n");

const thresholdDict = {
    red: 12,
    green: 13,
    blue: 14,
};

let possibleIdSum = 0;

gamesStringArray.forEach((gamesString) => {
    const [idString, playsString] = gamesString.split(":");
    const roundsString = playsString.split(";");

    const id = Number(idString.trim().split(" ")[1]);

    console.log({ gamesString, idString, roundsString, id });

    const isPossible = roundsString.every((colourDrawString) => {
        let isRoundPossible = true;
        const drawsString = colourDrawString.split(",");

        drawsString.forEach((drawString) => {
            const [countString, colour] = drawString.trim().split(" ");

            if (Number(countString) > thresholdDict[colour]) {
                console.log("Not Possible: ", { id, countString, colour });
                isRoundPossible = false;
            }
        });

        return isRoundPossible;
    });

    if (isPossible) {
        possibleIdSum += id;
    }
});

console.log({ possibleIdSum });
