import { format, parseFormat, parseTimeData, padZero } from '../src/util';

describe('util', () => {

  it('format', () => {
    // @ts-ignore
    expect(format()).toBe('NaN:NaN:NaN');
    expect(format(1)).toBe('00:00:00');
    expect(format(100)).toBe('00:00:00');
    expect(format(1000)).toBe('00:00:01');
    expect(format(10 * 1000)).toBe('00:00:10');
    expect(format(60 * 1000)).toBe('00:01:00');
    expect(format(2 * 60 * 1000)).toBe('00:02:00');
    expect(format(60 * 60 * 1000)).toBe('01:00:00');
    expect(format(24 * 60 * 60 * 1000)).toBe('24:00:00');
    expect(format(48 * 60 * 60 * 1000)).toBe('48:00:00');

    // pattern
    expect(format(1, 'HH:mm:ss:SSS')).toBe('00:00:00:001');
    expect(format(100, 'HH:mm:ss:SSS')).toBe('00:00:00:100');
    expect(format(1000, 'HH:mm:ss:SSS')).toBe('00:00:01:000');
    expect(format(10 * 1000, 'HH:mm:ss:SSS')).toBe('00:00:10:000');
    expect(format(60 * 1000, 'HH:mm:ss:SSS')).toBe('00:01:00:000');
    expect(format(2 * 60 * 1000, 'HH:mm:ss:SSS')).toBe('00:02:00:000');
    expect(format(60 * 60 * 1000, 'HH:mm:ss:SSS')).toBe('01:00:00:000');
    expect(format(24 * 60 * 60 * 1000, 'HH:mm:ss:SSS')).toBe('24:00:00:000');
    expect(format(48 * 60 * 60 * 1000, 'HH:mm:ss:SSS')).toBe('48:00:00:000');

    expect(format(1, 'DD:HH:mm:ss')).toBe('00:00:00:00');
    expect(format(100, 'DD:HH:mm:ss')).toBe('00:00:00:00');
    expect(format(1000, 'DD:HH:mm:ss')).toBe('00:00:00:01');
    expect(format(10 * 1000, 'DD:HH:mm:ss')).toBe('00:00:00:10');
    expect(format(60 * 1000, 'DD:HH:mm:ss')).toBe('00:00:01:00');
    expect(format(2 * 60 * 1000, 'DD:HH:mm:ss')).toBe('00:00:02:00');
    expect(format(60 * 60 * 1000, 'DD:HH:mm:ss')).toBe('00:01:00:00');
    expect(format(24 * 60 * 60 * 1000, 'DD:HH:mm:ss')).toBe('01:00:00:00');
    expect(format(48 * 60 * 60 * 1000, 'DD:HH:mm:ss')).toBe('02:00:00:00');

    expect(format(1, 'mm:ss')).toBe('00:00');
    expect(format(100, 'mm:ss')).toBe('00:00');
    expect(format(1000, 'mm:ss')).toBe('00:01');
    expect(format(10 * 1000, 'mm:ss')).toBe('00:10');
    expect(format(60 * 1000, 'mm:ss')).toBe('01:00');
    expect(format(2 * 60 * 1000, 'mm:ss')).toBe('02:00');
    expect(format(60 * 60 * 1000, 'mm:ss')).toBe('60:00');
    expect(format(24 * 60 * 60 * 1000, 'mm:ss')).toBe('1440:00');
    expect(format(48 * 60 * 60 * 1000, 'mm:ss')).toBe('2880:00');
  });

  it('padZero', () => {
    // @ts-ignore
    expect(padZero()).toBe("undefined");
    // @ts-ignore
    expect(padZero(true)).toBe('true');

    expect(padZero(0)).toBe('00');
    expect(padZero('')).toBe('00');
    expect(padZero(123)).toBe('123');
    expect(padZero(12345)).toBe('12345');

    expect(padZero(0, 4)).toBe('0000');
    expect(padZero('', 4)).toBe('0000');
    expect(padZero(123, 4)).toBe('0123');
    expect(padZero(12345, 4)).toBe('12345');
  });

  it('parseTimeData', () => {
    // @ts-ignore
    expect(parseTimeData()).toEqual({ "days": NaN, "hours": NaN, "milliseconds": NaN, "minutes": NaN, "seconds": NaN });

    expect(parseTimeData(1)).toEqual({ "days": 0, "hours": 0, "milliseconds": 1, "minutes": 0, "seconds": 0 });
    expect(parseTimeData(10)).toEqual({ "days": 0, "hours": 0, "milliseconds": 10, "minutes": 0, "seconds": 0 });
    expect(parseTimeData(100)).toEqual({ "days": 0, "hours": 0, "milliseconds": 100, "minutes": 0, "seconds": 0 });
    expect(parseTimeData(1000)).toEqual({ "days": 0, "hours": 0, "milliseconds": 0, "minutes": 0, "seconds": 1 });
    expect(parseTimeData(2 * 1000)).toEqual({ "days": 0, "hours": 0, "milliseconds": 0, "minutes": 0, "seconds": 2 });
    expect(parseTimeData(60 * 1000)).toEqual({ "days": 0, "hours": 0, "milliseconds": 0, "minutes": 1, "seconds": 0 });
    expect(parseTimeData(2 * 60 * 1000)).toEqual({ "days": 0, "hours": 0, "milliseconds": 0, "minutes": 2, "seconds": 0 });
    expect(parseTimeData(60 * 60 * 1000)).toEqual({ "days": 0, "hours": 1, "milliseconds": 0, "minutes": 0, "seconds": 0 });
    expect(parseTimeData(24 * 60 * 60 * 1000)).toEqual({ "days": 1, "hours": 0, "milliseconds": 0, "minutes": 0, "seconds": 0 });
  });

  it('parseFormat', () => {
    expect(parseFormat('HH:mm:ss', parseTimeData(1))).toBe('00:00:00');
    expect(parseFormat('HH:mm:ss', parseTimeData(100))).toBe('00:00:00');
    expect(parseFormat('HH:mm:ss', parseTimeData(1000))).toBe('00:00:01');
    expect(parseFormat('HH:mm:ss', parseTimeData(10 * 1000))).toBe('00:00:10');
    expect(parseFormat('HH:mm:ss', parseTimeData(60 * 1000))).toBe('00:01:00');
    expect(parseFormat('HH:mm:ss', parseTimeData(2 * 60 * 1000))).toBe('00:02:00');
    expect(parseFormat('HH:mm:ss', parseTimeData(60 * 60 * 1000))).toBe('01:00:00');
    expect(parseFormat('HH:mm:ss', parseTimeData(24 * 60 * 60 * 1000))).toBe('24:00:00');
    expect(parseFormat('HH:mm:ss', parseTimeData(48 * 60 * 60 * 1000))).toBe('48:00:00');
  });
});