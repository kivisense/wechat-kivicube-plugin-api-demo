import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });
  },

  async ready({ detail: view }) {
    this.view = view;
  },

  planeDetectStart() {
    wx.hideLoading();
  },

  async sceneStart() {
    const view = this.view;
    try {
      const video3d = view.getObject("slam");
      video3d.position.set(0, 0, 0);
      video3d.scale.setScalar(0.25);

      let isVisible = false;
      let timer = null;
      /**
       * 注意：
       * 此方法暂不适用带骨骼动画的模型，带骨骼动画的模型未出现在相机画面内，也会执行onBeforeRender
       */
      video3d.onBeforeRender = () => {
        console.log(`onBeforeRender`, isVisible);
        if (isVisible) {
          clearTimeout(timer);

          timer = setTimeout(() => {
            isVisible = false;
            wx.showToast({
              title: "视频未在相机画面内",
              icon: "none",
            });
          }, 500);
        } else {
          wx.showToast({
            title: "视频出现在相机画面内",
            icon: "none",
          });
          isVisible = true;
        }
      };
    } catch (e) {
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
});
