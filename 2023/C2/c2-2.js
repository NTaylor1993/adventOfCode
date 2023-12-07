import fs from "fs";

const inputFile = fs.readFileSync("C2/input.txt", "utf-8");
const gamesStringArray = inputFile.split("\r\n");

let totalGamePower = 0;

gamesStringArray.forEach((gameString) => {
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

console.log({ totalGamePower });
