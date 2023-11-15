import {
  errorHandler,
  showAuthModal,
  downloadFile,
} from "../../../utils/helper";

Page({
  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });

    this.downloadAsset = Promise.all([
      downloadFile(
        "https://meta.kivisense.com/kivicube-slam-mp-plugin/demo-assets/video/glow.mp4"
      ),
    ]);
  },

  async ready({ detail: view }) {
    this.view = view;

    const [alphaVideoPath] = await this.downloadAsset;
    const [alphaVideo3d] = await Promise.all([
      view.createAlphaVideo(alphaVideoPath),
    ]);

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

    this.alphaVideo3d = alphaVideo3d;
  },

  planeDetectStart() {
    wx.hideLoading();
  },

  async sceneStart() {
    const view = this.view;
    try {
      const { name } = view.sceneInfo.objects[0];
      const rabbitModel = view.getObject(name);

      // 增加在camera节点下，使其相对屏幕位置呈现。
      const camera = view.defaultCamera;
      camera.add(this.alphaVideo3d);

      let showModal = false;
      rabbitModel.onBeforeRender = () => {
        if (showModal) return;

        // 计算手机和3d模型之间的距离值。
        const distance = camera.position.distanceTo(rabbitModel.position);
        if (distance < 0.5) {
          showModal = true;
          wx.showModal({
            title: "提示",
            content: "你已靠近目标啦~",
            showCancel: false,
            complete() {
              // 避免闪现
              setTimeout(() => {
                showModal = false;
              }, 1000);
            },
          });
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
