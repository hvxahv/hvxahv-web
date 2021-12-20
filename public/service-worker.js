self.addEventListener('push', event => {
  const title = 'Subscription';
  const options = {
    body: "You have successfully subscribed to the notification!",
    timestamp: new Date().getTime(),
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
