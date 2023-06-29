import { CAIP } from "./spec";
import { AssetNameParams, IdentifierSpec } from "./types";
import { isValidId, joinParams, getParams } from "./utils";

export class AssetName {
  public static spec: IdentifierSpec = CAIP["19"].assetName;
  public namespace: string;
  public reference: string;

  constructor(params: AssetNameParams | string) {}

  public static format(params: AssetNameParams): string {
    return joinParams(params as any, this.spec);
  }

  public toString(): string {
    return AssetName.format(this.toJSON());
  }

  public toJSON(): AssetNameParams {
    return {
      namespace: this.namespace,
      reference: this.reference,
    };
  }
}
