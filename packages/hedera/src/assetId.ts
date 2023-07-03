import {
  AssetIdParams,
  CAIP,
  IdentifierSpec,
  getParams,
  isValidId,
  joinParams,
} from "caip-common";
import { HederaAssetName } from "./assetName";
import { HederaChainId } from "./chain";
import { isValidHederaAssetId, isValidHederaTokenId } from "./utils";

export class HederaAssetId {
  public static spec: IdentifierSpec = CAIP["19"].assetId;
  public chainId: HederaChainId;
  public assetName: HederaAssetName;
  public tokenId: string;

  constructor(params: AssetIdParams | string) {
    if (typeof params === "string") {
      params = HederaAssetId.parse(params);
    }

    this.chainId = new HederaChainId(params.chainId);
    this.assetName = new HederaAssetName(params.assetName);

    if (!isValidHederaTokenId(params.tokenId)) {
      throw new Error(
        `Invalid hedera ${HederaAssetId.spec.name} provided: ${params}`
      );
    }
    this.tokenId = params.tokenId;
  }

  public static parse(id: string): AssetIdParams {
    if (!isValidId(id, this.spec)) {
      throw new Error(`Invalid hedera ${this.spec.name} provided: ${id}`);
    }
    if (!isValidHederaAssetId(id)) {
      throw new Error(`Invalid hedera ${this.spec.name} provided: ${id}`);
    }
    return new HederaAssetId(getParams<AssetIdParams>(id, this.spec)).toJSON();
  }

  public static format(params: AssetIdParams): string {
    return joinParams(params as any, this.spec);
  }

  public toString(): string {
    return HederaAssetId.format(this.toJSON());
  }

  public toJSON(): AssetIdParams {
    return {
      chainId: this.chainId.toJSON(),
      assetName: this.assetName.toJSON(),
      tokenId: this.tokenId,
    };
  }
}
