import {
  errorHandler,
  showAuthModal,
  // downloadFile,
} from "../../../utils/helper";

Page({
  data: {
    showTip: true,
  },

  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });
  },

  ready({ detail: view }) {
    this.view = view;
    wx.hideLoading();
  },

  anchored({ detail }) {
    const { markerId } = detail;
    this.setData({ showTip: false });
  },

  anchoring({ detail }) {
    // 追踪到的识别图id，和匹配的追踪矩阵
    const { markerId, matrix } = detail;
  },

  // 设备不支持 世界AR 体验的提示事件
  unsupport({ detail }) {
    console.log(detail.isUnsupportWorld); // 不支持世界 AR 的设备
    console.log(detail.message);

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
