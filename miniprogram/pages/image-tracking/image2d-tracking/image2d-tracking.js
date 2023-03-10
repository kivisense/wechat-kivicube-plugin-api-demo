// 去除图像追踪功能水印的license
// 必须在打开场景之前设置好license，否则就会出现水印。

Page({
  data: {
    license: getApp().globalData.license,
    showTip: true,
  },
  tracked() {
    this.setData({ showTip: false });
  },
  lostTrack() {
    this.setData({ showTip: true });
  },
});
