import {
  AssetId,
  AssetIdParams,
  AssetName,
  CAIP,
  ChainId,
  IdentifierSpec,
  getParams,
} from "caip-common";
import { HederaAssetName } from "./assetName";
import { HederaChainId } from "./chain";
import { isValidHederaAssetId, isValidHederaTokenId } from "./utils";

export class HederaAssetId extends AssetId {
  public static spec: IdentifierSpec = CAIP["19"].assetId;
  public chainId: ChainId;
  public assetName: AssetName;
  public tokenId: string;

  constructor(params: AssetIdParams | string) {
    super(params);
    if (typeof params === "string") {
      params = HederaAssetId.parse(params);
    }

    this.chainId = new HederaChainId(params.chainId);
    this.assetName = new HederaAssetName(params.assetName);

    if (!isValidHederaTokenId(params.tokenId)) {
      throw new Error(`Invalid ${HederaAssetId.spec.name} provided: ${params}`);
    }
    this.tokenId = params.tokenId;
  }

  public static parse(id: string): AssetIdParams {
    if (!isValidHederaAssetId(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }
    return new HederaAssetId(getParams<AssetIdParams>(id, this.spec)).toJSON();
  }
}
