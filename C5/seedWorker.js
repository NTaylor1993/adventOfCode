import { getLocationValue } from "./util.js";
import { parentPort, workerData } from "worker_threads";

const { seedRange, data, index } = workerData;
const { start, range } = seedRange;

let lowestLocation = Infinity;

for (let i = 0; i <= range; i++) {
    const { locationValue, minRange } = getLocationValue(start + i, data);

    // if (i % (range / 10) === 0) {
    //     console.log(
    //         `Thread ${index}: ${i} processed of ${range}: ${
    //             Math.trunc((i / range) * 10000) / 100
    //         }%`,
    //     );
    // }

    if (locationValue < lowestLocation) {
        lowestLocation = locationValue;

        if (minRange > 0) {
            i += minRange - 1;
        }
    }
}

parentPort.postMessage(lowestLocation);
