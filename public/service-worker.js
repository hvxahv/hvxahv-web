self.addEventListener('push', event => {
  const data = event.data.json()
  const title = data.title;
  const options = {
    body: data.body,
    tag: data.tag,
    icon: data.icon,
    timestamp: new Date().getTime(),
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
