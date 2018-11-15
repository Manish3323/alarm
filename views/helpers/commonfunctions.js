"use strict";

var formattedTime = function formattedTime(time) {
  var mins = time.getMinutes();
  var secs = time.getSeconds();
  var hrs = time.getHours();
  return appendZero(hrs) + ":" + appendZero(mins) + ":" + appendZero(secs);
};

var appendZero = function appendZero(number) {
  var str = number;

  if (str <= 9) {
    str = "0" + str;
  }

  return str;
};

module.exports = {
  formattedTime: formattedTime,
  appendZero: appendZero
};