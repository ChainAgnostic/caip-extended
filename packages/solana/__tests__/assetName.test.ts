import { SolanaAssetName } from "../src/assetName";

import * as data from "./fixtures/data";

function assertInterface(result: SolanaAssetName) {
  expect(result.namespace).toEqual(data.ASSET_NAMESPACE);
  expect(result.reference).toEqual(data.ASSET_REFERENCE);
  expect(result.toString()).toEqual(data.ASSET_NAME_STRING);
  expect(result.toJSON()).toEqual(data.ASSET_NAME_PARAMS);
}

describe("SolanaAssetName", () => {
  it("should parse string", () => {
    const result = SolanaAssetName.parse(data.ASSET_NAME_STRING);
    expect(result).toEqual(data.ASSET_NAME_PARAMS);
  });

  it("should format params", () => {
    const result = SolanaAssetName.format(data.ASSET_NAME_PARAMS);
    expect(result).toEqual(data.ASSET_NAME_STRING);
  });

  it("should instantiate from params", () => {
    const result = new SolanaAssetName(data.ASSET_NAME_PARAMS);
    assertInterface(result);
  });

  it("should instantiate from string", () => {
    const result = new SolanaAssetName(data.ASSET_NAME_STRING);
    assertInterface(result);
  });

  it("should instantiate from nested params", () => {
    const result = new SolanaAssetName(data.ASSET_NAME_PARAMS);
    assertInterface(result);
  });

  it("should support JSON.stringify", () => {
    const result = new SolanaAssetName(data.ASSET_NAME_PARAMS);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertInterface(new SolanaAssetName(json));
  });

  it("should fail if incorrect namespace", () => {
    expect(() => {
      new SolanaAssetName(
        data.INVALID_ASSET_NAME_PARAMS_WITH_INCORRECT_NAMESPACE
      );
    }).toThrow();
    expect(() => {
      SolanaAssetName.parse(
        data.INVALID_ASSET_NAME_STRING_WITH_INCORRECT_NAMESPACE
      );
    }).toThrow();
  });

  it("should fail if incorrect reference", () => {
    expect(() => {
      new SolanaAssetName(
        data.INVALID_ASSET_NAME_PARAMS_WITH_INCORRECT_REFERENCE
      );
    }).toThrow();

    expect(() => {
      SolanaAssetName.parse(
        data.INVALID_ASSET_NAME_STRING_WITH_INCORRECT_REFERENCE
      );
    }).toThrow();
  });

  it("should not parse invalid AssetName string", () => {
    expect(() => {
      SolanaAssetName.parse(
        data.INVALID_ASSET_NAME_STRING_WITH_INCORRECT_REFERENCE
      );
    }).toThrow();
    expect(() => {
      SolanaAssetName.parse(
        data.INVALID_ASSET_NAME_STRING_WITH_INCORRECT_NAMESPACE
      );
    }).toThrow();
  });
});
