// 去除图像追踪功能水印的license
// 必须在打开场景之前设置好license，否则就会出现水印。
// 当前图像识别功能需要使用小程序文件管理器, 请参照文档使用 setFileSystemManager 设置。

const { setFileSystemManager } = requirePlugin("kivicube");
setFileSystemManager(wx.getFileSystemManager(), wx.env.USER_DATA_PATH);

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
