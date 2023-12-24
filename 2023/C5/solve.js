import {
    extractElement,
    extractToObject,
    getLowestLocation,
    processSeedsAsync,
    chunkRanges,
} from "./util.js";

import fs from "fs";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const inputFile = fs.readFileSync(`${__dirname}/input.txt`, "utf-8");
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

const p2 =async (input) => {
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

    return await processSeedsAsync(data);
};

console.log(`P1: ${p1(splitInput)}`);
console.log(`P2: ${await p2(splitInput)}`);
