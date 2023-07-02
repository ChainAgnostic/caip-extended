import {
  CAIP,
  ChainIdParams,
  IdentifierSpec,
  getParams,
  joinParams,
} from "caip-common";
import {
  isValidChainIdHederaNamespaceAndReference,
  isValidHederaChainId,
} from "./utils";

export class HederaChainId {
  public static spec: IdentifierSpec = CAIP["2"];
  public namespace: string;
  public reference: string;

  constructor(params: ChainIdParams | string) {
    if (typeof params === "string") {
      params = HederaChainId.parse(params);
    }

    if (
      !isValidChainIdHederaNamespaceAndReference(
        params.namespace,
        params.reference
      )
    ) {
      throw new Error(
        `Invalid hedera ${HederaChainId.spec.name} provided: ${params}`
      );
    }

    this.namespace = params.namespace;
    this.reference = params.reference;
  }

  public static parse(id: string): ChainIdParams {
    if (!isValidHederaChainId(id, this.spec)) {
      throw new Error(`Invalid hedera ${this.spec.name} provided: ${id} `);
    }

    const chainIdParams = getParams<ChainIdParams>(id, this.spec);
    return new HederaChainId(chainIdParams).toJSON();
  }

  public toString(): string {
    return HederaChainId.format(this.toJSON());
  }

  public static format(params: ChainIdParams): string {
    return joinParams(
      {
        namespace: params.namespace,
        reference: params.reference,
      },
      HederaChainId.spec
    );
  }

  public toJSON(): ChainIdParams {
    return {
      namespace: this.namespace,
      reference: this.reference,
    };
  }
}
