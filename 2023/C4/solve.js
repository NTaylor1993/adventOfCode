import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");

const extractCardValues = (card) => {
    const [cardNoString, values] = card.split(":");
    const cardNo = Number(cardNoString.split(" ")[1]);

    const [winningNumbersString, checkValuesString] = values.split("|");
    const winningNumbers = winningNumbersString
        .trim()
        .split(" ")
        .filter((value) => value !== "");
    const checkValues = checkValuesString
        .trim()
        .split(" ")
        .filter((value) => value !== "");

    return { cardNo, winningNumbers, checkValues, count: 1 };
};

const getPointTotal = (cardObj, basePoints, pointMultiplier) => {
    let pointTotal = 0;

    const { winningNumbers, checkValues } = cardObj;

    winningNumbers.forEach((num) => {
        if (checkValues.includes(num)) {
            pointTotal = pointTotal === 0 ? pointTotal + basePoints : pointTotal * pointMultiplier;
        }
    });

    return pointTotal;
};

const setWinCount = (cardObj) => {
    let winCount = 0;

    const { winningNumbers, checkValues } = cardObj;

    winningNumbers.forEach((num) => {
        if (checkValues.includes(num)) {
            winCount++;
        }
    });

    cardObj.winCount = winCount;
};

const p1 = (input) => {
    let sumTotal = 0;
    const cardArray = input.split("\r\n");

    cardArray.forEach((card) => {
        const cardObj = extractCardValues(card);
        sumTotal += getPointTotal(cardObj, 1, 2);
    });

    return sumTotal;
};

const p2 = (input) => {
    const cardArray = input.split("\r\n");
    const cards = [];

    let totalCards = 0;

    cardArray.forEach((card) => {
        const cardObj = extractCardValues(card);
        setWinCount(cardObj);
        cards.push(cardObj);
    });

    cards.forEach((card, index) => {
        const { winCount, count } = card;

        totalCards += count;

        let counter = 1;
        while (counter <= winCount) {
            cards[index + counter].count += count;
            counter++;
        }
    });

    return totalCards;
};

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);
