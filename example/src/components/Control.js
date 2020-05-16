import React, { useState, useEffect, useMemo, useCallback } from "react";
import CountDown from "countdown-pro";
import { format } from "countdown-pro/lib/util";
import SyntaxHighlighter from "react-syntax-highlighter";
import tomorrowNightEighties from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-eighties";

const defaultTime = 10 * 1000;

function formatTime(timestamp) {
  return format(timestamp, "ss:SSS");
}

export default () => {
  const [time, setTime] = useState(() => formatTime(defaultTime));

  const countdown = useMemo(
    () =>
      new CountDown({
        time: defaultTime,
        format: formatTime,
        interval: 30,
        onChange: setTime,
        onEnd: () => {
          // eslint-disable-next-line
          console.log("倒计时结束!");
        }
      }),
    []
  );

  useEffect(() => () => countdown.pause(), []);

  const handleStart = useCallback(() => {
    countdown.start();
  }, []);

  const handlePause = useCallback(() => {
    countdown.pause();
  }, []);

  const handleReset = useCallback(() => {
    countdown.reset();
  }, []);

  return (
    <>
      <h2>控制</h2>
      <div>{time}</div>
      <button onClick={handleStart} type="button">
        开始
      </button>
      <button onClick={handlePause} type="button">
        暂停
      </button>
      <button onClick={handleReset} type="button">
        重置
      </button>
      <SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
        {`import React, { useState, useEffect, useMemo } from "react";
import CountDown from "countdown-pro";

const defaultTime = 10 * 1000;

function format(timestamp) {
  return timestamp / 1000;
}

export default () => {
  const [time, setTime] = useState(() => format(defaultTime));

  const countdown = useMemo(() => new CountDown({
    time: defaultTime,
    format,
    interval: 30,
    onChange: setTime,
    onEnd: () => {
      console.log('倒计时结束!');
    }
  }), []);

  useEffect(() => () => countdown.pause(), []);

  const handleStart = useCallback(() => {
    countdown.start();
  }, []);

  const handlePause = useCallback(() => {
    countdown.pause();
  }, []);

  const handleReset = useCallback(() => {
    countdown.reset();
  }, []);

  return (
    <>
      <div>{time}</div>
      <button onClick={handleStart}>开始</button>
      <button onClick={handlePause}>暂停</button>
      <button onClick={handleReset}>重置</button>
    </>
  )
}`}
      </SyntaxHighlighter>
    </>
  );
};
