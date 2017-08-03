const SEATTLE_IP_ADDRESS = "38.140.27.106"

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

let hideLogo = function() {
  $('#logo').slideUp();
}

let setFocusTo = function(elementID) {
  document.getElementById(elementID).focus();
}

$(document).ready(function() {
  hideForms('#attendance-out', '#epicenter-in', '#attendance-in');

  $('#attendance-in-button').click(function() {
    hideForms('#attendance-out', '#epicenter-in');
    hideLogo();
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
    hideLogo();
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

    navigator.geolocation.getCurrentPosition(function(position) {
      $.get('http://api.timezonedb.com/v2/get-time-zone', {
        // API calls are unlimited, but can only be made once per second
        key: 'FYM6S0W0YKCQ',
        format: 'json',
        by: 'position',
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }, function(data) {
        const TIMECONVERSION = 1000
        let gmtTime = data.timestamp
        let gmtOffset = data.gmtOffset
        let currentTime = gmtTime - gmtOffset
        let date = new Date((currentTime) * TIMECONVERSION )
        let hours = Number(date.getHours());
        let minutes = Number(date.getMinutes());
        let formattedTime = date.toLocaleTimeString();
        if ( hours <= 16 && minutes < 45 ) {
          $('#warning').html(`<p class="alert alert-danger text-center">You'll be leaving early if you sign out now since the time is ${formattedTime}</p>`);
        } else {
          $('#warning').html('');
        };
      });
    });
  });

  $('#epicenter-in-button').click(function(){
    hideForms('#attendance-in', '#attendance-out');
    hideLogo();
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
    $.get('https://api.ipify.org', function(ip) {
      if(ip == SEATTLE_IP_ADDRESS) {
        chrome.tabs.create({url: "https://epicodus-seattle-help.firebaseapp.com/"});
        window.close();
      } else {
        chrome.tabs.create({url: "https://epicodus-help.firebaseapp.com/"});
        window.close();
      }
    });
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
