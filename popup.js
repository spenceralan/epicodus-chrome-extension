var port = chrome.extension.connect({
  name: "Sample Communication"
});

let hideForms = function(...forms) {
  forms.forEach(function(form) {
    $(form).hide();
  });
}

let showForm = function(hide1, hide2, show) {
  $(hide1).hide();
  $(hide2).hide();
  $(show).slideDown();
}

let clearCookies = function(cookieDomain) {
  alert("feadfa");
  chrome.cookies.getAll({domain: cookieDomain}, function(cookies) {
    for(var i=0; i<cookies.length;i++) {
      let urlPath = `http://${cookieDomain}/${cookies[i].path}`;
      chrome.cookies.remove({url: urlPath, name: cookies[i].name});
    }
  });
}

$(document).ready(function() {
  hideForms('#attendance-out', '#epicenter-in', '#attendance-in');

  $('#attendance-in-button').click(function() {
    showForm('#attendance-out', '#epicenter-in', '#attendance-in');

    $('#attendance-in-form').submit(function(event) {
      event.preventDefault();
      let loginCredentials = {
        type: "attendance login",
        email1: $('#email-1').val(),
        password1: $('#password-1').val(),
        email2: $('#email-2').val(),
        password2: $('#password-2').val(),
        station: $('#station').val()
      }
      port.postMessage(loginCredentials);
      window.close();
    });

  });

  $('#attendance-out-button').click(function(){
    showForm('#epicenter-in', '#attendance-in', '#attendance-out');

    $('#attendance-out-form').submit(function(event) {
      event.preventDefault();
      var email = $('#attendance-out-email').val();
      var password = $('#attendance-out-password').val();

      chrome.tabs.create({url: "https://epicenter.epicodus.com/sign_out"}, function(){
        chrome.tabs.executeScript(
          null,
          {code:`
            var email = document.getElementById('email');
            var password = document.getElementById('password');
            var submit  = document.querySelectorAll('input[type="submit"]')[0];
            email.value = '${email}';
            password.value = '${password}';
            submit.click();
          `}
        );
      });
      window.close();
    });
  });

  $('#epicenter-in-button').click(function(){
    showForm('#attendance-in', '#attendance-out', '#epicenter-in');

    $('#epicenter-in-form').submit(function(event) {
      event.preventDefault();
      let email = $('#epicenter-in-email').val();
      let password = $('#epicenter-in-password').val();
      let loginCredentials = {
        type: "epicenter login",
        username: email,
        password: password
      };
      port.postMessage(loginCredentials);
      window.close();
    });
  });

  $('#queue-button').click(function(){
    chrome.tabs.create({url: "https://epicodus-help.firebaseapp.com/"});
    window.close();
  });

  $('#learn-how-to-program-button').click(function(){
    chrome.tabs.create({url: "https://www.learnhowtoprogram.com/courses"});
    window.close();
  });

  $('#epicodus-forum-button').click(function(){
    chrome.tabs.create({url: "http://forum.epicodus.com/login"});
    window.close();
  });

});
