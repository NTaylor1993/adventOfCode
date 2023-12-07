export const range = (...args) => definedRange(args[1] ? args[0] : 0, args[1] ?? args[0], args[2]);

const definedRange = (start, stop, step = 1) =>
    [...Array(Math.ceil((stop - start) / step))].map((_, i) => i * step + start);
