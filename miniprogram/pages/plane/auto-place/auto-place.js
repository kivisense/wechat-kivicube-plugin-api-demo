import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });
  },

  async ready({ detail: view }) {
    this.view = view;
    this.skipCloudar = view.sceneInfo.setting.skipScanMarker;
  },

  cloudarStart() {
    console.log(`cloudarStart`, this.skipCloudar);
    if (!this.skipCloudar) {
      console.log("场景配置跳过了云识别");
    }
  },

  cloudarEnd() {
    console.log(`cloudarEnd`);
  },

  // 平面检测开始
  planeDetectStart() {
    wx.hideLoading();
    console.log(`planeDetectStart`);
  },

  // 平面检测结束
  planeDetectEnd() {
    console.log(`planeDetectEnd`);
  },

  // 自动放置，尝试定位场景, 可能触发多次
  tryLocateScene() {
    console.log(`tryLocateScene`);
  },

  async sceneStart() {
    console.log(`sceneStart`);
  },

  unsupport({ detail }) {
    console.log(detail.isUnsupportVerticalPlane); // 当前设备不支持竖直面能力。
    console.log(detail.isUnsupportV2); // 当前设备不支持平面v2版本。
    console.log(detail.isUnsupportV1); // 当前设备不支持平面v1版本。

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
