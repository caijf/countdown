import { format, parseTimeData, parseFormat, padZero, noop } from './util';

export type Options = {
  time: number;
  interval?: number;
  onChange?: (currentTime: number) => void;
  onEnd?: () => void;
};

class CountDown {
  private o: Required<Options>; // alias
  options: Required<Options>;

  private timer: any;
  private counting: boolean;
  private completed: boolean;
  private currentTime: number;

  constructor(options: Options) {
    this.options = this.o = {
      onChange: noop,
      onEnd: noop,
      interval: 1000,
      time: 0
    };

    if (typeof options === 'object') {
      for (const prop in options) {
        // @ts-ignore
        if (options[prop] !== undefined) {
          // @ts-ignore
          this.o[prop] = options[prop];
        }
      }
    }

    // 倒计时长
    if (typeof this.o.time !== 'number' || this.o.time < 0) {
      this.o.time = 0;
    }

    this.timer = null; // 定时器
    this.counting = false; // 标识正在倒计时
    this.completed = false; // 标识倒计时完成
    this.currentTime = this.o.time; // 记录当前倒计时长
  }

  // 开始
  start() {
    if (this.counting || this.completed) {
      return;
    }

    this.counting = true;
    this.tick();
  }

  // 暂停
  pause() {
    if (this.counting) {
      clearTimeout(this.timer);
      this.counting = false;
    }
  }

  // 重置
  reset() {
    this.pause();
    this.completed = false;
    if (this.currentTime !== this.o.time) {
      this.currentTime = this.o.time;
      this.o.onChange(this.currentTime);
    }
  }

  private tick() {
    const interval = this.o.interval;

    this.timer = setTimeout(() => {
      this.currentTime -= interval;

      if (this.currentTime < 0) {
        this.currentTime = 0;
      }

      this.o.onChange(this.currentTime);

      if (this.currentTime === 0) {
        this.counting = false;
        this.completed = true;
        this.o.onEnd();
      } else {
        this.tick();
      }
    }, interval);
  }

  static format = format;
  static parseTimeData = parseTimeData;
  static parseFormat = parseFormat;
  static padZero = padZero;
}

export default CountDown;
