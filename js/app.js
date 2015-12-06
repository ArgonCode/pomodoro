/*
1. Get timer to display and run down
2. Stop timer on click. Reset. In a true fasion of Pomodoro, break cancels it all.
3.

1. get now moment.time
2. add desired timer
3. display moments. untill the time in the future, on repeat



*/

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

  return "" + timeLeftMinutes + ":" + timeLeftSeconds;
}
