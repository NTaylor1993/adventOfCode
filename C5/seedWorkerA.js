import { getLocationValue, isValidSeed } from "./util.js";
import { parentPort, workerData } from "worker_threads";

const { startValue, range, data, threadIndex } = workerData;

let lowestLocation = Infinity;

for (let i = startValue; i < startValue + range; i++) {
    if (i % (range / 10) === 0) {
        console.log(
            `Thread ${threadIndex}: ${i - startValue} processed of ${range - 1}: ${
                Math.trunc(((i - startValue) / (range - 1)) * 10000) / 100
            }%`,
        );
    }

    const shouldCheck = isValidSeed(i, data.seedRanges);

    if (shouldCheck) {
        const { locationValue } = getLocationValue(startValue + i, data);

        if (locationValue < lowestLocation) {
            lowestLocation = locationValue;
            debugger;
        }
    }
}

parentPort.postMessage(lowestLocation);
