import { EIP155ChainId } from "../src/chain";
import {
  CHAIN_ID_NAMESPACE,
  CHAIN_ID_PARAMS,
  CHAIN_ID_REFERENCE,
  CHAIN_ID_STRING,
} from "./fixtures/data";

function assertChainIdInterface(result: EIP155ChainId) {
  expect(result.namespace).toEqual(CHAIN_ID_NAMESPACE);
  expect(result.reference).toEqual(CHAIN_ID_REFERENCE);
  expect(result.toString()).toEqual(CHAIN_ID_STRING);
  expect(result.toJSON()).toEqual(CHAIN_ID_PARAMS);
}

describe("EIP155ChainId", () => {
  it("should parse string", () => {
    const result = EIP155ChainId.parse(CHAIN_ID_STRING);
    expect(result).toEqual(CHAIN_ID_PARAMS);
  });

  it("should format params", () => {
    const result = EIP155ChainId.format(CHAIN_ID_PARAMS);
    expect(result).toEqual(CHAIN_ID_STRING);
  });

  it("should instantiate from json", () => {
    const result = new EIP155ChainId(CHAIN_ID_PARAMS);
    assertChainIdInterface(result);
  });

  it("should instantiate from string", () => {
    const result = new EIP155ChainId(CHAIN_ID_STRING);
    assertChainIdInterface(result);
  });

  it("should support JSON.stringify", () => {
    const result = new EIP155ChainId(CHAIN_ID_STRING);
    const str = JSON.stringify(result);
    const json = JSON.parse(str);
    assertChainIdInterface(new EIP155ChainId(json));
  });

  it("should not parse invalid string", () => {
    expect(() => {
      EIP155ChainId.parse("eip155:1:2");
    }).toThrow();

    expect(() => {
      EIP155ChainId.parse("eip155");
    }).toThrow();
  });

  it("should fail if namespace is not eip-155", () => {
    expect(() => {
      new EIP155ChainId("eip1191:1");
    }).toThrow();

    expect(() => {
      new EIP155ChainId({
        namespace: "eip1191",
        reference: "1",
      });
    }).toThrow();
  });

  it("should fail if reference is not a number", () => {
    expect(() => {
      new EIP155ChainId("eip155:abc");
    }).toThrow();

    expect(() => {
      new EIP155ChainId({
        namespace: "eip155",
        reference: "abc",
      });
    }).toThrow();
  });

  it("should fail if reference is not an integer", () => {
    expect(() => {
      new EIP155ChainId("eip155:1.1");
    }).toThrow();

    expect(() => {
      new EIP155ChainId({
        namespace: "eip155",
        reference: "1.1",
      });
    }).toThrow();
  });

  it("should fail if reference is not positive", () => {
    expect(() => {
      new EIP155ChainId("eip155:-1");
    }).toThrow();

    expect(() => {
      new EIP155ChainId({
        namespace: "eip155",
        reference: "-1",
      });
    }).toThrow();
  });

  it("should fail if reference is more than 32 characters", () => {
    expect(() => {
      new EIP155ChainId("eip155:123456789012345678901234567890123");
    }).toThrow();

    expect(() => {
      new EIP155ChainId({
        namespace: "eip155",
        reference: "123456789012345678901234567890123",
      });
    }).toThrow();
  });
});
