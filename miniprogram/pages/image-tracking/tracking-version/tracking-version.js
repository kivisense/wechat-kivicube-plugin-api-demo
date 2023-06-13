// 去除图像追踪功能水印的license
// 必须在打开场景之前设置好license，否则就会出现水印。

Page({
  data: {
    license: getApp().globalData.license,
    showTip: true,
    version: "tracking2", // 默认使用  tracking2 可选项： tracking1 | tracking2, tracking2 版本追踪稳定性更高，tracking1 可在 tracking2  版本兼容性不好的情况下，降级或者手动设置
  },
  tracked() {
    this.setData({ showTip: false });
  },
  lostTrack() {
    this.setData({ showTip: true });
  },
});
