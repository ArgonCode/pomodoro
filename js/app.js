// set time in the future
var timeNow = new Date();
var timerMinutes = 25;
var timerMiliSec = timerMinutes * 60000;

var timerUTC = Date.parse(timeNow) + timerMiliSec;

// count down until that time
function countDown() {
  var timeLeft = timerUTC - Date.parse(new Date());
  var timeLeftMinutes = Math.floor(timeLeft / 60000);
  var timeLeftSeconds = (timeLeft - (timeLeftMinutes * 60000)) / 1000;
  $("#countdown").html(timeLeftMinutes + ":" + timeLeftSeconds);
  // return "" + timeLeftMinutes + ":" + timeLeftSeconds;
}


$(document).ready(function() {
  setInterval(function(){
    countDown();
  },1000);
});
