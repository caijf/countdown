# CountDown

一个简单的倒计时。

[查看示例][site]

## 使用

**`npm` 或 `yarn` 安装**

```shell
npm install countdown-pro
```

```shell
yarn add countdown-pro
```

**浏览器引入**

在浏览器中使用 `script` 标签直接引入文件，并使用全局变量 `CountDown` 。

- 该仓库的 [dist](https://github.com/caijf/countdown/tree/master/dist) 目录下提供了 `countdown.js` 以及 `countdown.min.js`。
- `npm` 包的 `countdown-pro/dist` 目录下也提供了 `countdown.js` 以及 `countdown.min.js`。
- 你也可以通过 [UNPKG](https://unpkg.com/countdown-pro@latest/dist/) 进行下载。

## 示例

```javascript
import CountDown from 'countdown-pro';

const countdown = new CountDown({
  time: 60 * 1000,
  format: time => time/1000,
  onChange: time => {
    console.log(time);
  },
  onEnd: () => {
    console.log("结束");
  }
});

countdown.start();
```

## 配置项

参数 | 说明 | 类型 | 必填 | 默认值
------------- | ------------- | ------------- | ------------- | -------------
time  | 倒计时，单位毫秒  | `number` | `Y`  | `0`
interval | 时间间隔，单位毫秒 | `number` | - | `1000`
format | 时间格式化，用于格式化 `onChange` 回调数据。必须要有返回值 `(timestamp)=>any` | `function` | - | -
onChange | 时间变化时触发 `(time)=>void` | `function` | - | -
onEnd | 倒计时结束时触发 | `function` | - | -

## 实例方法

方法名 | 说明 
------------- | ------------- 
start | 开始倒计时
pause | 暂停倒计时
reset | 重设倒计时

---

## 格式化工具方法 `countdown-pro/lib/util`

### 使用

```javascript
import { format, padZero, parseTimeData, parseFormat } from 'countdown-pro/lib/util';
```

如果在浏览器中使用 `script` 标签直接引入文件，可使用全局变量 `countdownUtil` 。 

### format(timestamp, formatStr='HH:mm:ss')

> 格式化时间，返回格式化后的时间字符串

```javascript
format(2*60*60*1000);
// => "02:00:00"

format(2*60*60*1000, 'mm:ss');
// => "120:00"
```

参数 | 说明 | 类型 | 必填 | 默认值
------------- | ------------- | ------------- | ------------- | -------------
timestamp  | 时间戳，单位毫秒  | `number` | `Y`  | -
formatStr | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | `string` | - | `HH:mm:ss`

### padZero(num, targetLength=2)

> 前置补零，返回补零后的值

```javascript
padZero(2);
// => "02"
```

### parseTimeData(timestamp)

> 解析时间戳，返回的时间格式 `timeData`

```typescript
interface TimeData {
  days: number; // 天数
  hours: number; // 小时
  minutes: number; // 分钟
  seconds: number; // 秒数
  milliseconds: number; // 毫秒
}
```

```javascript
parseTimeData(2*60*60*1000);
// => {days: 0, hours: 2, minutes: 0, seconds: 0, milliseconds: 0}
```

### parseFormat(formatStr, timeData)

> 格式化时间格式 `timeData`

```javascript
parseFormat('mm:ss', {days: 0, hours: 2, minutes: 0, seconds: 0, milliseconds: 0});
// => "120:00"
```

[site]: https://caijf.github.io/countdown/site/