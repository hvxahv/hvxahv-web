self.addEventListener('push', event => {
  console.log(event.data)
  const data = event.data.json()
  console.log(data)
  const title = data.title;
  const options = {
    body: data.body,
    tag: data.tag,
    icon: data.icon,
    timestamp: new Date().getTime(),
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
