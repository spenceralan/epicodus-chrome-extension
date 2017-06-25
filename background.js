var clearCookies = function(cookieDomain) {
  chrome.cookies.getAll({domain: cookieDomain}, function(cookies) {
    for(var i=0; i<cookies.length;i++) {
      let urlPath = `http://${cookieDomain}/${cookies[i].path}`;
      chrome.cookies.remove({url: urlPath, name: cookies[i].name});
    }
  });
}

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
  chrome.storage.local.clear();
  let today = new Date().toDateString();
  if (message.lastSent === today) { return; }
  sendNotification(today);
  openPopup();
});

var epicenterLogin = function(credentials) {
  chrome.tabs.create({url: "https://epicenter.epicodus.com/"}, function(){
    chrome.tabs.executeScript(
      null,
      {code:`
        let email = document.getElementById('user_email');
        let password = document.getElementById('user_password');
        let submit  = document.querySelectorAll('input[type="submit"]')[0];
        email.value = '${credentials.username}';
        password.value = '${credentials.password}';
        submit.click();
      `}
    );
  });
}

let attendanceLogin = function(credentials) {
  chrome.tabs.create({url: "https://epicenter.epicodus.com/sign_in"}, function(){
    chrome.tabs.executeScript(
      null,
      {code:`
        var email1 = document.getElementById('email1');
        var password1 = document.getElementById('password1');
        var email2 = document.getElementById('email2');
        var password2 = document.getElementById('password2');
        var station = document.getElementById('station');
        var submit  = document.querySelectorAll('input[type="submit"]')[0];
        email1.value = '${email1}';
        password1.value = '${password1}';
        email2.value = '${email2}';
        password2.value = '${password2}';
        station.value = '${station}';
        submit.click();
      `}
    );
  });
}
