const messageValues = {
  type: "basic",
  title: "Reminder!",
  message: "Don't forget to sign in!",
  iconUrl: "/chrome-store-assets/store-icon.png",
};

let sendNotification = function(today) {
  chrome.notifications.create(messageValues);
  chrome.storage.local.set({"lastSent": today});
}

chrome.storage.local.get("lastSent", function(message) {
  let today = new Date().toDateString();
  if (message.lastSent === today) { return; }
  sendNotification(today);
  chrome.storage.local.clear();
});
