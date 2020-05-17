import React, { useState, useMemo, useCallback, useEffect } from "react";
import CountDownPro from "countdown-pro";
import { parseTimeData } from "countdown-pro/lib/util";
import SyntaxHighlighter from "react-syntax-highlighter";
import tomorrowNightEighties from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-eighties";

export default () => {
  const [dateObj, setDateObj] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    milliseconds: "0"
  });

  const handleTimerEnd = useCallback(() => {
    console.log("活动已结束！");
  }, []);

  const countdown = useMemo(
    () =>
      new CountDownPro({
        time: 2 * 24 * 60 * 60 * 1000,
        interval: 100,
        format: parseTimeData,
        onChange: timeData => {
          setDateObj({
            ...timeData,
            milliseconds: timeData.milliseconds / 100
          });
        },
        onEnd: handleTimerEnd
      }),
    []
  );

  useEffect(() => {
    countdown.start();
    return () => countdown.pause();
  }, []);

  return (
    <>
      距活动结束还剩{" "}
      {dateObj.days && dateObj.days > 0 && <>{dateObj.days} 天</>}
      {dateObj.hours} 小时 {dateObj.minutes} 分 {dateObj.seconds}.
      {dateObj.milliseconds} 秒
      <SyntaxHighlighter language="javascript" style={tomorrowNightEighties}>
        {`import React, { useState, useMemo, useCallback, useEffect } from "react";
import CountDownPro from "countdown-pro";
import { parseTimeData } from "countdown-pro/lib/util";

export default () => {
  const [dateObj, setDateObj] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    milliseconds: '0'
  });

  const handleTimerEnd = useCallback(() => {
    console.log('活动已结束！');
  }, []);

  const countdown = useMemo(() => new CountDownPro({
    time: 2 * 24 * 60 * 60 * 1000,
    interval: 100,
    format: parseTimeData,
    onChange: timeData => {
      setDateObj({ ...timeData, milliseconds: timeData.milliseconds / 100 })
    },
    onEnd: handleTimerEnd
  }), []);

  useEffect(() => {
    countdown.start();
    return () => countdown.pause();
  }, []);

  return (
    <>
      距活动结束还剩 { dateObj.days && dateObj.days > 0 && <>{dateObj.days} 天</>}{dateObj.hours} 小时 {dateObj.minutes} 分 {dateObj.seconds}.{dateObj.milliseconds} 秒
    </>
  )
}`}
      </SyntaxHighlighter>
    </>
  );
};
