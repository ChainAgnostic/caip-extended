import {
  CAIP,
  ChainIdParams,
  IdentifierSpec,
  getParams,
  isValidId,
  joinParams,
} from "caip-common";
import {
  isValidEIP155ChainId,
  isValidEIP155ChainIdNamespaceAndReference,
} from "./utils";

export class EIP155ChainId {
  public static spec: IdentifierSpec = CAIP["2"];
  public namespace: string;
  public reference: string;

  constructor(params: ChainIdParams | string) {
    if (typeof params === "string") {
      params = EIP155ChainId.parse(params);
    }

    if (
      !isValidEIP155ChainIdNamespaceAndReference(
        params.namespace,
        params.reference
      )
    ) {
      throw new Error(
        `Invalid eip-155 ${EIP155ChainId.spec.name} provided: ${params}`
      );
    }
    this.namespace = params.namespace;
    this.reference = params.reference;
  }

  public static parse(id: string): ChainIdParams {
    if (!isValidId(id, this.spec)) {
      throw new Error(`Invalid eip-155 ${this.spec.name} provided: ${id} `);
    }
    if (!isValidEIP155ChainId(id)) {
      throw new Error(`Invalid eip-155 ${this.spec.name} provided: ${id} `);
    }

    const chainIdParams = getParams<ChainIdParams>(id, this.spec);
    return new EIP155ChainId(chainIdParams).toJSON();
  }

  public toString(): string {
    return EIP155ChainId.format(this.toJSON());
  }

  public static format(params: ChainIdParams): string {
    return joinParams(
      {
        namespace: params.namespace,
        reference: params.reference,
      },
      EIP155ChainId.spec
    );
  }

  public toJSON(): ChainIdParams {
    return {
      namespace: this.namespace,
      reference: this.reference,
    };
  }
}
