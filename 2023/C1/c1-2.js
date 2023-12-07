import fs from "fs";

const inputFile = fs.readFileSync("C1/input.txt", "utf-8");

const solve = (input) => {
    const digitDictionary = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
    };
    const digitRegex = /\d/g;
    const stringRegex = /one|two|three|four|five|six|seven|eight|nine/g;

    let result = 0;
    input.split("\n").forEach((element) => {
        let matches = [];
        let calibrationValue = "";
        // match strings

        let match;
        while ((match = stringRegex.exec(element)) !== null) {
            matches.push(match);
            stringRegex.lastIndex = match.index + 1;
        }
        // match digits
        const digitMatches = [...element.matchAll(digitRegex)];

        // put them in one array and sort by index
        matches = [...matches, ...digitMatches]
            .map((e) => {
                const returnValue = {
                    digit: "",
                    index: 0,
                };
                if (digitDictionary.hasOwnProperty(e[0])) returnValue.digit = digitDictionary[e[0]];
                else returnValue.digit = e[0];
                returnValue.index = e.index;
                return returnValue;
            })
            .sort((a, b) => a.index - b.index);

        calibrationValue = matches[0].digit + matches[matches.length - 1].digit;

        result += Number(calibrationValue);
    });

    return result;
};

const solve2 = (input) => {
    const digitDictionary = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
    };

    const regex = /\d|one|two|three|four|five|six|seven|eight|nine/g;

    return input.split("\n").reduce((acc, element) => {
        const matches = [];

        let match;
        while ((match = regex.exec(element)) !== null) {
            const val = match[0];
            matches.push(val);
            // Rewind regex to handle partial matches
            regex.lastIndex = regex.lastIndex - (val.length - 1);
        }

        const first = matches[0];
        const last = matches[matches.length - 1];

        const digitOne = !isNaN(first) ? first : digitDictionary[first];
        const digitTwo = !isNaN(last) ? last : digitDictionary[last];

        return acc + Number(digitOne + digitTwo);
    }, 0);
};

const solve3 = (input) => {
    const digitDictionary = {
        one: "1",
        two: "2",
        three: "3",
        four: "4",
        five: "5",
        six: "6",
        seven: "7",
        eight: "8",
        nine: "9",
    };

    const regex = /\d|one|two|three|four|five|six|seven|eight|nine/g;
    const regexReverse = /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g;

    return input.split("\n").reduce((acc, element) => {
        const match1 = element.match(regex);
        const match2 = element.split("").reverse().join("").match(regexReverse);

        const first = match1[0];
        const last = match2[0].split("").reverse().join("");

        const digitOne = !isNaN(first) ? first : digitDictionary[first];
        const digitTwo = !isNaN(last) ? last : digitDictionary[last];

        return acc + Number(digitOne + digitTwo);
    }, 0);
};

const result = solve(inputFile);
const result2 = solve2(inputFile);
const result3 = solve3(inputFile);

console.log(result, result2, result3);
