const cryptoHash = require("./crypto-hash");

describe("cryptoHash()", () => {
  it("generate SHA-256 hashed output", () => {
    expect(cryptoHash("vinayak")).toEqual(
      "1795aba0bc169c6eeabf09e4a6d5bf09e91bfcbb59bc36282fe2d3ba3b45f46b"
    );
  });

  it('produces the same hash with same input in any order',()=>{
      expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('two', 'one', 'three'))
  })
});

