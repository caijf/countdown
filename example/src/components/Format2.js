import React, { useState, useEffect, useMemo } from "react";
import CountDown from "countdown-pro";
import { format } from "countdown-pro/lib/util";
import SyntaxHighlighter from "react-syntax-highlighter";
import tomorrowNightEighties from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-eighties";

const defaultTime = 8 * 60 * 60 * 1000; // 8小时

export default () => {
  const [time, setTime] = useState(() => format(defaultTime));

  const countdown = useMemo(
    () =>
      new CountDown({
        time: defaultTime,
        format,
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
      <div>{time}</div>

      <SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
        {`import React, { useState, useEffect, useMemo } from "react";
import CountDown from "countdown-pro";
import { format } from "countdown-pro/lib/util";

const defaultTime = 8 * 60 * 60 * 1000; // 8小时

export default () => {
  const [time, setTime] = useState(() => format(defaultTime));

  const countdown = useMemo(
    () =>
      new CountDown({
        time: defaultTime,
        format,
        onChange: setTime,
        onEnd: () => {
          console.log("倒计时结束!");
        }
      }),
    []
  );

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
