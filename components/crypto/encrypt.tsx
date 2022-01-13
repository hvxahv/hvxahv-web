import {encrypt, createMessage, readMessage, readKey, readPrivateKey, decrypt, generateKey} from 'openpgp';
import { getRSA } from '../indexed/rsa';
import {generateRSA} from "./generate";

// https://datatracker.ietf.org/doc/html/rfc3447
// It takes as its arguments a key to encrypt with,
// some algorithm-specific parameters, and the data to encrypt (also known as "plaintext").
// It returns a Promise which will be fulfilled with the encrypted data (also known as "ciphertext").
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
export const EncryptData = async (publicKey: CryptoKey | undefined, data: ArrayBuffer) => {
  if (publicKey == undefined) {
    return
  }
  return await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP"
    },
    publicKey,
    data
  )
}

export const EncryptDataByAES = async (key: CryptoKey | undefined, data: BufferSource, iv: Uint8Array) => {
  if (key == undefined) {
    return
  }
  return await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    data
  )
}

export const encryptFile = async (name: string, files: Uint8Array) => {
  const key = await getRSA(name)
  if (key == undefined) {
    return
  }

  const publicKey = await readKey({ armoredKey: key.public_key });

  return encrypt({
    message: await createMessage({ binary: files }),
    encryptionKeys: publicKey,
    format: 'binary',
  })
}
