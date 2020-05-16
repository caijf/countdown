import React, { useState, useEffect, useMemo } from "react";
import CountDown from "countdown-pro";
import { format } from "countdown-pro/lib/util";
import SyntaxHighlighter from "react-syntax-highlighter";
import tomorrowNightEighties from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-eighties";

const defaultTime = 2 * 24 * 60 * 60 * 1000; // 2天

function formatTime(timestamp) {
  return format(timestamp, "DD 天 HH 时 mm 分 ss 秒");
}

export default () => {
  const [time, setTime] = useState(() => formatTime(defaultTime));

  const countdown = useMemo(
    () =>
      new CountDown({
        time: defaultTime,
        interval: 35,
        format: formatTime,
        onChange: setTime,
        onEnd: () => {
          // eslint-disable-next-line
          console.log("倒计时结束!");
        }
      }),
    []
  );

  useEffect(() => {
    countdown.start();

    return () => countdown.pause();
  }, []);

  return (
    <>
      <h2>自定义格式 - 天时分秒</h2>
      <div>{time}</div>

      <SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
        {`import React, { useState, useEffect, useMemo } from "react";
import CountDown from "countdown-pro";
import { format } from "countdown-pro/lib/util";

const defaultTime = 2 * 24 * 60 * 60 * 1000; // 2天

function formatTime(timestamp){
  return format(timestamp, "DD 天 HH 时 mm 分 ss 秒")
}

export default () => {
  const [time, setTime] = useState(() => formatTime(defaultTime));

  const countdown = useMemo(() => new CountDown({
    time: defaultTime,
    interval: 35,
    format: formatTime,
    onChange: setTime,
    onEnd: () => {
      console.log('倒计时结束!');
    }
  }), []);

  useEffect(() => {
    countdown.start();

    return () => countdown.pause();
  }, []);

  return time
}`}
      </SyntaxHighlighter>
    </>
  );
};
