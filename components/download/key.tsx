import React from 'react';

const DownloadPrivateKey = () => {
  const handleKeyDownload = () => {
    const key = localStorage.getItem("vapid_public_key")
    const a = document.createElement('a')
    a.download = "hvxahv_private_key"
    // @ts-ignore
    const blob = new Blob([key], {type: 'text/plain'})
    a.href = window.URL.createObjectURL(blob)
    document.body.appendChild(a)
    a.click()
    a.remove()
  }


  return (
    <>
      <button onClick={() => handleKeyDownload()}>Download PrivateKey</button>
    </>
  )
}
export default DownloadPrivateKey
