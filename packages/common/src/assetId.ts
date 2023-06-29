import { AssetName } from "./assetName";
import { ChainId } from "./chain";
import { CAIP } from "./spec";
import { AssetIdParams, IdentifierSpec } from "./types";
import { joinParams } from "./utils";

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
