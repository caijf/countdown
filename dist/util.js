// refs:
//  https://github.com/youzan/vant-weapp/blob/dev/packages/count-down/utils.ts
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD (Register as an anonymous module)
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory();
  } else {
    // Browser globals
    root.countdownUtil = factory();
  }
}(this, function () {
  function padZero(num, targetLength) {
    var str = num + '';
    var len = targetLength || 2;

    while (str.length < len) {
      str = '0' + str;
    }

    return str;
  }

  var SECOND = 1000;
  var MINUTE = 60 * SECOND;
  var HOUR = 60 * MINUTE;
  var DAY = 24 * HOUR;

  function parseTimeData(time) {
    var ret = {};
    
    ret.days = Math.floor(time / DAY),
    ret.hours = Math.floor((time % DAY) / HOUR),
    ret.minutes = Math.floor((time % HOUR) / MINUTE),
    ret.seconds = Math.floor((time % MINUTE) / SECOND),
    ret.milliseconds = Math.floor(time % SECOND);

    return ret;
  }

  function parseFormat(format, timeData) {
    var days = timeData.days,
      hours = timeData.hours,
      minutes = timeData.minutes,
      seconds = timeData.seconds,
      milliseconds = timeData.milliseconds;

    if (format.indexOf('DD') === -1) {
      hours += days * 24;
    } else {
      format = format.replace('DD', padZero(days));
    }

    if (format.indexOf('HH') === -1) {
      minutes += hours * 60;
    } else {
      format = format.replace('HH', padZero(hours));
    }

    if (format.indexOf('mm') === -1) {
      seconds += minutes * 60;
    } else {
      format = format.replace('mm', padZero(minutes));
    }

    if (format.indexOf('ss') === -1) {
      milliseconds += seconds * 1000;
    } else {
      format = format.replace('ss', padZero(seconds));
    }

    return format.replace('SSS', padZero(milliseconds, 3));
  }

  function format(timestamp, formatStr) {
    var timeData = parseTimeData(timestamp);
    return parseFormat(formatStr || "HH:mm:ss", timeData);
  }

  return {
    format: format,
    padZero: padZero,
    parseTimeData: parseTimeData,
    parseFormat: parseFormat
  }
}));
