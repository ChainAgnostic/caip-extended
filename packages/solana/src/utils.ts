import { IdentifierSpec, splitParams } from "caip-common";

// Define the base58btc pattern
const base58BTCChars =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const base58BTCPattern = new RegExp(`^[${base58BTCChars}]+$`);

export function isValidSolanaId(id: string, spec: IdentifierSpec): boolean {
  const params = splitParams(id, spec);

  if (params[0] !== "solana") {
    return false;
  }

  const reference = params[1];

  // solana reference should only be 32 characters long
  if (reference.length !== 32) {
    return false;
  }

  // Check if the string matches the base58btc pattern
  if (!base58BTCPattern.test(reference)) {
    return false;
  }

  return true;
}
