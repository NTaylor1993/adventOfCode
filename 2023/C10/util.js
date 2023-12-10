export const getStartPosition = (data) => {
    let start = {};
    let isLoop = [];

    for (let y = 0; y < data.length; y++) {
        isLoop[y] = [];
        let line = data[y];
        for (let x = 0; x < line.length; x++) {
            if (line[x] === "S") {
                start = { x, y };
            }
        }
    }

    return { start, isLoop };
};

export const getStartDir = (data, start) => {
    let x = start.x;
    let y = start.y;
    let dir;

    let below = data[y + 1][x];
    if (below === "|" || below === "L" || below === "J") {
        return { dir: "S", x, y: y + 1 };
    }
    if (!dir) {
        let above = data[y - 1][x];
        if (above === "|" || above === "F" || above === "7") {
            return { dir: "N", x, y: y - 1 };
        }
    }
    if (!dir) {
        return { dir: "E", x: x + 1, y };
    }
};

export const getDir = (deltaX, deltaY) => {
    if (deltaY === 1) {
        return "S";
    } else if (deltaY === -1) {
        return "N";
    } else if (deltaX === -1) {
        return "W";
    } else {
        return "E";
    }
};

export const getDelta = (data, dir, x, y) => {
    let deltaX = 0;
    let deltaY = 0;

    switch (data[y][x] + dir) {
        case "|S":
            deltaY = 1;
            break;
        case "|N":
            deltaY = -1;
            break;
        case "-E":
            deltaX = 1;
            break;
        case "-W":
            deltaX = -1;
            break;
        case "LS":
            deltaX = 1;
            break;
        case "LW":
            deltaY = -1;
            break;
        case "JS":
            deltaX = -1;
            break;
        case "JE":
            deltaY = -1;
            break;
        case "7N":
            deltaX = -1;
            break;
        case "7E":
            deltaY = 1;
            break;
        case "FN":
            deltaX = 1;
            break;
        case "FW":
            deltaY = 1;
            break;
        default:
            throw "unrecognized " + data[y][x] + dir;
    }

    return { deltaX, deltaY };
};
