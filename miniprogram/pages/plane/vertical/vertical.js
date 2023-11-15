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

    /**
     * 屏幕检测V1V2区别：
     * V1寻找平面快，并且平面是很大的，并且容易被带偏
     * V2寻找平面慢，平面大小有限
     *
     * 可通过 view.isV1() / view.isV2() 方法判断当前场景使用哪种方式检测平面
     *
     * 竖直面目前只有 ios + v2 才支持，android V2 默认自动降级为水平面，或在kivicube中配置场景的降级策略
     *
     */

    console.log(`planeDetectStart`);
  },

  // 平面检测结束
  planeDetectEnd() {
    console.log(`planeDetectEnd`);
  },

  // 指示器放置，显示指示器
  indicatorVisible() {
    console.log(`indicatorVisible`);
  },

  // 指示器放置，隐藏指示器
  indicatorInvisible() {
    console.log(`indicatorInvisible`);
  },

  // 点击屏幕时放置的事件，点击定位, 放置
  touchLocate() {
    console.log(`touchLocate`);
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
