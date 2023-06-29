import { EIP155AssetName } from "./assetName";
import { EIP155ChainId } from "./chain";
import { isValidEIP155AssetId, isValidEIP155TokenId } from "./utils";
import {
  AssetId,
  AssetIdParams,
  AssetName,
  CAIP,
  ChainId,
  IdentifierSpec,
  getParams,
} from "caip-common";

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

    if (!isValidEIP155TokenId(params.tokenId)) {
      throw new Error(`Invalid ${EIP155AssetId.spec.name} provided: ${params}`);
    }
    this.tokenId = params.tokenId;
  }

  public static parse(id: string): AssetIdParams {
    if (!isValidEIP155AssetId(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }
    return new EIP155AssetId(getParams<AssetIdParams>(id, this.spec)).toJSON();
  }
}
