import { EIP155AssetType } from "../src";

import * as data from "./fixtures/data";

function assertInterface(result: EIP155AssetType) {
  expect(result.chainId.toString()).toEqual(data.CHAIN_ID_STRING);
  expect(result.assetName.toString()).toEqual(data.ASSET_NAME_STRING);
  expect(result.toString()).toEqual(data.ASSET_TYPE_STRING);
  expect(result.toJSON()).toEqual(data.ASSET_TYPE_NESTED_PARAMS);
}

describe("EIP155AssetType", () => {
  it("should parse string", () => {
    const result = EIP155AssetType.parse(data.ASSET_TYPE_STRING);
    expect(result).toEqual(data.ASSET_TYPE_NESTED_PARAMS);
  });

  it("should format params", () => {
    const result = EIP155AssetType.format(data.ASSET_TYPE_PARAMS);
    expect(result).toEqual(data.ASSET_TYPE_STRING);
  });

  it("should instantiate from params", () => {
    const result = new EIP155AssetType(data.ASSET_TYPE_PARAMS);
    assertInterface(result);
  });

  it("should instantiate from string", () => {
    const result = new EIP155AssetType(data.ASSET_TYPE_STRING);
    assertInterface(result);
  });

  it("should instantiate from nested params", () => {
    const result = new EIP155AssetType(data.ASSET_TYPE_NESTED_PARAMS);
    assertInterface(result);
  });

  it("should support JSON.stringify", () => {
    const result = new EIP155AssetType(data.ASSET_TYPE_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertInterface(new EIP155AssetType(json));
  });

  it("should throw an error if invalid AssetType is provided", () => {
    expect(() => {
      new EIP155AssetType(data.INVALID_ASSET_TYPE_PARAMS);
    }).toThrow();
    expect(() => {
      new EIP155AssetType(data.INVALID_ASSET_TYPE_NESTED_PARAMS);
    }).toThrow();
  });

  it("should fail on parse if invalid AssetType is provided", () => {
    expect(() => {
      EIP155AssetType.parse(data.INVALID_ASSET_TYPE_STRING);
    }).toThrow();
  });
});
