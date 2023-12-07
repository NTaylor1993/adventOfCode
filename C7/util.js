import { cardValueMap } from "./constants.js";

export const calculateHandStrength = (hand) => {
    const cards = hand.split("");

    const cardCounts = {};
    cards.forEach((card) => {
        if (cardCounts[card]) {
            cardCounts[card]++;
        } else {
            cardCounts[card] = 1;
        }
    });

    const cardKeys = Object.keys(cardCounts);

    if (cardKeys.length === 5) {
        // If all cards are unique - high card
        return 1;
    }
    if (cardKeys.length === 4) {
        // If one one card is repeated - pair
        return 2;
    }
    if (cardKeys.length === 3) {
        // Could be two pair or three of a kind
        if (Object.values(cardCounts).filter((c) => c === 1).length === 1) {
            // If there is only 1 value with 1 card - two pair
            return 3;
        } else {
            // If there is 2 values with 1 card - three of a kind
            return 4;
        }
    }
    if (cardKeys.length === 2) {
        // Could be full house or four of a kind
        if (Object.values(cardCounts).filter((c) => c === 1).length === 0) {
            // If there is 0 values with 1 card - full house
            return 5;
        } else {
            // If there is 1 value with 1 card - four of a kind
            return 6;
        }
    }
    // The only remaing one - five of a kind
    return 7;
};

export const calculateHandStrengthWildcard = (hand) => {
    const cards = hand.split("");

    const cardCounts = {};
    cards.forEach((card) => {
        if (cardCounts[card]) {
            cardCounts[card]++;
        } else {
            cardCounts[card] = 1;
        }
    });

    const jokers = cardCounts.J;
    delete cardCounts.J;
    const cardKeys = Object.keys(cardCounts);

    if (jokers) {
        const highestValue = Math.max(...Object.values(cardCounts));
        cardCounts[Object.keys(cardCounts).find((key) => cardCounts[key] === highestValue)] +=
            jokers;
    }

    if (cardKeys.length === 5) {
        // If all cards are unique - high card
        return 1;
    }
    if (cardKeys.length === 4) {
        // If one one card is repeated - pair
        return 2;
    }
    if (cardKeys.length === 3) {
        // Could be two pair or three of a kind
        if (Object.values(cardCounts).filter((c) => c === 1).length === 1) {
            // If there is only 1 value with 1 card - two pair
            return 3;
        } else {
            // If there is 2 values with 1 card - three of a kind
            return 4;
        }
    }
    if (cardKeys.length === 2) {
        // Could be full house or four of a kind
        if (Object.values(cardCounts).filter((c) => c === 1).length === 0) {
            // If there is 0 values with 1 card - full house
            return 5;
        } else {
            // If there is 1 value with 1 card - four of a kind
            return 6;
        }
    }
    // The only remaing one - five of a kind
    return 7;
};

export const sortHands = (a, b) => {
    const hSA = a.handStrength;
    const hSB = b.handStrength;

    if (hSA === hSB) {
        const aSplit = a.hand.split("");
        const bSplit = b.hand.split("");

        for (let i = 0; i < aSplit.length; i++) {
            const aX = aSplit[i];
            const bX = bSplit[i];

            if (cardValueMap[aX] < cardValueMap[bX]) {
                return -1;
            }
            if (cardValueMap[aX] > cardValueMap[bX]) {
                return 1;
            }
        }
    }

    return hSA - hSB;
};
