import { EIP155AssetName } from "./assetName";
import { EIP155ChainId } from "./chain";
import { isValidEIP155AssetId } from "./utils";
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

export class EIP155AssetId extends AssetId {
  public static spec: IdentifierSpec = CAIP["19"].assetId;
  public chainId: ChainId;
  public assetName: AssetName;
  public tokenId: string;

  constructor(params: AssetIdParams | string) {
    super(params);
    if (typeof params === "string") {
      params = EIP155AssetId.parse(params);
    }

    this.chainId = new EIP155ChainId(params.chainId);
    this.assetName = new EIP155AssetName(params.assetName);
    // todo check if this is a valid token id
    this.tokenId = params.tokenId;
  }

  public static parse(id: string): AssetIdParams {
    if (!isValidEIP155AssetId(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }
    return new EIP155AssetId(getParams<AssetIdParams>(id, this.spec)).toJSON();
  }
}
