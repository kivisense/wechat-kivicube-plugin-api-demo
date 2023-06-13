import {
  errorHandler,
  showAuthModal,
  requestFile,
} from "../../../utils/helper";

Page({
  data: {},

  onLoad() {
    wx.showLoading({ title: "初始化中..." });
    this.downloadAsset = requestFile(
      "https://meta.kivisense.com/kivicube-slam-mp-plugin/demo-assets/image/panorama.jpg"
    );
  },

  ready({ detail: view }) {
    try {
      this.view = view;
    } catch (e) {
      wx.hideLoading();
      errorHandler(e);
    }
  },

  async sceneStart() {
    const view = this.view;
    const panoArrayBuffer = await this.downloadAsset;

    /**
     * @param {ArrayBuffer | String } urlOrAb - 全景图的arraybuffer数据或者url地址
     * @param {Number} [sgments=56] - 全景图的分段，数值越高精度越高，全景图如果看着有扭曲现象（不是畸变）可以适度调高此精度
     * @param {Function} [onProgress] - 全景图加载进度回调函数
     * **/
    const panorama = await view.createPanorama(panoArrayBuffer);

    view.add(panorama);

    panorama.scale.set(100, 100, 100);

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
