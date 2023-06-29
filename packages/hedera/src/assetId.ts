import { HederaAssetName } from "./assetName";
import { HederaChainId } from "./chain";
import { isValidHederaAssetId, isValidHederaAssetType } from "./utils";
import {
  AssetId,
  AssetName,
  AssetNameParams,
  CAIP,
  ChainId,
  ChainIdParams,
  IdentifierSpec,
  getParams,
} from "caip-common";

export interface AssetIdParams {
  chainId: string | ChainIdParams;
  assetName: string | AssetNameParams;
  tokenId: string;
}

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
    // todo check if this is a valid token id
    this.tokenId = params.tokenId;
  }

  public static parse(id: string): AssetIdParams {
    if (!isValidHederaAssetType(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }
    return new HederaAssetId(getParams<AssetIdParams>(id, this.spec)).toJSON();
  }
}
