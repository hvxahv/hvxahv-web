import type { NextComponentType } from 'next'
import React, {useEffect} from "react";

const Notifications: NextComponentType = () => {
  useEffect(() => {
    if (Notification.permission === `default`) {
      Notification.requestPermission().then(r => {
        navigator.serviceWorker.register('/service-worker.js').then(r => {
          console.log(r)
        })
      })
    }
  }, [])

  // const sendMessage = () => {
  //   const n = new Notification("NOTIFY", {
  //     body: "SEND NOTIFY",
  //     timestamp: new Date().getTime(),
  //   });
  //   n.onclick
  // }
  return (
    <>
      {/*<button onClick={() => sendMessage()}>SEND</button>*/}
    </>
  )
}

export default Notifications