# caip-extended

Mono Repo for CAIP namespaces

# Namespaces

- [caip-eip155](./packages/eip-155)
- [caip-hedera](./packages/hedera/)
- [caip-solana](./packages/solana/)

# Getting Started

## ChainId (CAIP-2)

### Object-oriented

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

### Functional

```typescript
import { ERC155ChainId } from "caip-erc155";

ERC155ChainId.parse("eip155:1");
// { namespace: "eip155", reference: "1" }

// AND

ERC155ChainId.format({ namespace: "eip155", reference: "1" });
// "eip155:1"
```

## AccountId (CAIP-10)

### Object-oriented

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

### Functional

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

### Object-oriented

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

### Functional

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

### Object-oriented

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

### Functional

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

# Adding namespaces

Follow the steps to add new namespaces

- Create a new directory for namespace under the `package directory`.
- To add caip-common, use `pnpm add caip-common`

- For naming the packages, add abbreviated namespace prefix on caip- i.e. caip-eip155 for EVM and caip-hedera for Hedera Hashgraph.
-
- Update the README.md with your namespace

# Third-Party Libraries

### ChainAgnostic/caip-js (MIT License)

This project referenced code from the [ChainAgnostic/caip-js](https://github.com/ChainAgnostic/caip-js/tree/master) repository.

- Repository: [ChainAgnostic/caip-js](https://github.com/ChainAgnostic/caip-js/tree/master)
- License: MIT License
- Owner: ChainAgnostic

# License

This repository is licensed under the MIT License.
