# CountDown

[![npm][npm]][npm-url] ![npm](https://img.shields.io/npm/dt/countdown-pro) ![GitHub](https://img.shields.io/github/license/caijf/countdown.svg)

一个简单的倒计时。

[查看示例][site]

## 使用

**安装**

```shell
npm install countdown-pro
```

```shell
yarn add countdown-pro
```

```shell
pnpm add countdown-pro
```

**浏览器引入**

在浏览器中使用 `script` 标签直接引入文件，并使用全局变量 `CountDown` 。

- 该仓库的 [dist](https://github.com/caijf/countdown/tree/master/dist) 目录下提供了 `countdown.umd.js` 以及 `countdown.umd.min.js`。
- `npm` 包的 `countdown-pro/dist` 目录下也提供了 `countdown.umd.js` 以及 `countdown.umd.min.js`。
- 你也可以通过 [UNPKG](https://unpkg.com/countdown-pro@latest/dist/) 进行下载。

## 示例

```typescript
import CountDown from 'countdown-pro';

const countdown = new CountDown({
  time: 60 * 1000,
  interval: 1000,
  onChange(time) {
    console.log(time);
  },
  onEnd() {
    console.log('结束');
  }
});

countdown.start();
```

## 配置项

| 参数     | 说明               | 类型                            | 必填 | 默认值 |
| -------- | ------------------ | ------------------------------- | ---- | ------ |
| time     | 倒计时，单位毫秒   | `number`                        | `Y`  | `0`    |
| interval | 时间间隔，单位毫秒 | `number`                        | `N`  | `1000` |
| onChange | 每次时间间隔时触发 | `(currentTime: number) => void` | `N`  | -      |
| onEnd    | 倒计时结束时触发   | `() => void`                    | `N`  | -      |

## 实例方法

| 方法名        | 说明                                                               |
| ------------- | ------------------------------------------------------------------ |
| start         | 开始倒计时                                                         |
| pause         | 暂停倒计时                                                         |
| reset         | 重置倒计时                                                         |
| restart       | 重置再开始倒计时                                                   |
| updateOptions | 更新配置项。如果更新 `time` 需要调用 `reset` 或 `restart` 才生效。 |

## 静态方法

内置一些简单日期格式方法，通过 `CountDown.方法名` 直接调用。

### CountDown.format(timestamp, pattern='HH:mm:ss')

> 格式化时间，返回格式化后的时间字符串

```javascript
CountDown.format(2 * 60 * 60 * 1000); // "02:00:00"
CountDown.format(2 * 60 * 60 * 1000, 'mm:ss'); // "120:00"
```

| 参数      | 说明                                           | 类型     | 必填 | 默认值     |
| --------- | ---------------------------------------------- | -------- | ---- | ---------- |
| timestamp | 时间戳，单位毫秒                               | `number` | `Y`  | -          |
| pattern   | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | `string` | -    | `HH:mm:ss` |

### CountDown.padZero(num, targetLength=2)

> 前置补零，返回补零后的值

```javascript
CountDown.padZero(2); // "02"
```

### CountDown.parseTimeData(timestamp)

> 解析时间戳，返回的时间对象格式 `timeData`

```typescript
type TimeData = {
  days: number; // 天数
  hours: number; // 小时
  minutes: number; // 分钟
  seconds: number; // 秒数
  milliseconds: number; // 毫秒
};
```

```javascript
CountDown.parseTimeData(2 * 60 * 60 * 1000); // {days: 0, hours: 2, minutes: 0, seconds: 0, milliseconds: 0}
```

## 常见问题

### 如何解决误差？

> 参考：[延时比指定值更长的原因](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#%E5%BB%B6%E6%97%B6%E6%AF%94%E6%8C%87%E5%AE%9A%E5%80%BC%E6%9B%B4%E9%95%BF%E7%9A%84%E5%8E%9F%E5%9B%A0)

如果是应用于弱时效性的场景，可以忽略延时误差。如短信验证码重新发送倒计时。

如果是秒杀、抢购等强时效性的场景，通过服务器时间校对比较靠谱。可以监听页面可见或隐藏事件、固定间隔时间等方式获取最新的服务器时间，然后更新倒计时。

```typescript
const countdown = new Countdown({
  // ...
});

document.addEventListener('visibilityChange', function () {
  if (!document.hidden) {
    // 获取服务器时间
    // ...
    countdown.updateOptions({
      time: finalTime - serviceTime
    });
    countdown.restart();
  }
});

setInterval(() => {
  // 获取服务器时间
  // ...
  countdown.updateOptions({
    time: finalTime - serviceTime
  });
  countdown.restart();
}, 60 * 1000);
```

[site]: https://caijf.github.io/countdown/examples/
[npm]: https://img.shields.io/npm/v/countdown-pro.svg
[npm-url]: https://npmjs.com/package/countdown-pro
