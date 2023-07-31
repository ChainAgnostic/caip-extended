# caip-extended

CAIP-Extended is a monorepo housing multiple [namespace][]-specific validation libraries for popular CAIP standards.

Currently, this monorepo includes a common core set of tools, and the code for the following [namespace][]-specific packages, which each provide validator functions for each of the syntaxes listed to the right

|namespace|CAIP-2|CAIP-10|CAIP-19|CAIP-122|
|---|---|---|---|---|
|EIP155|X|X|X| |
|Solana|X|X|X| |
|Hedera|X|X|X| |

This library is split into individual packages so you can use what you need.

- `caip-extended/common`: Generic package for validating CAIP values that are not namespace specific
- `caip-extended/eip155`: EIP-155 (i.e. Ethereum Virtual Machine) namespace package for validating CAIP values
- `caip-extended/solana`: Solana namespace package for validating CAIP values
- `caip-extended/hedera`: Hedera namespace package for validating CAIP values

# Getting Started

## ChainId (CAIP-2)

### Object-Oriented Example w/ EIP-155

```typescript
import { ERC155ChainId } from "caip-erc155";

const chainId = new ERC155ChainId("eip155:1");

// OR

const chainId = new ERC155ChainId({ namespace: "eip155", reference: "1" });

// THEN

chainId.toString();
// "eip155:1"

chainId.toJSON();
// { namespace: "eip155", reference: "1" }
```

### Functional Example w/ EIP-155

```typescript
import { ERC155ChainId } from "caip-erc155";

ERC155ChainId.parse("eip155:1");
// { namespace: "eip155", reference: "1" }

// AND

ERC155ChainId.format({ namespace: "eip155", reference: "1" });
// "eip155:1"
```

## AccountId (CAIP-10)

### Object-Oriented Example w/ EIP-155

```typescript
import { ERC155AccountId } from "caip-erc155";

const accountId = new ERC155AccountId(
  "eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
);

// OR

const accountId = new ERC155AccountId({
  chainId: { namespace: "eip155", reference: "1" },
  address: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
});

// ALSO

const accountId = new ERC155AccountId({
  chainId: "eip155:1",
  address: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
});

// THEN

accountId.toString();
// "eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"

accountId.toJSON();
// { address: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb", chainId: { namespace: "eip155", reference: "1" } }
```

### Functional Example w/ EIP-155

```typescript
import { ERC155AccountId } from "caip-erc155";

ERC155AccountId.parse("eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb");
// { address: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb", chainId: { namespace: "eip155", reference: "1" } }

// AND

ERC155AccountId.format({
  chainId: { namespace: "eip155", reference: "1" },
  address: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
});
//"eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"

// OR

ERC155AccountId.format({
  chainId: "eip155:1",
  address: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
});
//"eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
```

## AssetId (CAIP-19)

### Object-Oriented Example w/ EIP-155

```typescript
import { ERC155AssetId } from "caip-erc155";

const assetId = new ERC155AssetId(
  "eip155:1/erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb/1"
);

// OR

const assetId = new ERC155AssetId({
  chainId: { namespace: "eip155", reference: "1" },
  assetName: {
    namespace: "erc721",
    reference: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
  },
  tokenId: "1",
});

// ALSO

const assetId = new ERC155AssetId({
  chainId: "eip155:1",
  assetName: "erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
  tokenId: "1",
});

// THEN

assetId.toString();
// "eip155:1/erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb/1"

assetId.toJSON();
// {
//   chainId: { namespace: "eip155", reference: "1" },
//   assetName: { namespace: "erc721", reference: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb" },
//   tokenId: "1",
// }
```

### Functional Example w/ EIP-155

```typescript
import { ERC155AssetId } from "caip-erc155";

ERC155AssetId.parse(
  "eip155:1/erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb/1"
);
// {
//   chainId: { namespace: "eip155", reference: "1" },
//   assetName: { namespace: "erc721", reference: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb" },
//   tokenId: "1",
// }

// AND

ERC155AssetId.format({
  chainId: { namespace: "eip155", reference: "1" },
  assetName: {
    namespace: "erc721",
    reference: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
  },
  tokenId: "1",
});
// "eip155:1/erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb/1"

// OR

ERC155AssetId.format({
  chainId: "eip155:1",
  assetName: "erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
  tokenId: "1",
});
// "eip155:1/erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb/1"
```

## AssetType (CAIP-19)

### Object-Oriented Example w/ EIP-155

```typescript
import { ERC155AssetType } from "caip-erc155";

const assetType = new ERC155AssetType(
  "eip155:1/erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
);

// OR

const assetType = new ERC155AssetType({
  chainId: { namespace: "eip155", reference: "1" },
  assetName: {
    namespace: "erc721",
    reference: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
  },
});

// ALSO

const assetType = new ERC155AssetType({
  chainId: "eip155:1",
  assetName: "erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
});

// THEN

assetType.toString();
// "eip155:1/erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"

assetType.toJSON();
// {
//   chainId: { namespace: "eip155", reference: "1" },
//   assetName: { namespace: "erc721", reference: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb" },
// }
```

### Functional Example w/ EIP-155

```typescript
import { ERC155AssetType } from "caip-erc155";

ERC155AssetType.parse(
  "eip155:1/erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
);
// {
//   chainId: { namespace: "eip155", reference: "1" },
//   assetName: { namespace: "erc721", reference: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb" },
// }

// AND

ERC155AssetType.format({
  chainId: { namespace: "eip155", reference: "1" },
  assetName: {
    namespace: "erc721",
    reference: "0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
  },
});
// "eip155:1/erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"

// OR

ERC155AssetType.format({
  chainId: "eip155:1",
  assetName: "erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
});
// "eip155:1/erc721:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"
```

# Adding new namespaces

This repo uses `pnpm` workspaces and is a Lerna monorepo. To add a new namespace package under the monorepo, follow these steps:

- Create a new package under the `pnpm` workspace under the `packages/` directory
- Setup the config files
  - Setup `package.json` with the proper package name and package version to match Lerna
  - Setup `tsconfig.json` and `jest.config.ts`
- Write the code under `src/`
- Write tests under `__tests__/`
- `pnpm build` and `pnpm test`
- Update the `README.md` to include your new namespace in the table
- Publish the packages to `npm` using Lerna

To add a new common utility (i.e. a new CAIP to profile in each repo), reach out to CASA for guidance by opening an issue that names the CAIP, and tag the authors of that CAIP.

# References

- `ChainAgnostic/caip-js`: This project referenced some code and took inspiration from `caip-js` published under the MIT License, and is in many ways a per-chain-packaged extension of that toolchain into each supported namespace.  The initial work was completed by @Sneh1999 as part of a bounty through [Learnweb3.io](https://learnweb3.io), and the repo and libraries are now maintained by CASA.

[namespace]: https://namespaces.chainagnostic.org

# License

This repository is licensed under the MIT License.
