import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  data: {
    sceneStarted: false,
    isGyroscope: false,
    switching: false,
  },

  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });
  },

  ready({ detail: view }) {
    this.view = view;
  },

  planeDetectStart() {
    wx.hideLoading();
  },

  sceneStart() {
    this.setData({ sceneStarted: true });
  },

  async enableForceGyroscope() {
    if (!this.view || this.data.switching || this.cancelForceGyroscope) {
      return;
    }

    this.setData({ switching: true });
    try {
      // 返回的函数用于关闭强制陀螺仪并恢复原平面模式。
      this.cancelForceGyroscope = await this.view.forceToGyroscope();
      this.setData({ isGyroscope: true });
    } catch (error) {
      errorHandler(error);
    } finally {
      this.setData({ switching: false });
    }
  },

  async disableForceGyroscope() {
    if (!this.cancelForceGyroscope || this.data.switching) {
      return;
    }

    this.setData({ switching: true });
    try {
      await this.cancelForceGyroscope();
      this.cancelForceGyroscope = null;
      this.setData({ isGyroscope: false });
    } catch (error) {
      errorHandler(error);
    } finally {
      this.setData({ switching: false });
    }
  },

  unsupport({ detail }) {
    wx.hideLoading();
    errorHandler(detail);
  },

  error({ detail }) {
    wx.hideLoading();
    if (detail?.isCameraAuthDenied) {
      showAuthModal(this);
    } else {
      errorHandler(detail);
    }
  },
});
