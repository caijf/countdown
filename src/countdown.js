(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD (Register as an anonymous module)
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    module.exports = factory();
  } else {
    // Browser globals
    root.CountDown = factory();
  }
}(this, function () {
  var noop = function () { };
  var isFunction = function (fn) {
    return typeof fn === 'function';
  }

  function CountDown(options) {
    this._init(typeof options !== 'object' ? {} : options);
  }

  CountDown.prototype._init = function (options) {
    this.counting = false;
    this.conpleted = false;
    this.timer = null;

    this.options = {
      time: 0,
      interval: 1000,
      format: null,
      onChange: noop,
      onEnd: noop
    };

    for (var prop in options) {
      if (options.hasOwnProperty(prop)) {
        this.options[prop] = options[prop];
      }
    }

    this._initTime();
  }

  CountDown.prototype._initTime = function () {
    this.time = this.options.time;
  }

  CountDown.prototype._handleChange = function () {
    var onChange = this.options.onChange;
    var format = this.options.format;

    if (isFunction(onChange)) {
      onChange(isFunction(format) ? format(this.time) : this.time);
    }
  }

  CountDown.prototype._handleEnd = function () {
    var onEnd = this.options.onEnd;

    this.pause();
    this.conpleted = true;
    if (isFunction(onEnd)) {
      onEnd();
    }
  }

  CountDown.prototype._tick = function () {
    var that = this;
    var interval = that.options.interval;

    if (that.conpleted) {
      that._handleEnd();
      return;
    }

    that.timer = setTimeout(function () {
      that.time -= interval;

      if (that.time < 0) {
        that.time = 0;
      }

      that._handleChange();

      if (that.time <= 0) {
        that._handleEnd();
      } else {
        that._tick();
      }
    }, interval);
  }

  // 开始
  CountDown.prototype.start = function () {
    if (this.counting) {
      return;
    }

    this.counting = true;
    this._tick();
  }

  // 暂停
  CountDown.prototype.pause = function () {
    clearTimeout(this.timer);
    this.counting = false;
  }

  // 重置
  CountDown.prototype.reset = function () {
    this.pause();
    this.conpleted = false;
    this._initTime();
    this._handleChange();
  }

  return CountDown;
}));
