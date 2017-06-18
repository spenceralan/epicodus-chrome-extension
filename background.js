let options = {
  type: "basic",
  title: "Reminder!",
  message: "Don't forget to sign in!",
  iconUrl: "/chrome-store-assets/store-icon.png"
};

chrome.notifications.create(options);

