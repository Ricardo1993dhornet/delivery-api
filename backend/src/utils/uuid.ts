import crypto from "crypto";

export function gerarUUID(): string {
  return crypto.randomUUID();
}
