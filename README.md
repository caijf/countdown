# CountDown

一个简单的倒计时。

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

- 该仓库的 [dist](https://github.com/caijf/countdown/tree/master/dist) 目录下也提供了 `countdown.js` 以及 `countdown.min.js`。
- `npm` 包的 `countdown-pro/dist` 目录下提供了 `countdown.js` 以及 `countdown.min.js`。
- 你也可以通过 [UNPKG](https://unpkg.com/countdown-pros@latest/dist/) 进行下载。

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
