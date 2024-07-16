import CountDown from '../src/countdown';

describe('countdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(CountDown).toBeDefined();

    expect(CountDown.format).toBeDefined();
    expect(CountDown.padZero).toBeDefined();
    expect(CountDown.parseFormat).toBeDefined();
    expect(CountDown.parseTimeData).toBeDefined();
  });

  it('work', () => {
    const changeFn = jest.fn();
    const endFn = jest.fn();

    const countdown = new CountDown({
      time: 60 * 1000,
      onChange: changeFn,
      onEnd: endFn
    });

    expect(changeFn).toHaveBeenCalledTimes(0);
    expect(endFn).toHaveBeenCalledTimes(0);

    countdown.start();

    jest.advanceTimersByTime(30 * 1000);

    expect(changeFn).toHaveBeenCalledTimes(30);
    expect(endFn).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(30 * 1000);

    expect(changeFn).toHaveBeenCalledTimes(60);
    expect(endFn).toHaveBeenCalledTimes(1);
  });

  it('control', () => {
    const changeFn = jest.fn();
    const endFn = jest.fn();

    const countdown = new CountDown({
      time: 60 * 1000,
      onChange: changeFn,
      onEnd: endFn
    });

    expect(changeFn).toHaveBeenCalledTimes(0);
    expect(endFn).toHaveBeenCalledTimes(0);

    countdown.start();

    jest.advanceTimersByTime(30 * 1000);

    expect(changeFn).toHaveBeenCalledTimes(30);
    expect(endFn).toHaveBeenCalledTimes(0);

    countdown.pause();

    jest.advanceTimersByTime(30 * 1000);

    expect(changeFn).toHaveBeenCalledTimes(30);
    expect(endFn).toHaveBeenCalledTimes(0);

    countdown.reset();

    expect(changeFn).toHaveBeenCalledTimes(31);
    expect(endFn).toHaveBeenCalledTimes(0);

    countdown.start();

    jest.advanceTimersByTime(60 * 1000);

    expect(changeFn).toHaveBeenCalledTimes(91);
    expect(endFn).toHaveBeenCalledTimes(1);
  });

  it('updateOptions & restart', () => {
    const changeFn = jest.fn();
    const endFn = jest.fn();

    const countdown = new CountDown({
      time: 60 * 1000,
      onChange: changeFn,
      onEnd: endFn
    });

    countdown.start();

    jest.advanceTimersByTime(30 * 1000);
    expect(changeFn).toHaveBeenCalledTimes(30);

    countdown.updateOptions({
      time: 10 * 1000
    });

    jest.advanceTimersByTime(30 * 1000);
    expect(changeFn).toHaveBeenCalledTimes(60);
    expect(endFn).toHaveBeenCalledTimes(1);

    countdown.restart();
    jest.advanceTimersByTime(30 * 1000);
    expect(changeFn).toHaveBeenCalledTimes(71);
    expect(endFn).toHaveBeenCalledTimes(2);
  });
});
