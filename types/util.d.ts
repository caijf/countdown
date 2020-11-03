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
