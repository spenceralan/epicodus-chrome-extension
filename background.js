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

let openPopup = function() {
  window.open("popup.html", "extension_popup", "width=400,height=620,status=no,scrollbars=yes,resizable=no");
}

chrome.storage.local.get("lastSent", function(message) {
  let today = new Date().toDateString();
  if (message.lastSent === today) { return; }
  sendNotification(today);
  openPopup();
});
