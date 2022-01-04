import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { EncryptData } from "../../components/crypto/encrypt";
import { GetRSA } from "../../components/indexed/rsa";
import { create, Options } from 'ipfs-http-client';
import { DecryptData, TextEncoding } from "../../components/crypto/decrypt";
import { ab2str, str2ab } from "../../components/crypto/conversion";
import { useRouter } from "next/router";

const Saved: NextPage = () => {
  const [hash, setHash] = useState("")
  const [savedID, setSavedID] = useState("")
  const handleInputSavedID = (e: any) => {
    setSavedID(e.target.value)
  }

  const router = useRouter()
  const [token, setToken] = useState("")
  const ipfsAPI = "http://127.0.0.1:5001"
  useEffect(() => {
    const token = localStorage.getItem("hvxahv_login_token")
    if (token == undefined) {
      router.push("/accounts/sign_up")
      return
    }
    setToken(token)
  }, [router])

  // The file is uploaded to IPFS and the returned hash is encrypted and submitted to the hvxahv server.
  // The encrypted hash obtained from hvxahv is decrypted by the local rsa private key and displayed to the client.

  const upload = async (e: any) => {
    const name = e.target.files[0].name
    const type = e.target.files[0].type
    const client = create(ipfsAPI as Options)
    const { path } = await client.add(e.target.files[0])
    console.log(path)
    const hash = await encrypt(path)
    console.log(name, type, hash)
    post(name, type, hash)

  }

  const encrypt = async (hash: string) => {
    const account = await GetRSA("hvturingga")
    const res = await EncryptData(account.publicKey, TextEncoding(hash))
    const x = ab2str(res)
    return window.btoa(x)
  }

  const post = (name: string, type: string, hash: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append("hash", hash);
    formdata.append("type", type);
    formdata.append("name", name);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    // @ts-ignore
    fetch("http://localhost:8088/api/v1/saved", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const handleGet = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // @ts-ignore
    fetch(`http://localhost:8088/api/v1/saved/${savedID}`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        console.log(res.message.Name)
        console.log(res.message.FileType)
        console.log(res.message.Hash)
        decrypt(res.message.Hash).then(r => {
          const h = ab2str(r)

          setHash(h)

        })
      })
      .catch(error => console.log('error', error));
  }

  const decrypt = async (hash: string) => {
    const account = await GetRSA("hvturingga")
    const b = window.atob(hash)
    const ab = str2ab(b)
    return await DecryptData(account.privateKey, ab)
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Saved</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <input type="file" onChange={e => upload(e)} />
        </div>
        <div>
          <h2>Get content by hash</h2>
          <input type="text" name="hash" onChange={e => handleInputSavedID(e)} />
          <button onClick={() => handleGet()}>Get</button>
        </div>
        <div>
          {hash && <div>
            <code>{hash}</code>
            <div>
              Preview: →
              <a href={`http://localhost:8081/ipfs/${hash}`}
                target={`_blank`}
                style={{ color: `blue` }}
              >
                GO...
              </a>
              ←
            </div>
          </div>}
        </div>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}

export default Saved
