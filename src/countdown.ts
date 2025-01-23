import { format, parseTimeData, parseFormat, padZero, noop } from './util';

export type Options = {
  /**
   * 倒计时，单位毫秒
   */
  time: number;

  /**
   * 时间间隔，单位毫秒
   * @default 1000
   */
  interval?: number;

  /**
   * 自动校准倒计时时间间隔，单位毫秒。
   *
   * 如果有值且大于 `0`，再开始倒计时时会执行自动校准定时任务。暂定或结束倒计时会停止定时任务。
   */
  adjustInterval?: number;

  /**
   * 倒计时时间变动时触发
   * @param {number} currentTime 当前倒计时时间，单位毫秒
   * @returns
   */
  onChange?: (currentTime: number) => void;

  /**
   * 倒计时结束时触发
   * @returns
   */
  onEnd?: () => void;
};

const defaultInterval = 1000;

/**
 * 倒计时
 *
 * @param {Object} options 配置项
 * @param {number} options.time 倒计时，单位毫秒
 * @param {number} [options.interval=1000] 时间间隔，单位毫秒。默认 `1000`
 * @param {Function} [options.onChange] 倒计时时间变动时触发
 * @param {Function} [options.onEnd] 倒计时结束时触发
 * @param {number} [options.adjustInterval] 自动校准倒计时时间间隔，单位毫秒。如果有值且大于 `0`，再开始倒计时时会执行自动校准定时任务。暂定或结束倒计时会停止定时任务。
 * @returns
 * @example
 * const countdown = new Countdown({
 *   time: 60 * 1000
 *   interval: 1000,
 *   onChange(){},
 *   onEnd(){},
 *   adjustInterval: 10 * 1000
 * });
 *
 * // 实例方法
 * // 开始倒计时
 * countdown.start();
 *
 * // 暂停倒计时
 * countdown.pause();
 *
 * // 重置倒计时。先暂停再将倒计时时间重置
 * countdown.reset();
 *
 * // 重置再开始倒计时
 * countdown.restart();
 *
 * // 更新配置。如果更新 `time` 需要手动调用 `reset` 或 `restart` 方法才生效
 * countdown.updateOptions(options);
 *
 * // 校准倒计时。在倒计时运行时才生效，如果需要校准会先暂停再开始。
 * countdown.adjustTime();
 *
 * // 静态方法
 * // 格式化时间，返回格式化后的时间字符串
 * CountDown.format(2 * 60 * 60 * 1000); // "02:00:00"
 * CountDown.format(2 * 60 * 60 * 1000, 'mm:ss'); // "120:00"
 *
 * // 前置补零，返回补零后的值
 * CountDown.padZero(2); // "02"
 *
 * // 解析时间戳，返回的时间对象格式
 * CountDown.parseTimeData(2 * 60 * 60 * 1000);
 * // {days: 0, hours: 2, minutes: 0, seconds: 0, milliseconds: 0}
 *
 */
class CountDown {
  private o: Required<Options>; // alias
  protected options: Required<Options>;

  /**
   * 定时器
   */
  private timer: any;

  /**
   * 标识正在倒计时
   */
  private counting: boolean;

  /**
   * 标识倒计时完成
   */
  private completed: boolean;

  /**
   * 记录当前倒计时长
   */
  private currentTime: number;

  /**
   * 记录开始时间戳，用于校准
   */
  private adjustStartTime: number;

  /**
   * 记录开始的倒计时长，用于校准
   */
  private adjustCurrentTime: number;

  /**
   * 校准倒计时时间定时器
   */
  private adjustTimer: any;

  constructor(options: Options) {
    this.options = this.o = {
      onChange: noop,
      onEnd: noop,
      interval: defaultInterval,
      time: 0,
      adjustInterval: 0
    };

    this.updateOptions(options);

    this.timer = null;
    this.counting = false;
    this.completed = false;
    this.currentTime = this.o.time;

    this.adjustStartTime = 0;
    this.adjustCurrentTime = 0;
    this.adjustTimer = null;
  }

  private _handleEnd() {
    clearInterval(this.adjustTimer);
    this.counting = false;
    this.completed = true;
    this.o.onEnd();
  }

  /**
   * 更新配置。
   *
   * 如果更新 `time` 需要手动调用 `reset` 或 `restart` 方法才生效。
   *
   * @param {Object} options 配置项
   * @param {number} [options.time] 倒计时，单位毫秒
   * @param {number} [options.interval] 时间间隔，单位毫秒
   * @param {Function} [options.onChange] 倒计时时间变动时触发
   * @param {Function} [options.onEnd] 倒计时结束时触发
   * @returns
   */
  updateOptions(options: Partial<Options>) {
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
    // 倒计时间隔
    if (typeof this.o.interval !== 'number' || this.o.interval < 0) {
      this.o.interval = defaultInterval;
    }
  }

  /**
   * 开始倒计时
   * @returns
   */
  start() {
    if (this.counting || this.completed) {
      return;
    }

    this.adjustStartTime = Date.now();
    this.adjustCurrentTime = this.currentTime;

    if (this.o.adjustInterval > 0) {
      this.adjustTimer = setInterval(() => {
        this.adjustTime();
      }, this.o.adjustInterval);
    }

    this.counting = true;
    this.tick();
  }

  /**
   * 校准倒计时时间。建议使用 `adjustInterval` 配置。
   *
   * 仅在倒计时运行时才生效。如果需要校准，会先暂停，调用 `onChange` ，再开始倒计时。
   *
   * @example
   * const interval = 1000;
   * let timer = null;
   * const countdown = new CountDown({
   *   time: 60 * 1000,
   *   interval,
   *   onEnd(){
   *     clearInterval(timer);
   *   }
   * });
   *
   * // 每倒计时10次，校准一次倒计时时间
   * const timer = setInterval(()=>{
   *   countdown.adjustTime();
   * }, interval * 10);
   *
   */
  adjustTime() {
    if (this.counting) {
      const currentTimestamp = Date.now();
      const diffTime = currentTimestamp - this.adjustStartTime;
      const diffTimeInt = Math.round(diffTime / this.o.interval) * this.o.interval;
      const newCurrentTime = this.adjustCurrentTime - diffTimeInt;
      if (newCurrentTime >= 0 && this.currentTime !== newCurrentTime) {
        this.pause();
        this.currentTime = newCurrentTime;
        this.o.onChange(this.currentTime);
        if (this.currentTime === 0) {
          this._handleEnd();
        } else {
          this.start();
        }
      }
    }
  }

  /**
   * 暂停倒计时
   */
  pause() {
    if (this.counting) {
      clearTimeout(this.timer);
      clearInterval(this.adjustTimer);
      this.counting = false;
    }
  }

  /**
   * 重置倒计时。
   *
   * 先暂停再将倒计时时间重置。
   */
  reset() {
    this.pause();
    this.completed = false;
    if (this.currentTime !== this.o.time) {
      this.currentTime = this.o.time;
      this.o.onChange(this.currentTime);
    }
  }

  /**
   * 重置再开始倒计时
   */
  restart() {
    this.reset();
    this.start();
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
        this._handleEnd();
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
