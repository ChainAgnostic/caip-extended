import { EIP155AccountId } from "../src";

import * as data from "./fixtures/data";

function assertAccountIdInterface(result: EIP155AccountId) {
  expect(result.chainId.toString()).toEqual(data.CHAIN_ID_STRING);
  expect(result.address).toEqual(data.ACCOUNT_ID_ADDRESS);
  expect(result.toString()).toEqual(data.ACCOUNT_ID_STRING);
  expect(result.toJSON()).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
}

describe("EIP155AccountId", () => {
  it("should parse string", async () => {
    const result = EIP155AccountId.parse(data.ACCOUNT_ID_STRING);
    expect(result).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
  });

  it.only("should format params", async () => {
    const result = EIP155AccountId.format(data.ACCOUNT_ID_PARAMS);
    expect(result).toEqual(data.ACCOUNT_ID_STRING);
  });

  it("should instantiate from params", async () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_PARAMS);
    assertAccountIdInterface(result);
  });

  it("should instantiate from string", async () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_STRING);
    assertAccountIdInterface(result);
  });

  it("should instantiate from nested params", async () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_NESTED_PARAMS);
    assertAccountIdInterface(result);
  });

  it("should support JSON.stringify", async () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertAccountIdInterface(new EIP155AccountId(json));
  });

  it("should support JSON.parse", async () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertAccountIdInterface(new EIP155AccountId(json));
  });

  it("should fail if invalid EIP155 AccountId Params", async () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    json.address = "0x123";
    expect(() => new EIP155AccountId(json)).toThrow();
    expect(() => new EIP155AccountId({ ...json, chainId: "0x123" })).toThrow();
  });

  it("should fail if invalid EIP155 AccountId string", async () => {});

  it("should support toString", async () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_PARAMS);
    expect(result.toString()).toEqual(data.ACCOUNT_ID_STRING);
  });

  it("should support toJSON", async () => {
    const result = new EIP155AccountId(data.ACCOUNT_ID_PARAMS);
    expect(result.toJSON()).toEqual(data.ACCOUNT_ID_NESTED_PARAMS);
  });
});
