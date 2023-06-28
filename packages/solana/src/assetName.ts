import {
  isValidId,
  getParams,
  IdentifierSpec,
  CAIP,
  AssetName,
} from "caip-common";
import {
  isValidSolanaAssetName,
  isValidSolanaAssetNameAndReference,
} from "./utils";

export interface AssetNameParams {
  namespace: string;
  reference: string;
}

export class SolanaAssetName extends AssetName {
  public static spec: IdentifierSpec = CAIP["19"].assetName;
  public namespace: string;
  public reference: string;

  constructor(params: AssetNameParams | string) {
    super(params);

    if (typeof params === "string") {
      params = SolanaAssetName.parse(params);
    }

    if (
      !isValidSolanaAssetNameAndReference(params.namespace, params.reference)
    ) {
      throw new Error(`Invalid ${AssetName.spec.name} provided: ${params}`);
    }

    this.namespace = params.namespace;
    this.reference = params.reference;
  }

  public static parse(id: string): AssetNameParams {
    if (!isValidSolanaAssetName(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }
    return new SolanaAssetName(
      getParams<AssetNameParams>(id, this.spec)
    ).toJSON();
  }
}
