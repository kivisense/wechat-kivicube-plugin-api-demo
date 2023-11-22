import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  data: {
    toneMapping: "NoToneMapping",
  },
  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });
  },

  ready({ detail: view }) {
    this.view = view;
    console.log(`view`, view);
  },

  async sceneStart() {
    try {
      wx.hideLoading();
    } catch (e) {
      wx.hideLoading();
      errorHandler(e);
    }
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

  change(e) {
    const type = e.target.dataset.type;
    this.setData({
      toneMapping: type,
    });
    // 产品上开启色调映射后，默认是使用ACESFilmicToneMapping
    // 如果需要其他类型，可调用此API设置。
    this.view.setToneMapping(this.view.constants[type]);
  },
});
