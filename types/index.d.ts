interface TimeData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

declare module 'countdown-pro/lib/util' {
  export function format(timestamp: number, formatStr?: string): string;
  export function padZero(num: number, targetLength?: number): string;
  export function parseTimeData(timestamp: number): TimeData;
  export function parseFormat(formatStr: string, timeData: TimeData): string;
}

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