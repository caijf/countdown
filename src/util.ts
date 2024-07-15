/**
 * 前置补零，如果值的长度小于目标长度，则前置补零，否则不处理
 *
 * @param num 待处理的值
 * @param targetLength 目标长度
 * @returns 补零后的值
 */
export function padZero(num: string | number, targetLength = 2) {
  let str = '' + num;
  while (str.length < targetLength) {
    str = '0' + str;
  }
  return str;
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const mathFloor = Math.floor;

/**
 * 解析时间戳
 *
 * @param {number} timestamp 时间戳，单位毫秒
 * @returns 包含日/时/分/秒/毫秒的对象
 */
export function parseTimeData(timestamp: number) {
  return {
    days: mathFloor(timestamp / DAY),
    hours: mathFloor((timestamp % DAY) / HOUR),
    minutes: mathFloor((timestamp % HOUR) / MINUTE),
    seconds: mathFloor((timestamp % MINUTE) / SECOND),
    milliseconds: mathFloor(timestamp % SECOND)
  };
}

/**
 * 格式化时间格式
 *
 * @param format 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒
 * @param timeData 包含日/时/分/秒/毫秒的对象
 * @returns 返回格式化后的时间字符串
 */
export function parseFormat(format: string, timeData: ReturnType<typeof parseTimeData>) {
  // eslint-disable-next-line prefer-const
  let { days, hours, minutes, seconds, milliseconds } = timeData;

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

/**
 * 格式化时间
 *
 * @param {number} timestamp 时间戳，单位毫秒
 * @param {string} [pattern='HH:mm:ss'] 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒。默认值为 HH:mm:ss
 * @returns {string} 返回格式化后的时间字符串
 */
export function format(timestamp: number, pattern = 'HH:mm:ss') {
  const timeData = parseTimeData(timestamp);
  return parseFormat(pattern, timeData);
}

export const noop = () => {};
