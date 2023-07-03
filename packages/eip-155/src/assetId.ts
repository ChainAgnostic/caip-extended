import {
  AssetIdParams,
  CAIP,
  IdentifierSpec,
  getParams,
  isValidId,
  joinParams,
} from "caip-common";
import { EIP155AssetName } from "./assetName";
import { EIP155ChainId } from "./chain";
import { isValidEIP155AssetId, isValidEIP155TokenId } from "./utils";

export class EIP155AssetId {
  public static spec: IdentifierSpec = CAIP["19"].assetId;
  public chainId: EIP155ChainId;
  public assetName: EIP155AssetName;
  public tokenId: string;

  constructor(params: AssetIdParams | string) {
    if (typeof params === "string") {
      params = EIP155AssetId.parse(params);
    }

    this.chainId = new EIP155ChainId(params.chainId);
    this.assetName = new EIP155AssetName(params.assetName);

    if (!isValidEIP155TokenId(params.tokenId)) {
      throw new Error(
        `Invalid eip-155 ${EIP155AssetId.spec.name} provided: ${params}`
      );
    }
    this.tokenId = params.tokenId;
  }

  public static parse(id: string): AssetIdParams {
    if (!isValidId(id, this.spec)) {
      throw new Error(`Invalid eip-155 ${this.spec.name} provided: ${id} `);
    }

    if (!isValidEIP155AssetId(id)) {
      throw new Error(`Invalid eip-155 ${this.spec.name} provided: ${id}`);
    }
    return new EIP155AssetId(getParams<AssetIdParams>(id, this.spec)).toJSON();
  }

  public static format(params: AssetIdParams): string {
    return joinParams(params as any, this.spec);
  }

  public toString(): string {
    return EIP155AssetId.format(this.toJSON());
  }

  public toJSON(): AssetIdParams {
    return {
      chainId: this.chainId.toJSON(),
      assetName: this.assetName.toJSON(),
      tokenId: this.tokenId,
    };
  }
}
