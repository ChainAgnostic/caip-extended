import {
  AssetNameParams,
  CAIP,
  IdentifierSpec,
  getParams,
  joinParams,
} from "caip-common";
import {
  isValidSolanaAssetName,
  isValidSolanaAssetNameAndReference,
} from "./utils";

export class SolanaAssetName {
  public static spec: IdentifierSpec = CAIP["19"].assetName;
  public namespace: string;
  public reference: string;

  constructor(params: AssetNameParams | string) {
    if (typeof params === "string") {
      params = SolanaAssetName.parse(params);
    }

    if (
      !isValidSolanaAssetNameAndReference(params.namespace, params.reference)
    ) {
      throw new Error(
        `Invalid ${SolanaAssetName.spec.name} provided: ${params}`
      );
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

  public static format(params: AssetNameParams): string {
    return joinParams(params as any, this.spec);
  }

  public toString(): string {
    return SolanaAssetName.format(this.toJSON());
  }

  public toJSON(): AssetNameParams {
    return {
      namespace: this.namespace,
      reference: this.reference,
    };
  }
}
