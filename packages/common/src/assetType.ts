import { AssetName, AssetNameParams } from "./assetName";
import { ChainId } from "./chain";
import { ChainIdParams } from "./types";
import { CAIP } from "./spec";
import { IdentifierSpec } from "./types";
import { isValidId, joinParams, getParams } from "./utils";

export interface AssetTypeParams {
  chainId: string | ChainIdParams;
  assetName: string | AssetNameParams;
}

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
