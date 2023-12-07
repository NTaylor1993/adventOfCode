import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
const inputTestFile = fs.readFileSync(`${__dirname}/input-test.txt`, "utf-8");

const calculateStructure = (input) => {
    const outputArray = input.split("\n");
    let currentDirectory = [];

    const directoryStructure = {};
    const fileSizes = {};

    outputArray.forEach((output) => {
        // Check if command
        if (output.includes("$")) {
            const command = output.split(" ");
            if (command[1] === "cd") {
                const toDirectory = command[2];
                // Change directory
                if (toDirectory === "/") {
                    currentDirectory = ["/"];
                    if (!directoryStructure[currentDirectory]) {
                        directoryStructure[currentDirectory] = 0;
                    }
                } else if (toDirectory === "..") {
                    currentDirectory.pop();
                } else {
                    currentDirectory.push(toDirectory);
                    const dirPath = currentDirectory[0] + currentDirectory.slice(1).join("/");

                    if (!directoryStructure[dirPath]) {
                        directoryStructure[dirPath] = 0;
                    }
                }
            } else if (command[1] === "ls") {
                // Listing structure
            }
        } else {
            const [size, file] = output.split(" ");
            if (size === "dir") {
            } else {
                const dirPath = currentDirectory[0] + currentDirectory.slice(1).join("/");
                if (dirPath === "/") {
                    fileSizes[`${dirPath}${file}`] = Number(size);
                } else {
                    fileSizes[`${dirPath}/${file}`] = Number(size);
                }
            }
        }
    });

    return { directoryStructure, fileSizes };
};

const p1 = (input) => {
    const maxSize = 100000;
    const { directoryStructure, fileSizes } = calculateStructure(input);

    Object.keys(directoryStructure).forEach((key) => {
        let totalSize = 0;
        Object.keys(fileSizes).forEach((key2) => {
            if (key2.includes(key)) {
                totalSize += fileSizes[key2];
            }
        });
        directoryStructure[key] = totalSize;
    });

    return Object.values(directoryStructure)
        .filter((a) => a <= maxSize)
        .reduce((a, b) => a + b, 0);
};

const p2 = (input) => {
    const neededSpace = 30000000;
    const unusedSpace = 21618835;
    const neededToFreeSpace = neededSpace - unusedSpace;

    const { directoryStructure, fileSizes } = calculateStructure(input);

    Object.keys(directoryStructure).forEach((key) => {
        let totalSize = 0;
        Object.keys(fileSizes).forEach((key2) => {
            if (key2.includes(key)) {
                totalSize += fileSizes[key2];
            }
        });
        directoryStructure[key] = totalSize;
    });

    return Object.values(directoryStructure)
        .filter((a) => a >= neededToFreeSpace)
        .sort((a, b) => a - b)[0];
};

console.log(`P1: ${p1(inputFile)}`);
console.log(`P2: ${p2(inputFile)}`);
