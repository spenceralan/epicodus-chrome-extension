let clearCookies = function(cookieDomain) {
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
  iconUrl: "/chrome-store-assets/e_small.png",
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

// the functions are `var` because `let` is not accessible when called from popup

var epicenterLogin = function(credentials) {
  clearCookies("epicenter.epicodus.com");
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

var attendanceLogin = function(credentials) {
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
        email1.value = '${credentials.email1}';
        password1.value = '${credentials.password1}';
        email2.value = '${credentials.email2}';
        password2.value = '${credentials.password2}';
        station.value = '${credentials.station}';
        submit.click();
      `}
    );
  });
}

var attendanceLogout = function(credentials) {
  chrome.tabs.create({url: "https://epicenter.epicodus.com/sign_out"}, function(){
    chrome.tabs.executeScript(
      null,
      {code:`
        var email = document.getElementById('email');
        var password = document.getElementById('password');
        var submit  = document.querySelectorAll('input[type="submit"]')[0];
        email.value = '${credentials.email}';
        password.value = '${credentials.password}';
        submit.click();
      `}
    );
  });
}
