import {str2ab} from "./conversion";

export const ImportPrivateKey = async (privatePem: string | undefined) => {
  if (privatePem == undefined) {
    return
  }
  // fetch the part of the PEM string between header and footer
  const h = "-----BEGIN PRIVATE KEY-----";
  const f = "-----END PRIVATE KEY-----";
  const c = privatePem.substring(h.length, privatePem.length - f.length);

  // base64 decode the string to get the binary data
  const bd = window.atob(c);
  return window.crypto.subtle.importKey(
    "pkcs8",
    str2ab(bd),
    {
      name: "RSA-PSS",
      // Consider using a 4096-bit key for systems that require long-term security
      // @ts-ignore
      modulusLength: 4096,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign"]
  )
}

export const ImportPublicKey = async (publicPem: string | undefined) => {
  if (publicPem == undefined) {
    return
  }
  // fetch the part of the PEM string between header and footer
  const h = "-----BEGIN PUBLIC KEY-----";
  const f = "-----END PUBLIC KEY-----";
  const c = publicPem.substring(h.length, publicPem.length - f.length);

  // base64 decode the string to get the binary data
  const bd = window.atob(c)

  return window.crypto.subtle.importKey(
    "spki",
    // convert from a binary string to an ArrayBuffer
    str2ab(bd),
    {
      name: "RSA-OAEP",
      hash: "SHA-256"
    },
    true,
    ["encrypt"]
  )
}