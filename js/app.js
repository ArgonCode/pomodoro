// set time in the future
var timeNow = new Date();
var state = false;

// make setIntervals global and accesible
var workTime, breakTime;

// count down until that time
function countDown(minutes) {
  var timerMinutes = minutes;
  var timerMiliSec = timerMinutes * 60000;
  var timerUTC = Date.parse(timeNow) + timerMiliSec;

  var timeLeft = (timerUTC - Date.parse(new Date())) / 1000;
  var timeLeftMinutes = Math.floor(timeLeft / 60);
  var timeLeftSeconds = timeLeft - (timeLeftMinutes * 60);
  return {
    "left": timeLeft, // in seconds
    "minutes": timeLeftMinutes,
    "seconds": timeLeftSeconds
  };
}

function runPomodoro(idWork, workMinutes){
  var displayWorkTimer = document.getElementById(idWork);

  workTimer = setInterval(function() {
    var time = countDown(workMinutes);
    displayWorkTimer.innerHTML = 'minutes: ' + time.minutes + '<br>' +
                                 'seconds: ' + time.seconds;
    if(time.left <= 0){
      clearInterval(workTimer);
    }
  },1000);
}


function runBreak(idBreak, breakMinutes){
  var displayBreakTimer = document.getElementById(idBreak);

  breakTimer = setInterval(function() {
    var time = countDown(1 + breakMinutes);
    displayBreakTimer.innerHTML = 'minutes: ' + time.minutes + '<br>' +
                                  'seconds: ' + time.seconds;
    if(time.left <= 0){
      clearInterval(breakTimer);
    }
  },1000);
}

// document.getElementById('run').onclick = function(){
//   runPomodoro("work", 1);
// };

document.getElementById('run').addEventListener("click",function(){
  if(state === false){
    runPomodoro("work", 1);
    state = true;
  } else {
    clearInterval(workTimer);
    state = false;
  }
});
