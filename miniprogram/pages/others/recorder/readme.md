# Kivicube AI录屏服务
## 1. 试用
https://github.com/kivisense/wechat-kivicube-plugin-api-demo/tree/master/miniprogram/pages/others/recorder

## 2. 定价
https://www.yuque.com/kivicube/manual/kivicube-features#AhcpJ

## 3. API
### 参数
**options**

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|----|----|-----|----|----|
|  duration  |  number  |  10000   | 否  | 视频录制的毫秒数，大于等于2000毫秒且不超过15000毫秒。如需录制更长时间的视频，请在企业VIP群反馈   |

**canvasConfig**

| 属性 | 类型     | 默认值 | 必填 | 说明        |
|---|--------|-----|----|-----------|
| recordDpr  | number | 2  | 否  | 录制时的设备像素比 |

### recorder初始化示例
```javascript
try {
  // 实例化视频录制对象
  this.recorder = this.view.createRecorder({
    canvasConfig: {
      // 录制时设备像素比倍数
      recordDpr: 1,
    },
    options: {
      // 录制时长, 如果调用了stop方法，录制会提前结束
      duration: 15 * 1000,
    },
  });
} catch (err) {
  console.log(err);
  wx.showToast({
    title: err.message,
    icon: "none"
  });
}
```
### 对象属性
`recorder.RecorderStatusEnum`

录制状态的常量对象(只读)

`recorder.leftTime`

录制的剩余时间(只读)

`recorder.status`

当前的录制状态(只读)

### 对象方法
`recorder.start()`

开始录制

`recorder.pause()`

暂停录制

`recorder.resume()`

恢复录制

`recorder.stop()`

结束录制

`recorder.cancel()`

取消录制

`recorder.destroy()`

销毁实例

`recorder.on(string eventName, function callback)`

注册监听录制事件的回调函数。当对应事件触发时，回调函数会被执行。

### 事件监听示例
```javascript
recorder.on("start", () => {
  console.log("recorder log: start 开始录制");
});

recorder.on("pause", () => {
  console.log("recorder log:  pause 暂停录制");
});

recorder.on("resume", () => {
  console.log("recorder log:  resume 恢复录制");
});

recorder.on("cancel", () => {
  console.log("recorder log:  cancel 取消录制");
});

recorder.on("stop", () => {
  console.log("recorder log: stop 停止录制");
});

recorder.on("end", (path) => {
  console.log("recorder log: end", path);
});

recorder.on("error", (error) => {
  console.log("recorder log: error", error);
});
```
