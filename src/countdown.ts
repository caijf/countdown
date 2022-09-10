import { format, parseTimeData, parseFormat, padZero } from './util';

type Options = {
  time: number;
  interval?: number;
  onChange?: (currentTime: number) => void;
  onEnd?: () => void;
}

class CountDown {
  options: Options & { time: number; interval: number; };

  private timer: any;
  private counting: boolean;
  private completed: boolean;
  private currentTime: number;

  constructor(options: Options) {
    this.options = {
      time: 0,
      interval: 1000
    };

    for (const prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        // @ts-ignore
        this.options[prop] = options[prop];
      }
    }

    this.options.time = (typeof this.options.time !== 'number' || this.options.time < 0) ? 0 : Math.ceil(this.options.time); // 倒计时长

    this.timer = null; // 定时器
    this.counting = false; // 标识正在倒计时
    this.completed = false; // 标识倒计时完成

    this.currentTime = this.options.time; // 记录当前倒计时长
  }

  // 开始
  start() {
    if (this.counting) {
      return;
    }

    this.counting = true;
    this.tick();
  }

  // 暂停
  pause() {
    clearTimeout(this.timer);
    this.counting = false;
  }

  // 重置
  reset() {
    this.pause();
    this.completed = false;
    this.currentTime = this.options.time;
    this.handleChange();
  }

  private handleChange() {
    this.options.onChange?.(this.currentTime);
  }

  private handleEnd() {
    this.pause();
    this.completed = true;
    this.options.onEnd?.();
  }

  private tick() {
    var that = this;
    var interval = that.options.interval;

    if (that.completed) {
      that.handleEnd();
      return;
    }

    that.timer = setTimeout(function () {
      that.currentTime -= interval;

      if (that.currentTime < 0) {
        that.currentTime = 0;
      }

      that.handleChange();

      if (that.currentTime <= 0) {
        that.handleEnd();
      } else {
        that.tick();
      }
    }, interval);
  }

  static format = format;
  static parseTimeData = parseTimeData;
  static parseFormat = parseFormat;
  static padZero = padZero;
}

export default CountDown;
