import {
  AccountIdSplitParams,
  AssetIdParams,
  AssetNameParams,
  AssetTypeParams,
  CAIP,
  ChainIdParams,
  getParams,
} from "caip-common";
import createKeccakHash from "keccak";

const eip155ChainIdRegex = new RegExp(`^\\d{1,32}$`);

const eip155TokenIdRegex = new RegExp(`[-.%a-zA-Z0-9]{1,78}`);

export function isValidEIP155ChainId(id: string): boolean {
  const { namespace, reference } = getParams<ChainIdParams>(id, CAIP["2"]);

  if (!isValidEIP155ChainIdNamespaceAndReference(namespace, reference)) {
    return false;
  }

  return true;
}

export function isValidEIP155AccountId(id: string): boolean {
  const { namespace, reference, address } = getParams<AccountIdSplitParams>(
    id,
    CAIP["10"]
  );

  if (!isValidEIP155ChainIdNamespaceAndReference(namespace, reference)) {
    return false;
  }

  if (!isValidEIP155ChecksumAddress(address)) {
    return false;
  }
  return true;
}

export function isValidEIP155AssetName(id: string): boolean {
  const { namespace, reference } = getParams<AssetNameParams>(
    id,
    CAIP["19"].assetName
  );

  if (!isValidEIP155AssetNamespaceAndReference(namespace, reference)) {
    return false;
  }
  return true;
}

export function isValidEIP155AssetType(id: string): boolean {
  const { chainId, assetName } = getParams<AssetTypeParams>(
    id,
    CAIP["19"].assetType
  );

  const chainIdString = chainId.toString();

  if (!isValidEIP155ChainId(chainIdString)) {
    return false;
  }

  const assetNameString = assetName.toString();

  if (!isValidEIP155AssetName(assetNameString)) {
    return false;
  }

  return true;
}

export function isValidEIP155AssetId(id: string): boolean {
  const { chainId, assetName } = getParams<AssetIdParams>(
    id,
    CAIP["19"].assetId
  );

  const { namespace } = getParams<AssetNameParams>(
    assetName.toString(),
    CAIP["19"].assetName
  );

  // only nft namespace has a tokenId
  if (namespace !== "erc721") {
    return false;
  }

  const chainIdString = chainId.toString();

  if (!isValidEIP155ChainId(chainIdString)) {
    return false;
  }

  const assetNameString = assetName.toString();

  if (!isValidEIP155AssetName(assetNameString)) {
    return false;
  }

  return true;
}

export function isValidEIP155AssetNamespaceAndReference(
  namespace: string,
  reference: string
): boolean {
  if (namespace !== "erc20" && namespace !== "erc721") {
    return false;
  }
  if (!isValidEIP155ChecksumAddress(reference)) {
    return false;
  }

  return true;
}

export function isValidEIP155ChainIdNamespaceAndReference(
  namespace: string,
  reference: string
): boolean {
  if (namespace !== "eip155") {
    return false;
  }

  if (!eip155ChainIdRegex.test(reference)) {
    return false;
  }

  return true;
}

export const isValidAddress = (address: string) =>
  new RegExp("^0x[a-fA-F0-9]{40}$", "i").test(address);

// Referenced from https://eips.ethereum.org/EIPS/eip-55
export const toChecksumAddress = (address: string) => {
  address = address.toLowerCase().replace("0x", "");
  var hash = createKeccakHash("keccak256").update(address).digest("hex");
  var ret = "0x";

  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }

  return ret;
};

export function isValidEIP155TokenId(tokenId: string): boolean {
  if (!eip155TokenIdRegex.test(tokenId)) {
    return false;
  }

  return true;
}

export function isValidEIP155ChecksumAddress(address: string): boolean {
  if (!isValidAddress(address)) {
    return false;
  }
  return address === toChecksumAddress(address);
}
