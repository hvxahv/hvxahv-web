import type {NextComponentType} from 'next'
import React from "react";

const AvatarUploader: NextComponentType = () => {

  const upload = (e: any) => {
    const myHeaders = new Headers();
    const token = localStorage.getItem("hvxahv_login_token")
    myHeaders.append("Authorization", `Bearer ${token}`);

    const formdata = new FormData();
    formdata.append("avatar", e.target.files[0]);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    }

    // @ts-ignore
    fetch("http://localhost:8088/api/v1/account/avatar", requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log('error', error));
  }
  return (
    <>
      <input type="file" onChange={e => upload(e)}/>
    </>
  )
}

export default AvatarUploader