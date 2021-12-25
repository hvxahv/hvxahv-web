import React, {useEffect, useState} from "react";

const useGeneratorRSAKey = () => {
    const [publicKey, setPublicKey] = useState("")

    // https://github.com/mdn/dom-examples/tree/master/web-crypto
    /*
     Convert  an ArrayBuffer into a string
     from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
     */

    const ab2str = (buf: ArrayBuffer | Iterable<number>) => {
        if (buf instanceof ArrayBuffer) {
            // @ts-ignore
            return String.fromCharCode.apply(null, new Uint8Array(buf))
        } else {
            throw new Error('Unexpected result');
        }
    }
    /*
        Export the given key and write it into the "exported-key" space.
    */
    const savePrivateKey = (key: CryptoKey | undefined) => {
        if (key) {
            window.crypto.subtle.exportKey(
              "pkcs8",
              key
            ).then(res => {
                const exportedAsString = ab2str(res)
                const exportedAsBase64 = window.btoa(exportedAsString);
                const pk = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
                localStorage.setItem("hvxahv_private_key", pk)
            })
        }
    }

    /*
        Export the given key and write it into the "exported-key" space.
    */
    const exportPublicKey = (key: CryptoKey | undefined) => {

        if (key) {
            window.crypto.subtle.exportKey(
              "spki",
              key
            ).then(res => {
                const exportedAsString = ab2str(res);
                const exportedAsBase64 = window.btoa(exportedAsString);
                const pk = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`
                setPublicKey(pk)
                localStorage.setItem("hvxahv_publicKey", pk)
            })
        }

    }

    useEffect(() => {
        if (localStorage.getItem("hvxahv_private_key") === null || localStorage.getItem("hvxahv_publicKey")) {
            let key = window.crypto.subtle.generateKey(
              {
                  name: "RSA-OAEP",
                  modulusLength: 4096,
                  publicExponent: new Uint8Array([1, 0, 1]),
                  hash: "SHA-256"
              },
              true,
              ["encrypt", "decrypt"],
            ).then((key) => {
                savePrivateKey(key.privateKey)
                exportPublicKey(key.publicKey)
            })
        } else {
            return
        }
    }, [])

    return publicKey
}

export default useGeneratorRSAKey