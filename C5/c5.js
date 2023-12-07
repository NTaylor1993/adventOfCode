import {
    extractElement,
    extractToObject,
    getLowestLocation,
    processSeedsAsync,
    chunkRanges,
} from "./util.js";

import fs from "fs";


const inputFile = fs.readFileSync("C5/input.txt", "utf-8");
const splitInput = inputFile.split("\r\n");

const p1 = (input) => {
    const data = {
        seeds: input[0]
            .split(": ")[1]
            .split(" ")
            .map((el) => Number(el)),
        seedToSoilMap: extractElement(input, "seed-to-soil")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        soilToFertilizerMap: extractElement(input, "soil-to-fertilizer")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        fertilizerToWaterMap: extractElement(input, "fertilizer-to-water")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        waterToLightMap: extractElement(input, "water-to-light")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        lightToTemperatureMap: extractElement(input, "light-to-temperature")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        temperatureToHumidityMap: extractElement(input, "temperature-to-humidity")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        humidityToLocationMap: extractElement(input, "humidity-to-location")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
    };

    return getLowestLocation(data);
};

const p2 = (input) => {
    const startTime = Date.now();
    const regex = /[0-9]+\s[0-9]+/gm;
    const data = {
        seedRanges: input[0]
            .split(": ")[1]
            .match(regex)
            .map((el) => {
                const [start, range] = el.split(" ");
                return { start: Number(start), range: Number(range) };
            }),
        seedToSoilMap: extractElement(input, "seed-to-soil")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        soilToFertilizerMap: extractElement(input, "soil-to-fertilizer")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        fertilizerToWaterMap: extractElement(input, "fertilizer-to-water")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        waterToLightMap: extractElement(input, "water-to-light")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        lightToTemperatureMap: extractElement(input, "light-to-temperature")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        temperatureToHumidityMap: extractElement(input, "temperature-to-humidity")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        humidityToLocationMap: extractElement(input, "humidity-to-location")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
    };

    data.seedRanges = data.seedRanges.sort((a, b) => a.start - b.start);
    data.seedRanges = chunkRanges(data.seedRanges);

    processSeedsAsync(data, startTime);
};

const p2a = (input) => {
    const startTime = Date.now();
    const regex = /[0-9]+\s[0-9]+/gm;
    const data = {
        seedRanges: input[0]
            .split(": ")[1]
            .match(regex)
            .map((el) => {
                const [start, range] = el.split(" ");
                return { start: Number(start), range: Number(range) };
            }),
        seedToSoilMap: extractElement(input, "seed-to-soil")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        soilToFertilizerMap: extractElement(input, "soil-to-fertilizer")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        fertilizerToWaterMap: extractElement(input, "fertilizer-to-water")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        waterToLightMap: extractElement(input, "water-to-light")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        lightToTemperatureMap: extractElement(input, "light-to-temperature")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        temperatureToHumidityMap: extractElement(input, "temperature-to-humidity")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
        humidityToLocationMap: extractElement(input, "humidity-to-location")
            .splice(1, Infinity)
            .map((el) => extractToObject(el)),
    };

    let lowestLocation = Infinity;

    const threads = new Set();

    let lowestStart = Infinity;
    let highestEnd = 0;
    data.seedRanges.forEach(({ start, range }) => {
        const end = start + range;

        if (start < lowestStart) lowestStart = start;
        if (end > highestEnd) highestEnd = end;
    });

    let threadIndex = 1;
    const range = 2000000;

    for (let i = lowestStart; i < highestEnd; i += range) {
        threads.add(
            new Worker("./C5/seedWorkerA.js", {
                workerData: { startValue: i, range, data, threadIndex },
            }),
        );
        threadIndex++;
    }

    for (let worker of threads) {
        worker.on("error", (err) => {
            console.log(err);
        });
        worker.on("exit", () => {
            threads.delete(worker);
            console.log(`Exiting thread, ${threads.size} remaining...`);
            if (threads.size === 0) {
                console.log({ lowestLocation });
                console.log(`Run Time = ${(Date.now() - startTime) / 1000} seconds`);
            }
        });
        worker.on("message", (msg) => {
            if (msg < lowestLocation) {
                lowestLocation = msg;
                console.log(`Lowest Location ${lowestLocation}`);
            }
        });
    }
};

console.log(p1(splitInput));
p2(splitInput);
