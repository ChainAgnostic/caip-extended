import { HederaAssetName } from "../src/assetName";

import * as data from "./fixtures/data";

function assertInterface(result: HederaAssetName) {
  expect(result.namespace).toEqual(data.ASSET_NAMESPACE);
  expect(result.reference).toEqual(data.ASSET_REFERENCE);
  expect(result.toString()).toEqual(data.ASSET_NAME_STRING);
  expect(result.toJSON()).toEqual(data.ASSET_NAME_PARAMS);
}

describe("HederaAssetName", () => {
  it("should parse string", async () => {
    const result = HederaAssetName.parse(data.ASSET_NAME_STRING);
    expect(result).toEqual(data.ASSET_NAME_PARAMS);
  });

  it("should format params", async () => {
    const result = HederaAssetName.format(data.ASSET_NAME_PARAMS);
    expect(result).toEqual(data.ASSET_NAME_STRING);
  });

  it("should instantiate from params", async () => {
    const result = new HederaAssetName(data.ASSET_NAME_PARAMS);
    assertInterface(result);
  });

  it("should instantiate from string", async () => {
    const result = new HederaAssetName(data.ASSET_NAME_STRING);
    assertInterface(result);
  });

  it("should instantiate from nested params", async () => {
    const result = new HederaAssetName(data.ASSET_NAME_PARAMS);
    assertInterface(result);
  });

  it("should support JSON.stringify", async () => {
    const result = new HederaAssetName(data.ASSET_NAME_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertInterface(new HederaAssetName(json));
  });

  it("should fail if incorrect namespace", async () => {
    expect(() => {
      new HederaAssetName(
        data.INVALID_ASSET_NAME_PARAMS_WITH_INCORRECT_NAMESPACE
      );
    }).toThrow();
    expect(() => {
      HederaAssetName.parse(
        data.INVALID_ASSET_NAME_STRING_WITH_INCORRECT_NAMESPACE
      );
    }).toThrow();
  });

  it("should fail if incorrect reference", async () => {
    expect(() => {
      new HederaAssetName(
        data.INVALID_ASSET_NAME_PARAMS_WITH_INCORRECT_REFERENCE
      );
    }).toThrow();

    expect(() => {
      HederaAssetName.parse(
        data.INVALID_ASSET_NAME_STRING_WITH_INCORRECT_REFERENCE
      );
    }).toThrow();
  });

  it("should not parse invalid AssetName string", async () => {
    expect(() => {
      HederaAssetName.parse(
        data.INVALID_ASSET_NAME_STRING_WITH_INCORRECT_REFERENCE
      );
    }).toThrow();
    expect(() => {
      HederaAssetName.parse(
        data.INVALID_ASSET_NAME_STRING_WITH_INCORRECT_NAMESPACE
      );
    }).toThrow();
  });
});
