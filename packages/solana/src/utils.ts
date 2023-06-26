import { IdentifierSpec, splitParams } from "caip-common";

export const base58Characters =
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export function isValidSolanaId(id: string, spec: IdentifierSpec): boolean {
  const params = splitParams(id, spec);

  if (params[0] !== "solana") {
    return false;
  }

  // TODO check for reference too
  return true;
}
