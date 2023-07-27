import { HederaAssetId } from "../src";

import * as data from "./fixtures/data";

function assertInterface(result: HederaAssetId) {
  expect(result.chainId.toString()).toEqual(data.CHAIN_ID_STRING);
  expect(result.assetName.toString()).toEqual(data.ASSET_NAME_STRING);
  expect(result.tokenId).toEqual(data.TOKEN_ID);
  expect(result.toString()).toEqual(data.ASSET_ID_STRING);
  expect(result.toJSON()).toEqual(data.ASSET_ID_NESTED_PARAMS);
}

describe("AssetId", () => {
  it("should parse string", () => {
    const result = HederaAssetId.parse(data.ASSET_ID_STRING);
    expect(result).toEqual(data.ASSET_ID_NESTED_PARAMS);
  });

  it("should format params", () => {
    const result = HederaAssetId.format(data.ASSET_ID_PARAMS);
    expect(result).toEqual(data.ASSET_ID_STRING);
  });

  it("should instantiate from params", () => {
    const result = new HederaAssetId(data.ASSET_ID_PARAMS);
    assertInterface(result);
  });

  it("should instantiate from string", () => {
    const result = new HederaAssetId(data.ASSET_ID_STRING);
    assertInterface(result);
  });

  it("should instantiate from nested params", () => {
    const result = new HederaAssetId(data.ASSET_ID_NESTED_PARAMS);
    assertInterface(result);
  });

  it("should support JSON.stringify", () => {
    const result = new HederaAssetId(data.ASSET_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertInterface(new HederaAssetId(json));
  });

  it("should throw an error if invalid AssetId is provided", () => {
    expect(() => {
      new HederaAssetId(data.INVALID_ASSET_ID_PARAMS);
    }).toThrow();
    expect(() => {
      new HederaAssetId(data.INVALID_ASSET_ID_NESTED_PARAMS);
    }).toThrow();
    expect(() => {
      new HederaAssetId(data.INVALID_ASSET_ID_STRING);
    }).toThrow();
  });

  it("should fail on parse if invalid AssetId is provided", () => {
    expect(() => {
      HederaAssetId.parse(data.INVALID_ASSET_ID_STRING);
    }).toThrow();
  });
});
