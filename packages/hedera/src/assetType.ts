import { AssetType, AssetTypeParams, getParams } from "caip-common";

import { HederaChainId } from "./chain";
import { HederaAssetName } from "./assetName";
import { isValidHederaAssetType } from "./utils";

export class HederaAssetType extends AssetType {
  constructor(params: AssetTypeParams | string) {
    super(params);
    if (typeof params === "string") {
      params = HederaAssetType.parse(params);
    }

    this.chainId = new HederaChainId(params.chainId);
    this.assetName = new HederaAssetName(params.assetName);
  }

  public static parse(id: string): AssetTypeParams {
    if (!isValidHederaAssetType(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }
    return new HederaAssetType(
      getParams<AssetTypeParams>(id, this.spec)
    ).toJSON();
  }
}
