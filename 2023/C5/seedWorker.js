import { getLocationValue } from "./util.js";
import { parentPort, workerData } from "worker_threads";

const { seedRange, data } = workerData;
const { start, range } = seedRange;

let lowestLocation = Infinity;

for (let i = 0; i <= range; i++) {
    const { locationValue, minRange } = getLocationValue(start + i, data);

    if (locationValue < lowestLocation) {
        lowestLocation = locationValue;

        if (minRange > 0) {
            i += minRange - 1;
        }
    }
}

parentPort.postMessage(lowestLocation);

