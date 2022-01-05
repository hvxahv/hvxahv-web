import Head from 'next/head'
import React, {useEffect, useState} from "react";
import GoBack from "../../../components/buttons/back";
import { useRouter } from "next/router";
import {isHaveRSA, SaveRSA} from "../../../components/indexed/rsa";
import { ImportPrivateKey, ImportPublicKey } from "../../../components/crypto/import";
import {GetDevices} from "../../../components/devices/fetch";

const Upload = () => {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [hvxahvName, setHvxahvName] = useState("")
  const [deviceHash, setDeviceHash] = useState("")
  const [devices, setDevices] = useState<any[]>([])
  const upload = async (e: any) => {
    const myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("http://localhost:8088/api/v1/accounts/rsa/public", requestOptions)
      .then(res => res.json())
      .then(res => {
        const reader = new FileReader()
        reader.readAsText(e.target.files[0], "UTF-8")
        reader.onload = async (e) => {
          if (e.target == null) {
            return
          }
          const privateKey = await ImportPrivateKey(e.target.result as string)
          const publicKeyResult = await ImportPublicKey(res.public_key)
          const a = await SaveRSA(hvxahvName, privateKey, publicKeyResult)
          if (a != undefined) {
            router.reload()
          }
        }

      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    const n = localStorage.getItem("hvxahv_name")
    if (n == undefined) {
      return
    }
    setHvxahvName(n)
    isHaveRSA(n).then(r => {
      if (r) router.push("/iam")
    })
    
    const t = localStorage.getItem("hvxahv_login_token")
    if (t == undefined) {
      return
    }
    setToken(t)

    const d = localStorage.getItem("hvxahv_device_hash")
    if (d == undefined) {
      return
    }
    setDeviceHash(d)
    GetDevices(t).then(r => {
      setDevices(r.devices)
    })
  }, [router])

  const handleRequestPrivate = (id: any) =>　{
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // @ts-ignore
    fetch(`http://localhost:8088/api/v1/accounts/rsa/private?device_id=${id}`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log('error', error));
  }
  return (
    <div>
      <Head>
        <title>RSA Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GoBack />
        <h3>Import Private Key</h3>
        <div>
          <h2>Request a private key from the currently logged-in device</h2>
          <div>
            {devices && devices.map((i, idx) => {
              return (
                  <div key={idx}>
                    <p>{idx +1}: {i.Device}</p>
                    <code>{i.Hash}</code>
                    {i.Hash == deviceHash
                      ?
                    <p style={{ color: `blue` }}>Current Device</p>
                      :
                    <button onClick={() => handleRequestPrivate(i.ID)}>Request</button>
                    }
                    <hr/>
                  </div>
                )
            })}
          </div>
        </div>
        <div>
          <h2>Your Private Key was not found. You must upload your Private Key to continue.</h2>
          <input type="file" onChange={e => upload(e)} />
          <button onClick={() => router.push("/accounts/signin")}>OK! GO TO SIGN IN.</button>
        </div>
      </main>
    </div>
  )
}

export default Upload

