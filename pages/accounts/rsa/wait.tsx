import React, {useEffect, useState} from "react"
import {DeriveDHKey} from "../../../components/crypto/derive";
import {ImportPrivateJWK, ImportPrivateKey, ImportPublicJWK, ImportPublicKey} from "../../../components/crypto/import";
import {str2ab} from "../../../components/crypto/conversion";
import {DecryptDataByAES} from "../../../components/crypto/decrypt";
import {SaveRSA} from "../../../components/indexed/rsa";
import {useRouter} from "next/router";

function stringToUint8Array(str: string){
  let arr = [];
  for (let i = 0, j = str.length; i < j; ++i) {
    arr.push(str.charCodeAt(i));
  }

  let tmpUint8Array = new Uint8Array(arr);
  return tmpUint8Array
}

const WaitHDKey = () => {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [hvxahvName, setHvxahvName] = useState("")

  useEffect(() =>　{
    (async () => {
      const n = localStorage.getItem("hvxahv_name")
      if (n == undefined) {
        return
      }
      setHvxahvName(n)

      const localPrivateJWK = localStorage.getItem("dh_private_jwk")
      if (localPrivateJWK == undefined) {
        return
      }
      const deviceID = localStorage.getItem("hvxahv_device_hash")
      const t = localStorage.getItem("hvxahv_login_token")
      if (t == undefined) {
        return
      }
      setToken(t)

      setInterval(async () => {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        }

        // @ts-ignore
        const res = await fetch(`http://localhost:8088/api/v1/account/rsa/private/${deviceID}`, requestOptions)
        const xxs = await res.json()
        if (xxs.code == 200) {
          const k = await handler(res, localPrivateJWK, xxs.public_jwk, xxs.private_jwk)
          if (k == undefined) {
            return
          }
          const pub = await getPub(xxs.actor_public_key)
          const save = await SaveRSA(n, k, pub)
          console.log(save)
          if (save == undefined) {
            return
          }
          localStorage.removeItem("dh_private_jwk")
          localStorage.removeItem("dh_public_jwk")
          localStorage.removeItem("dh_iv")
          await router.push("/iam")
          await router.reload()
        } else {
          console.log("Padding")
        }

      }, 2000)
    })()
  }, [router, token])

  const getPub = async (pub: string | undefined) => {
    return await ImportPublicKey(pub)
  }
  const handler = async (res: any, localPrivateJWK: string, remotePublicJWK: string, remotePrivateKey: string) => {
    const remotePublicKey = await ImportPublicJWK(JSON.parse(remotePublicJWK))
    const localPrivateKey = await ImportPrivateJWK(JSON.parse(localPrivateJWK))
    const derive = await DeriveDHKey(remotePublicKey, localPrivateKey)
    const string = window.atob(remotePrivateKey)
    const uintArray = str2ab(string)
    const iv = localStorage.getItem("dh_iv")
    if (iv == undefined) {
      return
    }
    const ivs = stringToUint8Array(iv)
    const r = await DecryptDataByAES(derive, uintArray, ivs)
    const b = new TextDecoder().decode(r);
    return await ImportPrivateJWK(JSON.parse(b))
  }


  return (
    <div>
      <h1>Waiting for the returned KEY...</h1>
    </div>
  )
}

export default WaitHDKey