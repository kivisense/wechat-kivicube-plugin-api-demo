import {
  errorHandler,
  showAuthModal,
  downloadFile,
} from "../../../utils/helper";

Page({
  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });

    this.downloadAsset = downloadFile(
      "https://meta.kivisense.com/kivicube-slam-mp-plugin/demo-assets/video/glow.mp4"
    );
  },

  async ready({ detail: view }) {
    this.view = view;

    const alphaVideoPath = await this.downloadAsset;
    const alphaVideo3d = await view.createAlphaVideo(alphaVideoPath);

    alphaVideo3d.position.x = 0;
    alphaVideo3d.position.y = 0;
    // 必须负值，才能看见。视作深度
    // alphaVideo3d.position.z = -5;
    alphaVideo3d.position.z = -1;
    alphaVideo3d.scale.setScalar(0.25);
    alphaVideo3d.loop = true;
    alphaVideo3d.videoContext.play();

    // 使视频始终最上层显示， 取消渲染时的深度测试和材质对深度缓冲区的影响
    const recursive = true; // 是否同时设置所有子节点。默认为false
    alphaVideo3d.setGLState("depthTest", false, recursive);
    alphaVideo3d.setGLState("depthWrite", false, recursive);

    // 增加在camera节点下，使其相对屏幕位置呈现。
    view.defaultCamera.add(alphaVideo3d);
  },

  loadSceneEnd() {
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
