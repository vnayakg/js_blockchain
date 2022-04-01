const cryptoHash = require("../../util/crypto-hash");

describe("cryptoHash()", () => {
    it("generate SHA-256 hashed output", () => {
        expect(cryptoHash("vinayak")).toEqual(
            "1fba11a9264d0901e3b7d69144faf40265c17fad180e51a2bf8d3f9983e09a9a"
        );
    });

    it("produces the same hash with same input in any order", () => {
        expect(cryptoHash("one", "two", "three")).toEqual(
            cryptoHash("two", "one", "three")
        );
    });
});
