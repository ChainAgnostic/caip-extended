import {
  AssetNameParams,
  CAIP,
  IdentifierSpec,
  getParams,
  joinParams,
} from "caip-common";
import {
  isValidEIP155AssetName,
  isValidEIP155AssetNamespaceAndReference,
} from "./utils";

export class EIP155AssetName {
  public static spec: IdentifierSpec = CAIP["19"].assetName;
  public namespace: string;
  public reference: string;

  constructor(params: AssetNameParams | string) {
    if (typeof params === "string") {
      params = EIP155AssetName.parse(params);
    }

    if (
      !isValidEIP155AssetNamespaceAndReference(
        params.namespace,
        params.reference
      )
    ) {
      throw new Error(
        `Invalid ${EIP155AssetName.spec.name} provided: ${params}`
      );
    }

    this.namespace = params.namespace;
    this.reference = params.reference;
  }

  public static parse(id: string): AssetNameParams {
    if (!isValidEIP155AssetName(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }
    return new EIP155AssetName(
      getParams<AssetNameParams>(id, this.spec)
    ).toJSON();
  }

  public static format(params: AssetNameParams): string {
    return joinParams(params as any, this.spec);
  }

  public toString(): string {
    return EIP155AssetName.format(this.toJSON());
  }

  public toJSON(): AssetNameParams {
    return {
      namespace: this.namespace,
      reference: this.reference,
    };
  }
}
