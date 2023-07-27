import { EIP155AccountId } from "../src";

import * as data from "./fixtures/data";

function assertAccountIdInterface(result: EIP155AccountId) {
  expect(result.chainId.toString()).toEqual(data.CHAIN_ID_STRING);
  expect(result.address).toEqual(data.ACCOUNT_ID_ADDRESS);
  expect(result.toString()).toEqual(data.ACCOUNT_ID_STRING);
  expect(result.toJSON()).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
}

describe("EIP155AccountId", () => {
  it("should parse string", () => {
    const result = EIP155AccountId.parse(data.ACCOUNT_ID_STRING);
    expect(result).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
  });

  it("should format params", () => {
    const result = EIP155AccountId.format(data.ACCOUNT_ID_PARAMS);
    expect(result).toEqual(data.ACCOUNT_ID_STRING);
  });

  it("should instantiate from params", () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_PARAMS);
    assertAccountIdInterface(result);
  });

  it("should instantiate from string", () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_STRING);
    assertAccountIdInterface(result);
  });

  it("should instantiate from nested params", () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_NESTED_PARAMS);
    assertAccountIdInterface(result);
  });

  it("should support JSON.stringify", () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertAccountIdInterface(new EIP155AccountId(json));
  });

  it("should support JSON.parse", () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertAccountIdInterface(new EIP155AccountId(json));
  });

  it("should fail if invalid EIP155 AccountId String", () => {
    expect(() => new EIP155AccountId(data.INVALID_ACCOUNT_ID_STRING)).toThrow();
  });

  it("should fail if invalid EIP155 AccountId Params", () => {
    expect(() => new EIP155AccountId(data.INVALID_ACCOUNT_ID_PARAMS)).toThrow();
  });

  it("should fail on parse if EIP155 AccountId String is invalid", () => {
    expect(() =>
      EIP155AccountId.parse(data.INVALID_ACCOUNT_ID_STRING)
    ).toThrow();
  });

  it("should support toString", () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_PARAMS);
    expect(result.toString()).toEqual(data.ACCOUNT_ID_STRING);
  });

  it("should support toJSON", () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_PARAMS);
    expect(result.toJSON()).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
  });
});
