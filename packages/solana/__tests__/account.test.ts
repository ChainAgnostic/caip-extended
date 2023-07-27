import { SolanaAccountId } from "../src";

import * as data from "./fixtures/data";

function assertAccountIdInterface(result: SolanaAccountId) {
  expect(result.chainId.toString()).toEqual(data.CHAIN_ID_STRING);
  expect(result.address).toEqual(data.ACCOUNT_ID_ADDRESS);
  expect(result.toString()).toEqual(data.ACCOUNT_ID_STRING);
  expect(result.toJSON()).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
}

describe("SolanaAccountId", () => {
  it("should parse string", () => {
    const result = SolanaAccountId.parse(data.ACCOUNT_ID_STRING);
    expect(result).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
  });

  it("should format params", () => {
    const result = SolanaAccountId.format(data.ACCOUNT_ID_PARAMS);
    expect(result).toEqual(data.ACCOUNT_ID_STRING);
  });

  it("should instantiate from params", () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_PARAMS);
    assertAccountIdInterface(result);
  });

  it("should instantiate from string", () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_STRING);
    assertAccountIdInterface(result);
  });

  it("should instantiate from nested params", () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_NESTED_PARAMS);
    assertAccountIdInterface(result);
  });

  it("should support JSON.stringify", () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertAccountIdInterface(new SolanaAccountId(json));
  });

  it("should support JSON.parse", () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertAccountIdInterface(new SolanaAccountId(json));
  });

  it("should fail if invalid Solana AccountId String", () => {
    expect(() => new SolanaAccountId(data.INVALID_ACCOUNT_ID_STRING)).toThrow();
  });

  it("should fail if invalid Solana AccountId Params", () => {
    expect(() => new SolanaAccountId(data.INVALID_ACCOUNT_ID_PARAMS)).toThrow();
  });

  it("should fail on parse if Solana AccountId String is invalid", () => {
    expect(() =>
      SolanaAccountId.parse(data.INVALID_ACCOUNT_ID_STRING)
    ).toThrow();
  });

  it("should support toString", () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_PARAMS);
    expect(result.toString()).toEqual(data.ACCOUNT_ID_STRING);
  });

  it("should support toJSON", () => {
    const result = new SolanaAccountId(data.ACCOUNT_ID_PARAMS);
    expect(result.toJSON()).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
  });
});
