import {
  CAIP,
  ChainIdParams,
  IdentifierSpec,
  Params,
  getParams,
  isValidId,
  joinParams,
} from "caip-common";
import { isValidSolanaId } from "./utils";

export class ChainId {
  public static spec: IdentifierSpec = CAIP["2"];
  public namespace: string;
  public reference: string;

  constructor(params: ChainIdParams | string) {
    if (typeof params === "string") {
      params = ChainId.parse(params);
    }

    this.namespace = params.namespace;
    this.reference = params.reference;
  }

  public static parse(id: string): ChainIdParams {
    if (!isValidId(id, this.spec)) {
      throw new Error(`Invalid ${this.spec.name} provided: ${id}`);
    }

    if (!isValidSolanaId(id, this.spec)) {
      throw new Error(`Invalid solana ${this.spec.name} provided: ${id} `);
    }

    const chainIdParams = getParams<ChainIdParams>(id, this.spec);
    return new ChainId(chainIdParams).toJSON();
  }

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
