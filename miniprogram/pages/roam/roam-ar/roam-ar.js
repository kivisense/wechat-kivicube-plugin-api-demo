import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  data: {
    showTips: false,
  },

  async ready({ detail: view }) {
    this.view = view;
    /**
     * 可通过 view.isV1() / view.isV2() 方法判断当前漫游能力，由哪个版本算法驱动。
     */
  },

  locateDeviceStart() {
    /**
     * 漫游AR运行前，需要晃动用户设备来初始化，定位手机设备所在位置，初始化成功后才会将AR场景显示出来
     */
    console.log(`locateDeviceStart`);
    this.setData({
      showTips: true,
    });
  },

  locateDeviceEnd() {
    /**
     * 此事件触发，证明初始化成功，可开始体验漫游功能
     */
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
