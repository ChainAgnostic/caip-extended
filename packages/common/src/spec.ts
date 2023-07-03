import { IdentifierSpec } from "./types";

const CAIP2: IdentifierSpec = {
  name: "chainId",
  regex: "[-:a-zA-Z0-9]{5,41}",
  parameters: {
    delimiter: ":",
    values: {
      0: {
        name: "namespace",
        regex: "[-a-z0-9]{3,8}",
      },
      1: {
        name: "reference",
        regex: "[-_a-zA-Z0-9]{1,32}",
      },
    },
  },
};

const CAIP10: IdentifierSpec = {
  name: "accountId",
  regex: "[-:a-zA-Z0-9]{7,106}",
  parameters: {
    delimiter: ":",
    values: {
      0: {
        name: "namespace",
        regex: "[-a-z0-9]{3,8}",
      },
      1: {
        name: "reference",
        regex: "[-_a-zA-Z0-9]{1,32}",
      },
      2: {
        name: "address",
        regex: "[-.%a-zA-Z0-9]{1,128}",
      },
    },
  },
};

// represents namespace:reference in CAIP-19
const AssetName: IdentifierSpec = {
  name: "assetName",
  regex: "[-:a-zA-Z0-9]{5,137}",
  parameters: {
    delimiter: ":",
    values: {
      0: {
        name: "namespace",
        regex: "[-a-z0-9]{3,8}",
      },
      1: {
        name: "reference",
        regex: "[-.%a-zA-Z0-9]{1,128}",
      },
    },
  },
};

const CAIP19AssetType: IdentifierSpec = {
  name: "assetType",
  regex: "[-:a-zA-Z0-9]{11,179}",
  parameters: {
    delimiter: "/",
    values: {
      0: CAIP2,
      1: AssetName,
    },
  },
};

const CAIP19AssetId: IdentifierSpec = {
  name: "assetId",
  regex: "[-:a-zA-Z0-9]{13,258}",
  parameters: {
    delimiter: "/",
    values: {
      0: CAIP2,
      1: AssetName,
      2: {
        name: "tokenId",
        regex: "[-.%a-zA-Z0-9]{1,78}",
      },
    },
  },
};

export const CAIP = {
  "2": CAIP2,
  "10": CAIP10,
  "19": {
    assetName: AssetName,
    assetType: CAIP19AssetType,
    assetId: CAIP19AssetId,
  },
};
