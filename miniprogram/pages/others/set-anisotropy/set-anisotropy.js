import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  data: {},

  onLoad() {
    wx.showLoading({ title: "初始化中..." });
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
    const { name } = view.sceneInfo.objects[0];
    const model = view.getObject(name);

    // 调整模型位置即大小，方便观察各向异性效果
    model.scale.setScalar(0.09);
    model.rotation.set(-Math.PI / 2 + 0.65, 0, 0);

    this.model = model;

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
  setAnisotropy() {
    /**
     * @param anisotropy 设置一个较高的值将会产生比基本的mipmap更清晰的效果，代价是需要使用更多纹理样本。这个值通常是2的幂。
     * @param mapType 材质类型，默认为 "map"
     * @param recursive  是否递归，默认为 false
     */
    this.model.setAnisotropy(8, "map", true);
  },
  resetAnisotropy() {
    this.model.setAnisotropy(1, "map", true);
  },
});
