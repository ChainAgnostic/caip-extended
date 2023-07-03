import {
  AssetTypeParams,
  CAIP,
  IdentifierSpec,
  getParams,
  isValidId,
  joinParams,
} from "caip-common";

import { HederaAssetName } from "./assetName";
import { HederaChainId } from "./chain";
import { isValidHederaAssetType } from "./utils";

export class HederaAssetType {
  public static spec: IdentifierSpec = CAIP["19"].assetType;
  public chainId: HederaChainId;
  public assetName: HederaAssetName;

  constructor(params: AssetTypeParams | string) {
    if (typeof params === "string") {
      params = HederaAssetType.parse(params);
    }

    this.chainId = new HederaChainId(params.chainId);
    this.assetName = new HederaAssetName(params.assetName);
  }

  public static parse(id: string): AssetTypeParams {
    if (!isValidId(id, this.spec)) {
      throw new Error(`Invalid hedera ${this.spec.name} provided: ${id}`);
    }
    if (!isValidHederaAssetType(id)) {
      throw new Error(`Invalid hedera ${this.spec.name} provided: ${id}`);
    }
    return new HederaAssetType(
      getParams<AssetTypeParams>(id, this.spec)
    ).toJSON();
  }

  public static format(params: AssetTypeParams): string {
    return joinParams(params as any, this.spec);
  }

  public toString(): string {
    return HederaAssetType.format(this.toJSON());
  }

  public toJSON(): AssetTypeParams {
    return {
      chainId: this.chainId.toJSON(),
      assetName: this.assetName,
    };
  }
}
