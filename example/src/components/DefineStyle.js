import React, { useState, useMemo, useEffect } from "react";
import CountDownPro from "countdown-pro";
import { parseTimeData } from "countdown-pro/lib/util";
import SyntaxHighlighter from "react-syntax-highlighter";
import tomorrowNightEighties from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-eighties";

const style = {
  display: "inline-block",
  minWidth: "22px",
  height: "22px",
  lineHeight: "22px",
  borderRadius: "2px",
  background: "red",
  color: "white",
  verticalAlign: "middle",
  textAlign: "center",
  boxSizing: "border-box",
  padding: "0 2px",
  fontSize: "13px"
};

export default () => {
  const [dateObj, setDateObj] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  const countdown = useMemo(
    () =>
      new CountDownPro({
        time: 2 * 24 * 60 * 60 * 1000,
        format: parseTimeData,
        onChange: setDateObj
      }),
    []
  );

  useEffect(() => {
    countdown.start();
    return () => countdown.pause();
  }, []);

  return (
    <>
      <span style={style}>{dateObj.days}</span>:
      <span style={style}>{dateObj.hours}</span>:
      <span style={style}>{dateObj.minutes}</span>:
      <span style={style}>{dateObj.seconds}</span>
      <SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
        {`import React, { useState, useMemo, useEffect } from "react";
import CountDownPro from "countdown-pro";
import { parseTimeData } from "countdown-pro/lib/util";

const style = {
  display: 'inline-block',
  minWidth: '22px',
  height: '22px',
  lineHeight: '22px',
  borderRadius: '2px',
  background: 'red',
  color: 'white',
  verticalAlign: 'middle',
  textAlign: 'center',
  boxSizing: 'border-box',
  padding: '0 2px',
  fontSize: '13px'
}

export default () => {
  const [dateObj, setDateObj] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  const countdown = useMemo(() => new CountDownPro({
    time: 2 * 24 * 60 * 60 * 1000,
    format: parseTimeData,
    onChange: setDateObj
  }), []);

  useEffect(() => {
    countdown.start();
    return () => countdown.pause();
  }, []);

  return (
    <>
      <span style={style}>{dateObj.days}</span>:
      <span style={style}>{dateObj.hours}</span>:
      <span style={style}>{dateObj.minutes}</span>:
      <span style={style}>{dateObj.seconds}</span>
    </>
  )
}`}
      </SyntaxHighlighter>
    </>
  );
};
