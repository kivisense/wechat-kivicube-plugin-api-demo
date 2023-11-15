import {
  errorHandler,
  showAuthModal,
  requestFile,
} from "../../../utils/helper";

Page({
  data: {
    toneMapping: "NoToneMapping",
  },
  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });

    this.downloadAsset = requestFile(
      "https://meta.kivisense.com/kivicube-slam-mp-plugin/demo-assets/model/damaged-helmet.glb"
    );
  },

  ready({ detail: view }) {
    this.view = view;
    console.log(`view`, view);
  },

  async sceneStart() {
    try {
      const view = this.view;

      const { name } = view.sceneInfo.objects[0];
      const originModel = view.getObject(name);
      originModel.visible = false;

      const modelArrayBuffer = await this.downloadAsset;
      const model = await view.createGltfModel(modelArrayBuffer);

      view.add(model);

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
    this.view.setToneMapping(this.view.constants[type]);
  },
});
