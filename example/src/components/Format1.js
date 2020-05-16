import React, { useState, useEffect, useMemo } from "react";
import CountDown from "countdown-pro";
import SyntaxHighlighter from "react-syntax-highlighter";
import tomorrowNightEighties from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-eighties";

const defaultTime = 60 * 1000;

function formatTime(timestamp) {
  return timestamp / 1000;
}

export default () => {
  const [time, setTime] = useState(() => formatTime(defaultTime));

  const countdown = useMemo(
    () =>
      new CountDown({
        time: defaultTime,
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
      <h2>自定义格式 - 秒</h2>
      <div>{time}</div>

      <SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
        {`import React, { useState, useEffect, useMemo } from "react";
import CountDown from "countdown-pro";

const defaultTime = 60 * 1000;

function format(timestamp) {
  return timestamp / 1000;
}

export default () => {
  const [time, setTime] = useState(() => format(defaultTime));

  const countdown = useMemo(() => new CountDown({
    time: defaultTime,
    format,
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
