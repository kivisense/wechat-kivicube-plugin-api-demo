import {
  errorHandler,
  showAuthModal,
  requestFile,
  downloadMarker,
} from "../../../utils/helper";

const markerImageUrl =
  "https://meta.kivisense.com/kivicube-wechat-mp-plugin/demo-assets/image/wonder.jpg";

Page({
  data: {
    showBtn: false,
  },
  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });

    this.downloadAsset = Promise.all([
      requestFile(
        "https://meta.kivisense.com/kivicube-wechat-mp-plugin/demo-assets/model/rabbit.glb"
      ),
      requestFile(markerImageUrl),
      downloadMarker(markerImageUrl), // 下载 marker
    ]);
  },

  async ready({ detail: view }) {
    this.view = view;

    wx.hideLoading();
  },

  async sceneStart() {
    try {
      const view = this.view;
      const markerAr = view.getMarkerAR();

      // 当前是否追踪到某张识别图
      console.log(`isTracked: ${markerAr.isTracked()}`);
      this.setData({
        showBtn: true,
      });
    } catch (e) {
      errorHandler(e);
    }
  },

  async addMarker() {
    wx.showLoading({ title: "加载中...", mask: true });
    try {
      const view = this.view;

      const [modelAb, imageAb, markerPath] = await this.downloadAsset;

      const [rabbitModel, imageModel] = await Promise.all([
        view.createGltfModel(modelAb),
        view.createImage(imageAb),
      ]);

      const group = view.createGroup();
      group.add(rabbitModel);
      group.add(imageModel);
      group.rotation.x = -Math.PI / 2;

      view.add(group);

      const markerAr = view.getMarkerAR();

      /**
       * 配置识别图。可配置多张。
       * @params markerPath {String|Array<String>} - 识别图本地路径。注意：只支持在wx.env.USER_DATA_PATH文件夹中的识别图。
       * @returns {Promsie<Number|Array<Number>>} 识别图Id
       */
      const markerIds = await markerAr.setMarker([markerPath]);

      console.warn("setMarker 返回的识别图ID：", markerIds);
      wx.hideLoading();

      // 如果只用作首次定位，用完后可移除marker
      // markerAr.removeMarker(markerId);
    } catch (error) {
      console.error(error);
    }
  },

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
