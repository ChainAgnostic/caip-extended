import { SolanaAccountId } from "../src";

import * as data from "./fixtures/data";

function assertAccountIdInterface(result: SolanaAccountId) {
  expect(result.chainId.toString()).toEqual(data.CHAIN_ID_STRING);
  expect(result.address).toEqual(data.ACCOUNT_ID_ADDRESS);
  expect(result.toString()).toEqual(data.ACCOUNT_ID_STRING);
  expect(result.toJSON()).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
}

describe("SolanaAccountId", () => {
  it("should parse string", async () => {
    const result = SolanaAccountId.parse(data.ACCOUNT_ID_STRING);
    expect(result).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
  });

  it.only("should format params", async () => {
    const result = SolanaAccountId.format(data.ACCOUNT_ID_PARAMS);
    expect(result).toEqual(data.ACCOUNT_ID_STRING);
  });

  it("should instantiate from params", async () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_PARAMS);
    assertAccountIdInterface(result);
  });

  it("should instantiate from string", async () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_STRING);
    assertAccountIdInterface(result);
  });

  it("should instantiate from nested params", async () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_NESTED_PARAMS);
    assertAccountIdInterface(result);
  });

  it("should support JSON.stringify", async () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertAccountIdInterface(new SolanaAccountId(json));
  });

  it("should support JSON.parse", async () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertAccountIdInterface(new SolanaAccountId(json));
  });

  it("should fail if invalid Solana AccountId String", async () => {
    expect(() => new SolanaAccountId(data.INVALID_ACCOUNT_ID_STRING)).toThrow();
  });

  it("should fail if invalid Solana AccountId Params", async () => {
    expect(() => new SolanaAccountId(data.INVALID_ACCOUNT_ID_PARAMS)).toThrow();
  });

  it("should fail on parse if Solana AccountId String is invalid", async () => {
    expect(() =>
      SolanaAccountId.parse(data.INVALID_ACCOUNT_ID_STRING)
    ).toThrow();
  });

  it("should support toString", async () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_PARAMS);
    expect(result.toString()).toEqual(data.ACCOUNT_ID_STRING);
  });

  it("should support toJSON", async () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_PARAMS);
    expect(result.toJSON()).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
  });
});
