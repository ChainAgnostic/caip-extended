import {
  AssetTypeParams,
  CAIP,
  IdentifierSpec,
  getParams,
  joinParams,
} from "caip-common";

import { EIP155AssetName } from "./assetName";
import { EIP155ChainId } from "./chain";
import { isValidEIP155AssetType } from "./utils";

export class EIP155AssetType {
  public static spec: IdentifierSpec = CAIP["19"].assetType;
  public chainId: EIP155ChainId;
  public assetName: EIP155AssetName;

  constructor(params: AssetTypeParams | string) {
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

  public static format(params: AssetTypeParams): string {
    return joinParams(params as any, this.spec);
  }

  public toString(): string {
    return EIP155AssetType.format(this.toJSON());
  }

  public toJSON(): AssetTypeParams {
    return {
      chainId: this.chainId.toJSON(),
      assetName: this.assetName,
    };
  }
}
