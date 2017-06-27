let background = chrome.extension.getBackgroundPage();

let hideForms = function(...forms) {
  forms.forEach(function(form) {
    $(form).hide();
  });
}

let showForms = function(...forms) {
  forms.forEach(function(form) {
    $(form).slideDown();
  });
}

let setFocusTo = function(elementID) {
  document.getElementById(elementID).focus();
}

$(document).ready(function() {
  hideForms('#attendance-out', '#epicenter-in', '#attendance-in');

  $('#attendance-in-button').click(function() {
    hideForms('#attendance-out', '#epicenter-in');
    showForms('#attendance-in');
    setFocusTo("email-1");

    $('#attendance-in-form').submit(function(event) {
      event.preventDefault();
      let credentials = {
        email1: $('#email-1').val(),
        password1: $('#password-1').val(),
        email2: $('#email-2').val(),
        password2: $('#password-2').val(),
        station: $('#station').val(),
      }
      background.attendanceLogin(credentials);
      window.close();
    });

  });

  $('#attendance-out-button').click(function(){
    hideForms('#epicenter-in', '#attendance-in');
    showForms('#attendance-out');
    setFocusTo("attendance-out-email");

    $('#attendance-out-form').submit(function(event) {
      event.preventDefault();
      let credentials = {
        email: $('#attendance-out-email').val(),
        password: $('#attendance-out-password').val(),
      }
      background.attendanceLogout(credentials);
      window.close();
    });
  });

  $('#epicenter-in-button').click(function(){
    hideForms('#attendance-in', '#attendance-out');
    showForms('#epicenter-in');
    setFocusTo("epicenter-in-email")

    $('#epicenter-in-form').submit(function(event) {
      event.preventDefault();
      let credentials = {
        username: $('#epicenter-in-email').val(),
        password: $('#epicenter-in-password').val(),
      };
      background.epicenterLogin(credentials);
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
