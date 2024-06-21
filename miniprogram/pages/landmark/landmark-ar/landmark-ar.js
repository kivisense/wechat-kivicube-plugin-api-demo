import {
  errorHandler,
  showAuthModal,
} from "../../../utils/helper";

Page({
  data: {
  },

  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });
  },

  ready({ detail: view }) {
    this.view = view;
    wx.hideLoading();
  },

  // 扫描定位到
  located() {
    wx.showToast({
      title: '扫描定位到',
      icon: 'none',
    });
  },

  // 扫描定位丢失
  lostLocate() {
    wx.showToast({
      title: '扫描定位丢失',
      icon: 'none',
    });
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
