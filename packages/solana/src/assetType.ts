import { AssetType, AssetTypeParams, getParams } from "caip-common";

import { SolanaAssetName } from "./assetName";
import { SolanaChainId } from "./chain";
import { isValidSolanaAssetType } from "./utils";

export class SolanaAssetType extends AssetType {
  constructor(params: AssetTypeParams | string) {
    super(params);
    if (typeof params === "string") {
      params = SolanaAssetType.parse(params);
    }

    this.chainId = new SolanaChainId(params.chainId);
    this.assetName = new SolanaAssetName(params.assetName);
  }

  public static parse(id: string): AssetTypeParams {
    if (!isValidSolanaAssetType(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }
    return new SolanaAssetType(
      getParams<AssetTypeParams>(id, this.spec)
    ).toJSON();
  }
}
