import { AssetName, AssetNameParams } from "./assetName";
import { ChainId } from "./chain";
import { ChainIdParams } from "./types";
import { CAIP } from "./spec";
import { IdentifierSpec } from "./types";
import { isValidId, joinParams, getParams } from "./utils";

export interface AssetIdParams {
  chainId: string | ChainIdParams;
  assetName: string | AssetNameParams;
  tokenId: string;
}

export class AssetId {
  public static spec: IdentifierSpec = CAIP["19"].assetId;
  public chainId: ChainId;
  public assetName: AssetName;
  public tokenId: string;

  constructor(params: AssetIdParams | string) {}

  public static format(params: AssetIdParams): string {
    return joinParams(params as any, this.spec);
  }

  public toString(): string {
    return AssetId.format(this.toJSON());
  }

  public toJSON(): AssetIdParams {
    return {
      chainId: this.chainId.toJSON(),
      assetName: this.assetName.toJSON(),
      tokenId: this.tokenId,
    };
  }
}
