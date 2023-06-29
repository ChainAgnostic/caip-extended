import { AssetType, AssetTypeParams, getParams } from "caip-common";

import { EIP155ChainId } from "./chain";
import { EIP155AssetName } from "./assetName";
import { isValidEIP155AssetType } from "./utils";

export class EIP155AssetType extends AssetType {
  constructor(params: AssetTypeParams | string) {
    super(params);
    if (typeof params === "string") {
      params = EIP155AssetType.parse(params);
    }

    this.chainId = new EIP155ChainId(params.chainId);
    this.assetName = new EIP155AssetName(params.assetName);
  }

  public static parse(id: string): AssetTypeParams {
    if (!isValidEIP155AssetType(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }
    return new EIP155AssetType(
      getParams<AssetTypeParams>(id, this.spec)
    ).toJSON();
  }
}
