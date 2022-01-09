import {ab2str} from "./conversion";

// You can use this format to import or export RSA or Elliptic Curve public keys.
// https://datatracker.ietf.org/doc/html/rfc5280#section-4.1
// https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One

export const ExportPublicKey = async (publicKey: CryptoKey | undefined) => {
  if (publicKey == undefined) {
    return
  }

  const k = await window.crypto.subtle.exportKey(
    "spki",
    publicKey
  )
  const b64 = window.btoa(ab2str(k));
  return `-----BEGIN PUBLIC KEY-----\n${b64}\n-----END PUBLIC KEY-----`;
}

// You can use this format to import or export RSA or Elliptic Curve private keys.
// https://datatracker.ietf.org/doc/html/rfc5208
// https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One

export const ExportPrivateKey = async (privateKey: CryptoKey | undefined) => {
  if (privateKey == undefined) {
    return
  }

  const k = await window.crypto.subtle.exportKey(
    "pkcs8",
    privateKey as CryptoKey
  )

  const b64 = window.btoa(ab2str(k))
  return `-----BEGIN PRIVATE KEY-----\n${b64}\n-----END PRIVATE KEY-----`
}

export const ExportPrivateJWK = async (privateKey: CryptoKey | undefined) => {
  if (privateKey == undefined) {
    return
  }
  return await window.crypto.subtle.exportKey(
    "jwk",
    privateKey as CryptoKey
  )
}

export const ExportPublicJWK = async (publicKey: CryptoKey | undefined) => {
  if (publicKey == undefined) {
    return
  }
  return await window.crypto.subtle.exportKey(
    "jwk",
    publicKey as CryptoKey,
  )
}