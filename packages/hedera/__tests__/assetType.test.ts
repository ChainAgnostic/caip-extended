import { HederaAssetType } from "../src";

import * as data from "./fixtures/data";

function assertInterface(result: HederaAssetType) {
  expect(result.chainId.toString()).toEqual(data.CHAIN_ID_STRING);
  expect(result.assetName.toString()).toEqual(data.ASSET_NAME_STRING);
  expect(result.toString()).toEqual(data.ASSET_TYPE_STRING);
  expect(result.toJSON()).toEqual(data.ASSET_TYPE_NESTED_PARAMS);
}

describe("HederaAssetType", () => {
  it("should parse string", async () => {
    const result = HederaAssetType.parse(data.ASSET_TYPE_STRING);
    expect(result).toEqual(data.ASSET_TYPE_NESTED_PARAMS);
  });

  it("should format params", async () => {
    const result = HederaAssetType.format(data.ASSET_TYPE_PARAMS);
    expect(result).toEqual(data.ASSET_TYPE_STRING);
  });

  it("should instantiate from params", async () => {
    const result = new HederaAssetType(data.ASSET_TYPE_PARAMS);
    assertInterface(result);
  });

  it("should instantiate from string", async () => {
    const result = new HederaAssetType(data.ASSET_TYPE_STRING);
    assertInterface(result);
  });

  it("should instantiate from nested params", async () => {
    const result = new HederaAssetType(data.ASSET_TYPE_NESTED_PARAMS);
    assertInterface(result);
  });

  it("should support JSON.stringify", async () => {
    const result = new HederaAssetType(data.ASSET_TYPE_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertInterface(new HederaAssetType(json));
  });

  it("should throw an error if invalid AssetType is provided", async () => {
    expect(() => {
      new HederaAssetType(data.INVALID_ASSET_TYPE_PARAMS);
    }).toThrow();
    expect(() => {
      new HederaAssetType(data.INVALID_ASSET_TYPE_NESTED_PARAMS);
    }).toThrow();
  });

  it("should fail on parse if invalid AssetType is provided", async () => {
    expect(() => {
      HederaAssetType.parse(data.INVALID_ASSET_TYPE_STRING);
    }).toThrow();
  });
});
