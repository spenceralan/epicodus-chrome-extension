let options = {
  type: "basic",
  title: "Sign in reminder",
  message: "Don't forget to sign in!",
  iconUrl: "icon.png"
};

chrome.notifications.create(options);

