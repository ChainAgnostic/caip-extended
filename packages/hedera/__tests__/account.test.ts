import { HederaAccountId } from "../src";

import * as data from "./fixtures/data";

function assertAccountIdInterface(result: HederaAccountId) {
  expect(result.chainId.toString()).toEqual(data.CHAIN_ID_STRING);
  expect(result.address).toEqual(data.ACCOUNT_ID_ADDRESS);
  expect(result.toString()).toEqual(data.ACCOUNT_ID_STRING);
  expect(result.toJSON()).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
}

describe("HederaAccountId", () => {
  it("should parse string", () => {
    const result = HederaAccountId.parse(data.ACCOUNT_ID_STRING);
    expect(result).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
  });

  it("should format params", () => {
    const result = HederaAccountId.format(data.ACCOUNT_ID_PARAMS);
    expect(result).toEqual(data.ACCOUNT_ID_STRING);
  });

  it("should instantiate from params", () => {
    const result = new HederaAccountId(data.ACCOUNT_ID_PARAMS);
    assertAccountIdInterface(result);
  });

  it("should instantiate from string", () => {
    const result = new HederaAccountId(data.ACCOUNT_ID_STRING);
    assertAccountIdInterface(result);
  });

  it("should instantiate from nested params", () => {
    const result = new HederaAccountId(data.ACCOUNT_ID_NESTED_PARAMS);
    assertAccountIdInterface(result);
  });

  it("should support JSON.stringify", () => {
    const result = new HederaAccountId(data.ACCOUNT_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertAccountIdInterface(new HederaAccountId(json));
  });

  it("should support JSON.parse", () => {
    const result = new HederaAccountId(data.ACCOUNT_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertAccountIdInterface(new HederaAccountId(json));
  });

  it("should fail if invalid Hedera AccountId String", () => {
    expect(() => new HederaAccountId(data.INVALID_ACCOUNT_ID_STRING)).toThrow();
  });

  it("should fail if invalid Hedera AccountId Params", () => {
    expect(() => new HederaAccountId(data.INVALID_ACCOUNT_ID_PARAMS)).toThrow();
  });

  it("should fail on parse if Hedera AccountId String is invalid", () => {
    expect(() =>
      HederaAccountId.parse(data.INVALID_ACCOUNT_ID_STRING)
    ).toThrow();
  });

  it("should support toString", () => {
    const result = new HederaAccountId(data.ACCOUNT_ID_PARAMS);
    expect(result.toString()).toEqual(data.ACCOUNT_ID_STRING);
  });

  it("should support toJSON", () => {
    const result = new HederaAccountId(data.ACCOUNT_ID_PARAMS);
    expect(result.toJSON()).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
  });
});
