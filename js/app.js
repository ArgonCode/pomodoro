// running or not ?
var state = false;
var breakT;

// make setInterval global
var timer;

// count down until that time
function countDown(minutes, startTime) {
  var timerMinutes = minutes;
  var timerMiliSec = timerMinutes * 60000;
  var timerUTC = Date.parse(startTime) + timerMiliSec;

  var timeLeft = (timerUTC - Date.parse(new Date())) / 1000;
  var timeLeftMinutes = Math.floor(timeLeft / 60);
  var timeLeftSeconds = timeLeft - (timeLeftMinutes * 60);
  return {
    "left": timeLeft, // in seconds
    "minutes": timeLeftMinutes,
    "seconds": timeLeftSeconds
  };
}

function run(id, minutes){
  var startTime = new Date();
  var displayTimer = document.getElementById(id);

  timer = setInterval(function() {
    var time = countDown(minutes, startTime);
    displayTimer.innerHTML = 'minutes: ' + time.minutes + '<br>' +
                             'seconds: ' + time.seconds;
    if(time.left <= 0){
      clearInterval(timer);
      if(id === "work") {
        displayTimer.innerHTML = 'minutes: ' + minutes + '<br>' +
                                 'seconds: 00';
        run("break", breakT);
      } else {
        displayTimer.innerHTML = 'minutes: ' + breakT + '<br>' +
                                 'seconds: 00';
        run("work", minutes);
      }
    }
  },1000);
}



document.getElementById('run').addEventListener("click",function(){
  var pomodoroT = 1;
  breakT = 1;

  document.getElementById("work").innerHTML = 'minutes: ' + pomodoroT + '<br>' + 'seconds: 00';
  document.getElementById("break").innerHTML = 'minutes: ' + breakT + '<br>' + 'seconds: 00';


  if(state === false){
    state = true;
    run("work", pomodoroT);
  } else {
    state = false;
    clearInterval(timer);
    document.getElementById("work").innerHTML = 'minutes: ' + pomodoroT + '<br>' + 'seconds: 00';
    document.getElementById("break").innerHTML = 'minutes: ' + breakT + '<br>' + 'seconds: 00';
  }
});
