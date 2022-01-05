import React, {useEffect, useState} from "react";
import {GetDevices} from "./fetch";
import {useRouter} from "next/router";

const DeleteDevice = () => {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [devices, setDevices] = useState<any[]>([])
  const [deviceHash, setDeviceHash] = useState("")

  useEffect(() => {
    const t = localStorage.getItem("hvxahv_login_token")
    if (t == undefined) {
      return
    }
    const d = localStorage.getItem("hvxahv_device_hash")
    if (d == undefined) {
      return
    }
    setDeviceHash(d)
    setToken(t)
    GetDevices(t).then(r => {
      setDevices(r.devices)
    })

  }, [])

  const handleDeleteDevice = (hash: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append("device_hash", hash);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    // @ts-ignore
    fetch("http://localhost:8088/api/v1/accounts/devices/delete", requestOptions)
      .then(res => res.json())
      .then(res => {
        router.reload()
        console.log(res)
      })
      .catch(error => console.log('error', error));
  }

  return (
    <>
      {devices && devices.map((i, idx) => {
        return (
          <div key={idx}>
            <p>{idx +1}: {i.Device}</p>
            <code>{i.Hash}</code>
            {i.Hash == deviceHash
              ?
              <p style={{ color: `blue` }}>Current Device</p>
              :
              <button onClick={() => handleDeleteDevice(i.Hash)}>Delete</button>
            }
            <hr/>
          </div>
        )
      })}
    </>
  )
}

export default DeleteDevice