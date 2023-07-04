import { SolanaChainId } from "../src/chain";
import {
  CHAIN_ID_NAMESPACE,
  CHAIN_ID_PARAMS,
  CHAIN_ID_REFERENCE,
  CHAIN_ID_STRING,
} from "./fixtures/data";

function assertChainIdInterface(result: SolanaChainId) {
  expect(result.namespace).toEqual(CHAIN_ID_NAMESPACE);
  expect(result.reference).toEqual(CHAIN_ID_REFERENCE);
  expect(result.toString()).toEqual(CHAIN_ID_STRING);
  expect(result.toJSON()).toEqual(CHAIN_ID_PARAMS);
}

describe("SolanaChainId", () => {
  it("should parse string", async () => {
    const result = SolanaChainId.parse(CHAIN_ID_STRING);
    expect(result).toEqual(CHAIN_ID_PARAMS);
  });

  it("should format params", async () => {
    const result = SolanaChainId.format(CHAIN_ID_PARAMS);
    expect(result).toEqual(CHAIN_ID_STRING);
  });

  it("should instantiate from json", async () => {
    const result = new SolanaChainId(CHAIN_ID_PARAMS);
    assertChainIdInterface(result);
  });

  it("should instantiate from string", async () => {
    const result = new SolanaChainId(CHAIN_ID_STRING);
    assertChainIdInterface(result);
  });

  it("should support JSON.stringify", async () => {
    const result = new SolanaChainId(CHAIN_ID_STRING);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertChainIdInterface(new SolanaChainId(json));
  });

  it("should not parse invalid string", async () => {
    expect(() => {
      SolanaChainId.parse("test:1:2");
    }).toThrow();

    expect(() => {
      SolanaChainId.parse("test");
    }).toThrow();
  });

  it("should fail if namespace is not solana", async () => {
    expect(() => {
      new SolanaChainId("eip1191:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp");
    }).toThrow();

    expect(() => {
      new SolanaChainId({
        namespace: "eip1191",
        reference: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
      });
    }).toThrow();
  });

  it("should fail if reference is not a valid network", async () => {
    expect(() => {
      new SolanaChainId("solana:abc");
    }).toThrow();

    expect(() => {
      new SolanaChainId({
        namespace: "solana",
        reference: "abc",
      });
    }).toThrow();
  });
});
