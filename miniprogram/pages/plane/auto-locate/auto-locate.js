import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });
  },

  async ready({ detail: view }) {
    // 和页面../indicator/indicator保持一致，因为都是平面AR类型
    this.view = view;
    this.skipCloudar = view.sceneInfo.setting.skipScanMarker;
  },

  // 和页面../indicator/indicator保持一致，因为都是平面AR类型
  cloudarStart({ detail }) {
    console.log(`cloudarStart`, this.skipCloudar);
    if (!this.skipCloudar) {
      console.log("场景配置跳过了云识别");
    }
  },

  // 和页面../indicator/indicator保持一致，因为都是平面AR类型
  cloudarEnd({ detail }) {
    console.log(`cloudarEnd`);
  },

  // 和页面../indicator/indicator保持一致，因为都是平面AR类型
  planeDetectStart({ detail }) {
    wx.hideLoading();
    console.log(`planeDetectStart`);
  },

  // 和页面../indicator/indicator保持一致，因为都是平面AR类型
  planeDetectEnd({ detail }) {
    console.log(`planeDetectEnd`);
  },

  // 自动放置，尝试放置场景, 可能触发多次，直到成功。
  tryLocateScene({ detail }) {
    console.log(`tryLocateScene`);
    const { cancelLocateScene, result, nextLocateSceneDelayTime } = detail;
    // result：是否放置成功
    if (result) {
      console.log("场景自动放置成功");
    } else {
      // 如果不成功，可设置下次尝试放置的延时时间，毫秒，不设置时默认100ms。
      nextLocateSceneDelayTime(200);
    }
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
