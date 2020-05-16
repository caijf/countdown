import React, { useState, useEffect, useMemo } from "react";
import CountDown from "countdown-pro";
import SyntaxHighlighter from "react-syntax-highlighter";
import tomorrowNightEighties from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-eighties";

const defaultTime = 60 * 1000;

export default () => {
  const [time, setTime] = useState(defaultTime);

  const countdown = useMemo(
    () =>
      new CountDown({
        time: defaultTime,
        interval: 100,
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
      <h2>基本用法 - 毫秒</h2>
      <div>{time}</div>

      <SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
        {`import React, { useState, useEffect, useMemo } from "react";
import CountDown from "countdown-pro";

const defaultTime = 60 * 1000;

export default () => {
  const [time, setTime] = useState(defaultTime);

  const countdown = useMemo(() => new CountDown({
    time: defaultTime,
    interval: 100,
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
