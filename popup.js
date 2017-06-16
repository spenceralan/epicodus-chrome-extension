
$(document).ready(function() {

  $('#attendance-in').click(function() {
    $('form').slideUp(function() {
      $('form').hide();
      $('#attendance-in-form').slideDown();
    });
  });

  $('#attendance-out').click(function(){
    $('form').slideUp(function() {
      $('#attendance-out-form').slideDown();
    });
  });

  $('#epicenter-in').click(function(){
    $('form').slideUp(function() {
      $('#epicenter-in-form').slideDown();
    });
  });
});
//   $('#attendance-in').click(function(){
//     var email1 = $('#email-1').val();
//     var password1 = $('#password-1').val();
//     var email2 = $('#email-2').val();
//     var password2 = $('#password-2').val();
//     var station = $('#station').val();
//     chrome.tabs.create({url: "https://epicenter.epicodus.com/sign_in"}, function(){
//       chrome.tabs.executeScript(
//         null,
//         {code:`
//           var email1 = document.getElementById('email1');
//           var password1 = document.getElementById('password1');
//           var email2 = document.getElementById('email2');
//           var password2 = document.getElementById('password2');
//           var station = document.getElementById('station');
//           var submit  = document.querySelectorAll('input[type="submit"]')[0];
//           email1.value = '${email1}';
//           password1.value = '${password1}';
//           email2.value = '${email2}';
//           password2.value = '${password2}';
//           station.value = '${station}';
//           submit.click();
//         `}
//       );
//     });
//     window.close();
//   });
//   $('#attendance-out').click(function(){
//     var email = $('#email-1').val();
//     var password = $('#password-1').val();
//     chrome.tabs.create({url: "https://epicenter.epicodus.com/sign_out"}, function(){
//       chrome.tabs.executeScript(
//         null,
//         {code:`
//           var email = document.getElementById('email');
//           var password = document.getElementById('password');
//           var submit  = document.querySelectorAll('input[type="submit"]')[0];
//           email.value = '${email}';
//           password.value = '${password}';
//           submit.click();
//         `}
//       );
//     });
//     window.close();
//   });
//   $('#epicenter-in').click(function(){
//     var email = $('#email-1').val();
//     var password = $('#password-1').val();
//     chrome.tabs.create({url: "https://epicenter.epicodus.com/"}, function(){
//       chrome.tabs.executeScript(
//         null,
//         {code:`
//           var email = document.getElementById('user_email');
//           var password = document.getElementById('user_password');
//           var submit  = document.querySelectorAll('input[type="submit"]')[0];
//           email.value = '${email}';
//           password.value = '${password}';
//           submit.click();
//         `}
//       );
//     });
//     window.close();
//   });
// });
