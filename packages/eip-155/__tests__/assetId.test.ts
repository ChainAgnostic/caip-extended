import { EIP155AssetId } from "../src";

import * as data from "./fixtures/data";

function assertInterface(result: EIP155AssetId) {
  expect(result.chainId.toString()).toEqual(data.CHAIN_ID_STRING);
  expect(result.assetName.toString()).toEqual(data.ASSET_NAME_STRING);
  expect(result.tokenId).toEqual(data.TOKEN_ID);
  expect(result.toString()).toEqual(data.ASSET_ID_STRING);
  expect(result.toJSON()).toEqual(data.ASSET_ID_NESTED_PARAMS);
}

describe("AssetId", () => {
  it("should parse string", async () => {
    const result = EIP155AssetId.parse(data.ASSET_ID_STRING);
    expect(result).toEqual(data.ASSET_ID_NESTED_PARAMS);
  });

  it("should format params", async () => {
    const result = EIP155AssetId.format(data.ASSET_ID_PARAMS);
    expect(result).toEqual(data.ASSET_ID_STRING);
  });

  it("should instantiate from params", async () => {
    const result = new EIP155AssetId(data.ASSET_ID_PARAMS);
    assertInterface(result);
  });

  it("should instantiate from string", async () => {
    const result = new EIP155AssetId(data.ASSET_ID_STRING);
    assertInterface(result);
  });

  it("should instantiate from nested params", async () => {
    const result = new EIP155AssetId(data.ASSET_ID_NESTED_PARAMS);
    assertInterface(result);
  });

  it("should support JSON.stringify", async () => {
    const result = new EIP155AssetId(data.ASSET_ID_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertInterface(new EIP155AssetId(json));
  });

  it("should throw an error if invalid AssetId is provided", async () => {
    expect(() => {
      new EIP155AssetId(data.INVALID_ASSET_ID_PARAMS);
    }).toThrow();
    expect(() => {
      new EIP155AssetId(data.INVALID_ASSET_ID_NESTED_PARAMS);
    }).toThrow();
    expect(() => {
      new EIP155AssetId(data.INVALID_ASSET_ID_STRING);
    }).toThrow();
  });

  it("should fail on parse if invalid AssetId is provided", async () => {
    expect(() => {
      EIP155AssetId.parse(data.INVALID_ASSET_ID_STRING);
    }).toThrow();
    expect(() => {
      EIP155AssetId.parse(data.INVALID_ASSET_ID_STRING_WITH_INVALID_TOKEN_ID);
    }).toThrow();
  });
});
