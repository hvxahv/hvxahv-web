import React from "react";

export const GetDevices = async (token: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }
  // @ts-ignore
  const res = await fetch("http://localhost:8088/api/v1/accounts/devices", requestOptions).then(res => {
    return res.json()
  })

  console.log(res)
  return res
}
