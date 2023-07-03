import {
  AssetTypeParams,
  CAIP,
  IdentifierSpec,
  getParams,
  isValidId,
  joinParams,
} from "caip-common";

import { SolanaAssetName } from "./assetName";
import { SolanaChainId } from "./chain";
import { isValidSolanaAssetType } from "./utils";

export class SolanaAssetType {
  public static spec: IdentifierSpec = CAIP["19"].assetType;
  public chainId: SolanaChainId;
  public assetName: SolanaAssetName;

  constructor(params: AssetTypeParams | string) {
    if (typeof params === "string") {
      params = SolanaAssetType.parse(params);
    }

    this.chainId = new SolanaChainId(params.chainId);
    this.assetName = new SolanaAssetName(params.assetName);
  }

  public static parse(id: string): AssetTypeParams {
    if (!isValidId(id, this.spec)) {
      throw new Error(`Invalid solana ${this.spec.name} provided: ${id}`);
    }
    if (!isValidSolanaAssetType(id)) {
      throw new Error(`Invalid solana ${this.spec.name} provided: ${id}`);
    }
    return new SolanaAssetType(
      getParams<AssetTypeParams>(id, this.spec)
    ).toJSON();
  }

  public static format(params: AssetTypeParams): string {
    return joinParams(params as any, this.spec);
  }

  public toString(): string {
    return SolanaAssetType.format(this.toJSON());
  }

  public toJSON(): AssetTypeParams {
    return {
      chainId: this.chainId.toJSON(),
      assetName: this.assetName,
    };
  }
}
