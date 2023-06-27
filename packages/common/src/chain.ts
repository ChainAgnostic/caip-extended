import { joinParams } from "./utils";
import { ChainIdParams, IdentifierSpec, Params } from "./types";
import { CAIP } from "./spec";

export class ChainId {
  public static spec: IdentifierSpec = CAIP["2"];
  public namespace: string;
  public reference: string;

  constructor(params: ChainIdParams | string) {}

  public toString(): string {
    return ChainId.format(this.toJSON());
  }

  public static format(params: ChainIdParams): string {
    return joinParams(
      {
        namespace: params.namespace,
        reference: params.reference,
      },
      this.spec
    );
  }

  public toJSON(): ChainIdParams {
    return {
      namespace: this.namespace,
      reference: this.reference,
    };
  }
}
