(function(e){function t(t){for(var o,a,l=t[0],i=t[1],f=t[2],s=0,d=[];s<l.length;s++)a=l[s],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&d.push(u[a][0]),u[a]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);c&&c(t);while(d.length)d.shift()();return r.push.apply(r,f||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,l=1;l<n.length;l++){var i=n[l];0!==u[i]&&(o=!1)}o&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},u={0:0},r=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="./";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=t,l=l.slice();for(var f=0;f<l.length;f++)t(l[f]);var c=i;r.push([204,1]),n()})({137:function(e,t,n){var o,u,r;!function(n,a){u=[],o=a,r="function"===typeof o?o.apply(t,u):o,void 0===r||(e.exports=r)}(0,(function(){function e(e,t){for(var n=e+"",o=t||2;n.length<o;)n="0"+n;return n}var t=1e3,n=60*t,o=60*n,u=24*o;function r(e){var r={};return r.days=Math.floor(e/u),r.hours=Math.floor(e%u/o),r.minutes=Math.floor(e%o/n),r.seconds=Math.floor(e%n/t),r.milliseconds=Math.floor(e%t),r}function a(t,n){var o=n.days,u=n.hours,r=n.minutes,a=n.seconds,l=n.milliseconds;return-1===t.indexOf("DD")?u+=24*o:t=t.replace("DD",e(o)),-1===t.indexOf("HH")?r+=60*u:t=t.replace("HH",e(u)),-1===t.indexOf("mm")?a+=60*r:t=t.replace("mm",e(r)),-1===t.indexOf("ss")?l+=1e3*a:t=t.replace("ss",e(a)),t.replace("SSS",e(l,3))}return{format:function(e,t){return a(t||"HH:mm:ss",r(e))},padZero:e,parseTimeData:r,parseFormat:a}}))},204:function(e,t,n){n(205),e.exports=n(430)},205:function(e,t,n){"use strict";n(206),n(181)},430:function(e,t,n){"use strict";var o=n(44),u=o(n(431)),r=o(n(1)),a=o(n(433)),l=n(839),i=o(n(441));function f(){return r["default"].createElement(l.HashRouter,null,r["default"].createElement(l.Switch,null,i["default"].map((function(e){return r["default"].createElement(l.Route,(0,u["default"])({key:"page_".concat(e.name)},e))})),r["default"].createElement(l.Redirect,{to:"/"})))}a["default"].render(r["default"].createElement(f,null),document.getElementById("root"))},441:function(e,t,n){"use strict";var o=n(44);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var u=o(n(442)),r=[{path:"/",component:u["default"],exact:!0}];t["default"]=r},442:function(e,t,n){"use strict";var o=n(44);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var u=o(n(1)),r=o(n(443)),a=o(n(835)),l=o(n(836)),i=o(n(837)),f=o(n(838)),c=function e(){return u["default"].createElement("div",null,u["default"].createElement(r["default"],null),u["default"].createElement(a["default"],null),u["default"].createElement(l["default"],null),u["default"].createElement(i["default"],null),u["default"].createElement(f["default"],null))};t["default"]=c},443:function(e,t,n){"use strict";var o=n(71),u=n(44);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var r=u(n(72)),a=o(n(1)),l=u(n(73)),i=u(n(76)),f=u(n(75)),c=6e4,s=function e(){var t=(0,a.useState)(c),n=(0,r["default"])(t,2),o=n[0],u=n[1],s=(0,a.useMemo)((function(){return new l["default"]({time:c,interval:100,onChange:u,onEnd:function e(){}})}),[]);return(0,a.useEffect)((function(){return s.start(),function(){return s.pause()}}),[]),a["default"].createElement(a["default"].Fragment,null,a["default"].createElement("h2",null,"\u57fa\u672c\u7528\u6cd5 - \u6beb\u79d2"),a["default"].createElement("div",null,o),a["default"].createElement(i["default"],{language:"javascript",style:f["default"]},'import React, { useState, useEffect, useMemo } from "react";\nimport CountDown from "countdown-pro";\n\nconst defaultTime = 60 * 1000;\n\nexport default () => {\n  const [time, setTime] = useState(defaultTime);\n\n  const countdown = useMemo(() => new CountDown({\n    time: defaultTime,\n    interval: 100,\n    onChange: setTime,\n    onEnd: () => {\n      console.log(\'\u5012\u8ba1\u65f6\u7ed3\u675f!\');\n    }\n  }), []);\n\n  useEffect(() => {\n    countdown.start();\n\n    return () => countdown.pause();\n  }, []);\n\n  return time\n}'))};t["default"]=s},73:function(e,t,n){var o,u,r;!function(n,a){u=[],o=a,r="function"===typeof o?o.apply(t,u):o,void 0===r||(e.exports=r)}(0,(function(){function e(){}function t(e){return"function"==typeof e}function n(e){this._init("object"!=typeof e?{}:e)}return n.prototype._init=function(t){for(var n in this.counting=!1,this.conpleted=!1,this.timer=null,this.options={time:0,interval:1e3,format:null,onChange:e,onEnd:e},t)t.hasOwnProperty(n)&&(this.options[n]=t[n]);this._initTime()},n.prototype._initTime=function(){this.time=this.options.time},n.prototype._handleChange=function(){var e=this.options.onChange,n=this.options.format;t(e)&&e(t(n)?n(this.time):this.time)},n.prototype._handleEnd=function(){var e=this.options.onEnd;this.pause(),this.conpleted=!0,t(e)&&e()},n.prototype._tick=function(){var e=this,t=e.options.interval;e.conpleted?e._handleEnd():e.timer=setTimeout((function(){e.time-=t,e.time<0&&(e.time=0),e._handleChange(),e.time<=0?e._handleEnd():e._tick()}),t)},n.prototype.start=function(){this.counting||(this.counting=!0,this._tick())},n.prototype.pause=function(){clearTimeout(this.timer),this.counting=!1},n.prototype.reset=function(){this.pause(),this.conpleted=!1,this._initTime(),this._handleChange()},n}))},835:function(e,t,n){"use strict";var o=n(71),u=n(44);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var r=u(n(72)),a=o(n(1)),l=u(n(73)),i=u(n(76)),f=u(n(75)),c=6e4;function s(e){return e/1e3}var d=function e(){var t=(0,a.useState)((function(){return s(c)})),n=(0,r["default"])(t,2),o=n[0],u=n[1],d=(0,a.useMemo)((function(){return new l["default"]({time:c,format:s,onChange:u,onEnd:function e(){}})}),[]);return(0,a.useEffect)((function(){return d.start(),function(){return d.pause()}}),[]),a["default"].createElement(a["default"].Fragment,null,a["default"].createElement("h2",null,"\u81ea\u5b9a\u4e49\u683c\u5f0f - \u79d2"),a["default"].createElement("div",null,o),a["default"].createElement(i["default"],{language:"javascript",style:f["default"]},'import React, { useState, useEffect, useMemo } from "react";\nimport CountDown from "countdown-pro";\n\nconst defaultTime = 60 * 1000;\n\nfunction format(timestamp) {\n  return timestamp / 1000;\n}\n\nexport default () => {\n  const [time, setTime] = useState(() => format(defaultTime));\n\n  const countdown = useMemo(() => new CountDown({\n    time: defaultTime,\n    format,\n    onChange: setTime,\n    onEnd: () => {\n      console.log(\'\u5012\u8ba1\u65f6\u7ed3\u675f!\');\n    }\n  }), []);\n\n  useEffect(() => {\n    countdown.start();\n\n    return () => countdown.pause();\n  }, []);\n\n  return time\n}'))};t["default"]=d},836:function(e,t,n){"use strict";var o=n(71),u=n(44);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var r=u(n(72)),a=o(n(1)),l=u(n(73)),i=n(137),f=u(n(76)),c=u(n(75)),s=288e5,d=function e(){var t=(0,a.useState)((function(){return(0,i.format)(s)})),n=(0,r["default"])(t,2),o=n[0],u=n[1],d=(0,a.useMemo)((function(){return new l["default"]({time:s,format:i.format,onChange:u,onEnd:function e(){}})}),[]);return(0,a.useEffect)((function(){return d.start(),function(){return d.pause()}}),[]),a["default"].createElement(a["default"].Fragment,null,a["default"].createElement("h2",null,"\u81ea\u5b9a\u4e49\u683c\u5f0f - \u65f6\u5206\u79d2"),a["default"].createElement("div",null,o),a["default"].createElement(f["default"],{language:"javascript",style:c["default"]},'import React, { useState, useEffect, useMemo } from "react";\nimport CountDown from "countdown-pro";\nimport { format } from "countdown-pro/lib/util";\n\nconst defaultTime = 8 * 60 * 60 * 1000; // 8\u5c0f\u65f6\n\nexport default () => {\n  const [time, setTime] = useState(() => format(defaultTime));\n\n  const countdown = useMemo(\n    () =>\n      new CountDown({\n        time: defaultTime,\n        format,\n        onChange: setTime,\n        onEnd: () => {\n          console.log("\u5012\u8ba1\u65f6\u7ed3\u675f!");\n        }\n      }),\n    []\n  );\n\n  useEffect(() => {\n    countdown.start();\n\n    return () => countdown.pause();\n  }, []);\n\n  return time\n}'))};t["default"]=d},837:function(e,t,n){"use strict";var o=n(71),u=n(44);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var r=u(n(72)),a=o(n(1)),l=u(n(73)),i=n(137),f=u(n(76)),c=u(n(75)),s=1728e5;function d(e){return(0,i.format)(e,"DD \u5929 HH \u65f6 mm \u5206 ss \u79d2")}var m=function e(){var t=(0,a.useState)((function(){return d(s)})),n=(0,r["default"])(t,2),o=n[0],u=n[1],i=(0,a.useMemo)((function(){return new l["default"]({time:s,format:d,onChange:u,onEnd:function e(){}})}),[]);return(0,a.useEffect)((function(){return i.start(),function(){return i.pause()}}),[]),a["default"].createElement(a["default"].Fragment,null,a["default"].createElement("h2",null,"\u81ea\u5b9a\u4e49\u683c\u5f0f - \u5929\u65f6\u5206\u79d2"),a["default"].createElement("div",null,o),a["default"].createElement(f["default"],{language:"javascript",style:c["default"]},'import React, { useState, useEffect, useMemo } from "react";\nimport CountDown from "countdown-pro";\nimport { format } from "countdown-pro/lib/util";\n\nconst defaultTime = 2 * 24 * 60 * 60 * 1000; // 2\u5929\n\nfunction formatTime(timestamp){\n  return format(timestamp, "DD \u5929 HH \u65f6 mm \u5206 ss \u79d2")\n}\n\nexport default () => {\n  const [time, setTime] = useState(() => formatTime(defaultTime));\n\n  const countdown = useMemo(() => new CountDown({\n    time: defaultTime,\n    format: formatTime,\n    onChange: setTime,\n    onEnd: () => {\n      console.log(\'\u5012\u8ba1\u65f6\u7ed3\u675f!\');\n    }\n  }), []);\n\n  useEffect(() => {\n    countdown.start();\n\n    return () => countdown.pause();\n  }, []);\n\n  return time\n}'))};t["default"]=m},838:function(e,t,n){"use strict";var o=n(71),u=n(44);Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=void 0;var r=u(n(72)),a=o(n(1)),l=u(n(73)),i=n(137),f=u(n(76)),c=u(n(75)),s=1e4;function d(e){return(0,i.format)(e,"ss:SSS")}var m=function e(){var t=(0,a.useState)((function(){return d(s)})),n=(0,r["default"])(t,2),o=n[0],u=n[1],i=(0,a.useMemo)((function(){return new l["default"]({time:s,format:d,interval:30,onChange:u,onEnd:function e(){}})}),[]);(0,a.useEffect)((function(){return function(){return i.pause()}}),[]);var m=(0,a.useCallback)((function(){i.start()}),[]),p=(0,a.useCallback)((function(){i.pause()}),[]),h=(0,a.useCallback)((function(){i.reset()}),[]);return a["default"].createElement(a["default"].Fragment,null,a["default"].createElement("h2",null,"\u63a7\u5236"),a["default"].createElement("div",null,o),a["default"].createElement("button",{onClick:m,type:"button"},"\u5f00\u59cb"),a["default"].createElement("button",{onClick:p,type:"button"},"\u6682\u505c"),a["default"].createElement("button",{onClick:h,type:"button"},"\u91cd\u7f6e"),a["default"].createElement(f["default"],{language:"javascript",style:c["default"]},'import React, { useState, useEffect, useMemo } from "react";\nimport CountDown from "countdown-pro";\nimport { format } from "countdown-pro/lib/util";\n\nconst defaultTime = 10 * 1000;\n\nfunction formatTime(timestamp) {\n  return format(timestamp, "ss:SSS");\n}\n\nexport default () => {\n  const [time, setTime] = useState(() => formatTime(defaultTime));\n\n  const countdown = useMemo(() => new CountDown({\n    time: defaultTime,\n    format: formatTime,\n    interval: 30,\n    onChange: setTime,\n    onEnd: () => {\n      console.log(\'\u5012\u8ba1\u65f6\u7ed3\u675f!\');\n    }\n  }), []);\n\n  useEffect(() => () => countdown.pause(), []);\n\n  const handleStart = useCallback(() => {\n    countdown.start();\n  }, []);\n\n  const handlePause = useCallback(() => {\n    countdown.pause();\n  }, []);\n\n  const handleReset = useCallback(() => {\n    countdown.reset();\n  }, []);\n\n  return (\n    <>\n      <div>{time}</div>\n      <button onClick={handleStart}>\u5f00\u59cb</button>\n      <button onClick={handlePause}>\u6682\u505c</button>\n      <button onClick={handleReset}>\u91cd\u7f6e</button>\n    </>\n  )\n}'))};t["default"]=m}});