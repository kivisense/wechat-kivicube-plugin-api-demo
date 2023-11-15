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
     * @param anisotropy 沿着轴，通过具有最高纹素密度的像素的样本数，同 Three.Texture.anisotropy
     * @param mapType 材质类型，默认为 "map"
     * @param recursive  是否递归，默认为 false
     */
    this.model.setAnisotropy(8, "map", true);
  },
  resetAnisotropy() {
    this.model.setAnisotropy(1, "map", true);
  },
});
