import React from "react";
import Basic from "~/components/Basic";
import Format1 from "~/components/Format1";
import Format2 from "~/components/Format2";
import Format3 from "~/components/Format3";
import Activity from "~/components/Activity";
import DefineStyle from "~/components/DefineStyle";
import Control from "~/components/Control";

export default () => {
  return (
    <div>
      <h2>基本用法</h2>
      <Basic />
      <h2>自定义格式</h2>
      <h3>秒</h3>
      <Format1 />
      <h3>时分秒</h3>
      <Format2 />
      <h3>天时分秒</h3>
      <Format3 />
      <h3>活动倒计时</h3>
      <Activity />
      <h2>自定义样式</h2>
      <DefineStyle />
      <h2>手动控制</h2>
      <Control />
    </div>
  );
};
