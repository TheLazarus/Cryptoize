import { getCryptoHistoryEndpoint, getFavorites } from "../utils";
import { describe } from "node:test";

describe("Unit tests on the utils", () => {
  it("Should get the correct history endpoint", () => {
    const endpoint = getCryptoHistoryEndpoint("bitcoin", "d2");
    expect(endpoint).toBe(
      `https://api.coincap.io/v2/assets/bitcoin/history?interval=d2`
    );
  });
});
