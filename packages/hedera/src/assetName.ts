import {
  AssetNameParams,
  CAIP,
  IdentifierSpec,
  getParams,
  joinParams,
} from "caip-common";
import {
  isValidHederaAssetName,
  isValidHederaAssetNamespaceAndReference,
} from "./utils";

export class HederaAssetName {
  public static spec: IdentifierSpec = CAIP["19"].assetName;
  public namespace: string;
  public reference: string;

  constructor(params: AssetNameParams | string) {
    if (typeof params === "string") {
      params = HederaAssetName.parse(params);
    }

    if (
      !isValidHederaAssetNamespaceAndReference(
        params.namespace,
        params.reference
      )
    ) {
      throw new Error(
        `Invalid ${HederaAssetName.spec.name} provided: ${params}`
      );
    }

    this.namespace = params.namespace;
    this.reference = params.reference;
  }

  public static parse(id: string): AssetNameParams {
    if (!isValidHederaAssetName(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }
    return new HederaAssetName(
      getParams<AssetNameParams>(id, this.spec)
    ).toJSON();
  }

  public static format(params: AssetNameParams): string {
    return joinParams(params as any, this.spec);
  }

  public toString(): string {
    return HederaAssetName.format(this.toJSON());
  }

  public toJSON(): AssetNameParams {
    return {
      namespace: this.namespace,
      reference: this.reference,
    };
  }
}
