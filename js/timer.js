(function(){
  var totalSeconds = 30,
      btnstart     = document.getElementById("start"),
      btnpause 	   = document.getElementById("pause"),
      btnrestart   = document.getElementById("restart"),
      clock  	     = document.getElementById("time-nums"),
      totalTime    = document.getElementById("total-time"),
      count,t;

  //个位数字前面补零
  function fillZero(v){
      if( v < 10 ) {
          v = '0' + v;
      }
      return v;
  }

  //显示时间
  function display(element, time){
      var hours 	= fillZero(Math.floor(time/3600));
      var minutes = fillZero(Math.floor(time%3600/60));
      var seconds = fillZero(Math.floor(time%60));
      element.innerHTML = hours+":"+minutes+":"+seconds;
  }

  function countDown(){
      EventUtil.removeEvent(btnstart,"click",countDown);
      display(clock, count);
      if (count !== 0) {
          count--;
          t = setTimeout(countDown,1000);
      } else {
          clearTimeout(t);
          count = totalSeconds;
          EventUtil.addEvent(btnstart,"click",countDown);
      }
  }

  function pause(){
      EventUtil.addEvent(btnstart,"click",countDown);
      clearTimeout(t);
  }

  function restart(){
      EventUtil.addEvent(btnstart,"click",countDown);
      clearTimeout(t);
      count = totalSeconds;
      display(clock, count);
  }

  var EventUtil = {
      addEvent: function(element, type, handler) {
          if (element.addEventListener) {
              element.addEventListener(type, handler, false);
          } else if (element.attachEvent) {
              element.attachEvent('on' + type, function() {
                  handler.call(element);
              });
          } else {
              element['on' + type] = handler;
          }
      },
      removeEvent: function(element, type, handler) {
          if (element.removeEventListener) {
              element.removeEventListener(type, handler, false);
          } else if (element.detachEvent) {
              element.detachEvent('on' + type, handler);
          } else {
              element['on' + type] = null;
          }
      }
  };

  display(totalTime, totalSeconds);
  count = totalSeconds;
  display(clock, count);
  EventUtil.addEvent(btnstart, "click", countDown);
  EventUtil.addEvent(btnpause, "click", pause);
  EventUtil.addEvent(btnrestart, "click", restart);
})();
