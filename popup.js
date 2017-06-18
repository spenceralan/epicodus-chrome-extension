

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

$(document).ready(function() {
  hideForms('#attendance-out', '#epicenter-in', '#attendance-in');

  $('#attendance-in-button').click(function() {
    showForm('#attendance-out', '#epicenter-in', '#attendance-in');

    $('#attendance-in-form').submit(function(event) {
      event.preventDefault();
      var email1 = $('#email-1').val();
      var password1 = $('#password-1').val();
      var email2 = $('#email-2').val();
      var password2 = $('#password-2').val();
      var station = $('#station').val();

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

      chrome.tabs.create({url: "https://epicenter.epicodus.com/"}, function(){
        chrome.tabs.executeScript(
          null,
          {code:`
            let email = document.getElementById('user_email');
            let password = document.getElementById('user_password');
            let submit  = document.querySelectorAll('input[type="submit"]')[0];
            email.value = '${email}';
            password.value = '${password}';
            submit.click();
          `}
        );
      });
      window.close();
    });
  });

  $('#queue-button').click(function(){
    chrome.tabs.create({url: "https://epicodus-help.firebaseapp.com/"});
    window.close();
  });

});