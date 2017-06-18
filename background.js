const localStorage = chrome.storage.local

const messageValues = {
  type: "basic",
  title: "Reminder!",
  message: "Don't forget to sign in!",
  iconUrl: "/chrome-store-assets/store-icon.png",
};

let sendNotification = function(today) {
  chrome.notifications.create(messageValues);
  localStorage.set({"lastSent": today});
}

localStorage.get("lastSent", function(message) {
  let today = new Date().toDateString();
  if (message.lastSent === today) { return; }
  sendNotification(today);
});
