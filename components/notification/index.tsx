import type {NextComponentType} from 'next'
import React, {useEffect} from "react";

const Notifications: NextComponentType = () => {
  useEffect(() => {
    const subscription = (vapidPublicKey: string) => {
      navigator.serviceWorker.ready
        .then((registration: ServiceWorkerRegistration) => {
          return registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
          })
        })
        .then((subscription: PushSubscription) => {
          console.log(subscription.toJSON())

          const data = new FormData()
          const myHeaders = new Headers();
          // @ts-ignore
          myHeaders.append("Authorization", `Bearer ${localStorage.getItem("hvxahv_login_token")}`);
          const {endpoint, keys: {auth, p256dh}}: any | undefined = subscription.toJSON()
          // @ts-ignore
          data.append("endpoint", endpoint)
          data.append("auth", auth)
          data.append("p256dh", p256dh)

          const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
          };

          fetch("http://localhost:8088/api/v1/notify/sub", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        })
        .catch(err => console.error(err));
    }

    if (Notification.permission === `default`) {
      Notification.requestPermission().then(r => {
        navigator.serviceWorker.register('/service-worker.js').then(r => {
          console.log(r)
        }).then(() => {
          const vapidKey: string | null = localStorage.getItem("hvxahv_device_vapid_publicKey")
          if (vapidKey != null)
          subscription(vapidKey)
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

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData: string = window.atob(base64);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
  }

  return (
    <>
      {/*<button onClick={() => sendMessage()}>SEND</button>*/}
    </>
  )
}

export default Notifications