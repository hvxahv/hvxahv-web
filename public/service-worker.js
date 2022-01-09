self.addEventListener('push', e => {
  const data = e.data.json()
  const title = data.title;

  const options = {
    body: data.body,
    tag: data.tag,
    icon: data.icon,
    timestamp: new Date().getTime(),
  }

  e.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', function(event) {
  console.log(event.notification.tag === "Authorized")
  if (event.notification.tag === "Authorized") {
    event.waitUntil(clients.openWindow("/accounts/rsa/send"))
  }
})