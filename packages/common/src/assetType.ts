import { AssetName } from "./assetName";
import { ChainId } from "./chain";
import { CAIP } from "./spec";
import { AssetTypeParams, IdentifierSpec } from "./types";
import { joinParams } from "./utils";

export class AssetType {
  public static spec: IdentifierSpec = CAIP["19"].assetType;
  public chainId: ChainId;
  public assetName: AssetName;

  constructor(params: AssetTypeParams | string) {}

  public static format(params: AssetTypeParams): string {
    return joinParams(params as any, this.spec);
  }

  public toString(): string {
    return AssetType.format(this.toJSON());
  }

  public toJSON(): AssetTypeParams {
    return {
      chainId: this.chainId.toJSON(),
      assetName: this.assetName,
    };
  }
}
