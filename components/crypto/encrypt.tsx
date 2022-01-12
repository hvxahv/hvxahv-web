import { encrypt, createMessage, readMessage, readKey } from 'openpgp';
import { getRSA } from '../indexed/rsa';

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
  const k = await getRSA(name)
  if (k == undefined) {
    return
  }
  const publicKeyArmored = await readKey({ armoredKey: k.public_key })

  const encrypted = await encrypt({
    message: await createMessage({binary: files}), // input as Message object
    format: 'binary',
    encryptionKeys: publicKeyArmored,
  })

  return await readMessage({
    binaryMessage: encrypted
  })
}
