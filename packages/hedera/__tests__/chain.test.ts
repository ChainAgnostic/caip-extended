import { HederaChainId } from "../src/chain";
import {
  CHAIN_ID_NAMESPACE,
  CHAIN_ID_PARAMS,
  CHAIN_ID_REFERENCE,
  CHAIN_ID_STRING,
} from "./fixtures/data";

function assertChainIdInterface(result: HederaChainId) {
  expect(result.namespace).toEqual(CHAIN_ID_NAMESPACE);
  expect(result.reference).toEqual(CHAIN_ID_REFERENCE);
  expect(result.toString()).toEqual(CHAIN_ID_STRING);
  expect(result.toJSON()).toEqual(CHAIN_ID_PARAMS);
}

describe("HederaChainId", () => {
  it("should parse string", async () => {
    const result = HederaChainId.parse(CHAIN_ID_STRING);
    expect(result).toEqual(CHAIN_ID_PARAMS);
  });

  it("should format params", async () => {
    const result = HederaChainId.format(CHAIN_ID_PARAMS);
    expect(result).toEqual(CHAIN_ID_STRING);
  });

  it("should instantiate from json", async () => {
    const result = new HederaChainId(CHAIN_ID_PARAMS);
    assertChainIdInterface(result);
  });

  it("should instantiate from string", async () => {
    const result = new HederaChainId(CHAIN_ID_STRING);
    assertChainIdInterface(result);
  });

  it("should support JSON.stringify", async () => {
    const result = new HederaChainId(CHAIN_ID_STRING);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertChainIdInterface(new HederaChainId(json));
  });

  it("should not parse invalid string", async () => {
    expect(() => {
      HederaChainId.parse("test:1:2");
    }).toThrow();

    expect(() => {
      HederaChainId.parse("test");
    }).toThrow();
  });

  it("should fail if namespace is not hedera", async () => {
    expect(() => {
      new HederaChainId("eip1191:mainnet");
    }).toThrow();

    expect(() => {
      new HederaChainId({
        namespace: "eip1191",
        reference: "mainnet",
      });
    }).toThrow();
  });

  it("should fail if reference is not a valid network", async () => {
    expect(() => {
      new HederaChainId("hedera:abc");
    }).toThrow();

    expect(() => {
      new HederaChainId({
        namespace: "hedera",
        reference: "abc",
      });
    }).toThrow();
  });
});
