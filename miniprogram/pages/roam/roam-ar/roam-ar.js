import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  data: {
    showTips: false,
  },
  onLoad() {},

  async ready({ detail: view }) {
    this.view = view;
  },
  locateDeviceStart() {
    /**
     * 漫游AR运行前，需要用户设备进行移动来激活，激活后才会将AR场景显示出来
     */
    console.log(`locateDeviceStart`);
    this.setData({
      showTips: true,
    });
  },
  locateDeviceEnd() {
    console.log(`locateDeviceEnd`);
    this.setData({
      showTips: false,
    });
  },
  async sceneStart() {
    wx.hideLoading();
  },

  error({ detail }) {
    wx.hideLoading();
    // 判定是否camera权限问题，是则向用户申请权限。
    if (detail?.isCameraAuthDenied) {
      showAuthModal(this);
    } else {
      errorHandler(detail);
    }
  },
});
