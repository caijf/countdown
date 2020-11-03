interface CountDownOptions {
  time: number;
  interval?: number;
  format?: (timestamp: number) => any;
  onChange?: (time: any) => void;
  onEnd?: () => void;
}

declare class CountDown {
  constructor(options: CountDownOptions);
  start(): void;
  pause(): void;
  reset(): void;
}

export default CountDown;