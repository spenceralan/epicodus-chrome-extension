$(document).ready(function() {
  $('#attendance-in').click(function(){
    var email = $('#email').val();
    var password = $('#password').val();
    var station = $('#station').val();
    chrome.tabs.create({url: "https://epicenter.epicodus.com/sign_in"}, function(){
      chrome.tabs.executeScript(
        null,
        {code:`
          var email = document.getElementById('email1');
          var password = document.getElementById('password1');
          var station = document.getElementById('station');
          var submit  = document.querySelectorAll('input[type="submit"]')[0];
          email.value = '${email}';
          password.value = '${password}';
          station.value = '${station}';
          submit.click();
        `}
      );
    });
    window.close();
  });
  $('#attendance-out').click(function(){
    var email = $('#email').val();
    var password = $('#password').val();
    chrome.tabs.create({url: "https://epicenter.epicodus.com/sign_out"}, function(){
      chrome.tabs.executeScript(
        null,
        {code:`
          var email = document.getElementById('email');
          var password = document.getElementById('password');
          var submit  = document.querySelectorAll('input[type="submit"]')[0];
          email.value = '${email}';
          password.value = '${password}';
          console.log(submit);
        `}
      );
    });
    window.close();
  });
  $('#epicenter-in').click(function(){
    var email = $('#email').val();
    var password = $('#password').val();
    chrome.tabs.create({url: "https://epicenter.epicodus.com/"}, function(){
      chrome.tabs.executeScript(
        null,
        {code:`
          var email = document.getElementById('user_email');
          var password = document.getElementById('user_password');
          var submit  = document.querySelectorAll('input[type="submit"]')[0];
          email.value = '${email}';
          password.value = '${password}';
          console.log(submit);
        `}
      );
    });
    window.close();
  });
});
