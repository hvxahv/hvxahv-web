import { readPrivateKey, decrypt, readMessage } from 'openpgp';
import { getRSA } from '../indexed/rsa';

// https://datatracker.ietf.org/doc/html/rfc3447
// The decrypt() method of the SubtleCrypto interface decrypts some encrypted data.
// It takes as arguments a key to decrypt with, some optional extra parameters,
// and the data to decrypt (also known as "ciphertext").
// It returns a Promise which will be fulfilled with the decrypted data (also known as "plaintext").
// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/decrypt
export const DecryptData = async (privateKey: CryptoKey | undefined, buffer: ArrayBuffer) => {
  if (privateKey == undefined) {
    return
  }
  return await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    privateKey,
    buffer
  );
}
export const TextEncoding = (text: string) => {
  const enc = new TextEncoder();
  return enc.encode(text);
}


export const DecryptDataByAES = async (key: CryptoKey | undefined, data: BufferSource, iv: Uint8Array) => {
  if (key == undefined) {
    return
  }

  return await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    data
  )
}

export const decryptFile = async (name: string, fileName: string, fileType: string, encrypted: any) => {
  const k = await getRSA(name)
  if (k == undefined) {
    return
  }
  const privateKeyArmored = await readPrivateKey({ armoredKey: k.private_key })

  const message = await readMessage({
    armoredMessage: encrypted // parse armored message
  });

  const { data: decrypted } = await decrypt({
    message,
    config: {
      allowInsecureDecryptionWithSigningKeys: true,
    },
    format: "binary",
    decryptionKeys: privateKeyArmored
  })
  console.log(decrypted)

  const a = document.createElement('a')
  a.download = fileName
  // @ts-ignore
  const blob = new Blob([decrypted], {type: fileType})
  a.href = window.URL.createObjectURL(blob)
  document.body.appendChild(a)
  a.click()
  a.remove()
}