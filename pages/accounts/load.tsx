import Head from 'next/head'
import React, {useState} from "react";
import GoBack from "../../components/buttons/back";
import {useRouter} from "next/router";
import {ExportPrivateKey, ExportPublicKey} from "../../components/crypto/export";
import {Create, Get} from "../../components/indexed/rsa";
import {ImportPrivateKey, ImportPublicKey} from "../../components/crypto/import";

const Load = () => {
  const router  = useRouter()
  const upload = async (e: any) => {
    const name = localStorage.getItem("hvxahv_name")
    const token = localStorage.getItem("hvxahv_login_token")
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
          const a = await Create(name as string, privateKey, publicKeyResult)
          console.log(a)
        }

      })
      .catch(error => console.log('error', error));
  }

  return (
    <div>
      <Head>
        <title>load</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <GoBack />
        <h3>Load</h3>

        <div>
          <h2>Your Private Key was not found. You must upload your Private Key to continue.</h2>
          <input type="file" onChange={e => upload(e)}/>
          <button onClick={() =>　router.push("/accounts/signin")}>OK! GO TO SIGN IN.</button>
        </div>
      </main>
    </div>
  )
}

export default Load

