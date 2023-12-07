import { Worker } from "worker_threads";

export const extractElement = (input, key) => {
    const startIndex = input.findIndex((e) => {
        return e.includes(key);
    });
    const endIndex = input.findIndex((e, index) => {
        return index > startIndex && e === "";
    });
    return input.slice(startIndex, endIndex);
};

export const extractToObject = (el) => {
    const [destinationStart, sourceStart, rangeLength] = el.split(" ");
    return {
        destinationStart: Number(destinationStart),
        sourceStart: Number(sourceStart),
        rangeLength: Number(rangeLength),
    };
};

export const isInRange = (value, start, range) => value >= start && value <= start + range;

export const isValidSeed = (value, seeds) =>
    seeds.some(({ start, range }) => isInRange(value, start, range));

export const getNextItem = (item, mappings) => {
    const nextMapping = mappings.find(({ sourceStart, rangeLength }) =>
        isInRange(item, sourceStart, rangeLength),
    );

    if (!nextMapping) {
        return { value: item, range: 0 };
    }

    return {
        value: nextMapping.destinationStart + (item - nextMapping.sourceStart),
    };
};

export const getLocationValue = (seedValue, data) => {
    const { value: soilValue } = getNextItem(seedValue, data.seedToSoilMap);
    const { value: fertilizerValue } = getNextItem(soilValue, data.soilToFertilizerMap);
    const { value: waterValue } = getNextItem(fertilizerValue, data.fertilizerToWaterMap);
    const { value: lightValue } = getNextItem(waterValue, data.waterToLightMap);
    const { value: temperatureValue } = getNextItem(lightValue, data.lightToTemperatureMap);
    const { value: humidityValue } = getNextItem(temperatureValue, data.temperatureToHumidityMap);
    const { value: locationValue } = getNextItem(humidityValue, data.humidityToLocationMap);

    return {
        locationValue,
    };
};

export const getLowestLocation = ({ seeds, ...data }) => {
    let lowestLocation = Infinity;

    seeds.forEach((seedValue) => {
        const { locationValue } = getLocationValue(seedValue, data);

        if (locationValue < lowestLocation) {
            lowestLocation = locationValue;
        }
    });

    return lowestLocation;
};

export const chunkRanges = (seedRanges) => {
    const newRanges = [];

    const interval = 10000000;
    seedRanges.forEach(({ start, range }) => {
        for (let i = 0; i < range; i += interval) {
            newRanges.push({ start: start + i, range: range - interval < 0 ? range : interval });
            range -= interval;
        }
    });

    return newRanges;
};

export const processSeedsAsync = (data, startTime) => {
    const threads = new Set();
    let lowestLocation = Infinity;

    data.seedRanges.forEach((seedRange, index) => {
        threads.add(new Worker("./C5/seedWorker.js", { workerData: { seedRange, data, index } }));
    });

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
