import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  data: {},

  onLoad() {
    wx.showLoading({ title: "初始化中..." });
  },

  ready({ detail: view }) {
    this.view = view;
  },

  async sceneStart() {
    const view = this.view;

    try {
      const panoramaVideoUrl =
        "https://meta.kivisense.com/kivicube-slam-mp-plugin/demo-assets/video/panorama-video.mp4";
      /**
       * @param {String} urlOrPath - 全景视频url地址或者小程序本地文件路径
       * @param {String} [defaultThumbnailUrl] - 全景视频的缩略图，用于不支持3d渲染视频的时候显示，为空则降级缩略图功能无效
       * @param {Number} [sgments=56] - 全景视频的分段数，数值越高精度越高，全景视频如果看着有扭曲现象（不是畸变）可以适度调高此精度
       * @param {Function} [onProgress] - 全景视频加载进度回调函数
       * **/
      const panoramaVideo = await view.createPanoramaVideo(panoramaVideoUrl);

      view.add(panoramaVideo);
      panoramaVideo.scale.set(100, 100, 100);

      panoramaVideo.videoContext.play();
      panoramaVideo.loop = true;

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
});
