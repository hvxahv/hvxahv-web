// https://datatracker.ietf.org/doc/html/rfc3447
// It takes as its arguments a key to encrypt with,
// some algorithm-specific parameters, and the data to encrypt (also known as "plaintext").
// It returns a Promise which will be fulfilled with the encrypted data (also known as "ciphertext").
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/encrypt
export const EncryptData = async (publicKey: CryptoKey | undefined, data: any) => {
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
  