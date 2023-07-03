import {
  CAIP,
  ChainIdParams,
  IdentifierSpec,
  getParams,
  isValidId,
  joinParams,
} from "caip-common";
import {
  isValidSolanaChainId,
  isValidSolanaChainIdNamespaceAndReference,
} from "./utils";

export class SolanaChainId {
  public static spec: IdentifierSpec = CAIP["2"];
  public namespace: string;
  public reference: string;

  constructor(params: ChainIdParams | string) {
    if (typeof params === "string") {
      params = SolanaChainId.parse(params);
    }

    if (
      !isValidSolanaChainIdNamespaceAndReference(
        params.namespace,
        params.reference
      )
    ) {
      throw new Error(
        `Invalid solana ${SolanaChainId.spec.name} provided: ${params}`
      );
    }

    this.namespace = params.namespace;
    this.reference = params.reference;
  }

  public static parse(id: string): ChainIdParams {
    if (!isValidId(id, this.spec)) {
      throw new Error(`Invalid solana ${this.spec.name} provided: ${id}`);
    }
    if (!isValidSolanaChainId(id)) {
      throw new Error(`Invalid solana ${this.spec.name} provided: ${id} `);
    }

    const chainIdParams = getParams<ChainIdParams>(id, this.spec);
    return new SolanaChainId(chainIdParams).toJSON();
  }

  public toString(): string {
    return SolanaChainId.format(this.toJSON());
  }

  public static format(params: ChainIdParams): string {
    return joinParams(
      {
        namespace: params.namespace,
        reference: params.reference,
      },
      SolanaChainId.spec
    );
  }

  public toJSON(): ChainIdParams {
    return {
      namespace: this.namespace,
      reference: this.reference,
    };
  }
}
