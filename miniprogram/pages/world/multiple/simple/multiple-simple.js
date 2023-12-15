import {
  errorHandler,
  showAuthModal,
  downloadMarker,
} from "../../../../utils/helper";

const marker1ImageUrl =
  "https://meta.kivisense.com/kivicube-wechat-mp-plugin/demo-assets/image/kivi-test1.jpeg";
const marker2ImageUrl =
  "https://meta.kivisense.com/kivicube-wechat-mp-plugin/demo-assets/image/kivi-test2.jpeg";

Page({
  data: {},

  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });

    this.downloadAsset = Promise.all([
      downloadMarker(marker1ImageUrl), // 下载 marker1
      downloadMarker(marker2ImageUrl), // 下载 marker2
    ]);
  },

  async ready({ detail: view }) {
    this.view = view;
    this.addMarker();
    wx.hideLoading();
  },

  loadSceneEnd() {},

  async sceneStart() {
    try {
      const view = this.view;
      const markerAr = view.getMarkerAR();

      // 当前是否追踪到某张识别图
      console.log(`isTracked: ${markerAr.isTracked()}`);
    } catch (e) {
      errorHandler(e);
    }
  },

  anchored({ detail }) {
    const { markerId } = detail;
    console.log("anchored", markerId);

    // 在锚定到某个marker的时候，先隐藏所有的模型，在识别到我们需要的marker时，将特定的模型展示出来，并播放模型动画。
    const [markerId1, markerId2] = this.markerIds;
    this.hideAllObject();

    const showObjPlayAnimation = (objName, animationConfig) => {
      const obj = this.view.getObject(objName);
      obj.visible = true;
      obj.playAnimation(animationConfig);
    };

    switch (markerId) {
      case markerId1:
        showObjPlayAnimation("rabbit", { animationName: "ani", loop: true });
        break;

      case markerId2:
        showObjPlayAnimation("robot", { animationName: "Dance", loop: true });
        break;

      // 默认的 id 则为平台配置的marker
      default:
        showObjPlayAnimation("skateboarder", {
          animationName: "walk",
          loop: true,
        });
        break;
    }
  },

  async addMarker() {
    try {
      const view = this.view;

      const [markerPath1, markerPath2] = await this.downloadAsset;

      /**
       * 配置识别图。可配置多张。
       * @params markerPath {String|Array<String>} - 识别图本地路径。注意：只支持在wx.env.USER_DATA_PATH文件夹中的识别图。
       * @returns {Promsie<Number|Array<Number>>} 识别图Id
       */
      const markerAr = view.getMarkerAR();
      this.markerIds = await markerAr.setMarker([markerPath1, markerPath2]);

      console.warn("setMarker 返回的识别图ID：", this.markerIds);

      // 如果只用作首次定位，用完后可移除marker
      // markerAr.removeMarker(markerId);
    } catch (error) {
      console.error(error);
    }
  },

  hideAllObject() {
    this.view.sceneInfo.objects.forEach(({ name }) => {
      const obj = this.view.getObject(name);
      if (obj.isBaseObject) {
        obj.visible = false;
      }
    });
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
