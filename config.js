const MINED_RATE = 1000
const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: "last-hash",
    hash: "ha_sh",
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: [],
};

module.exports = { GENESIS_DATA, MINED_RATE };
