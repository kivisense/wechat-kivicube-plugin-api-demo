import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  data: {
    showScan: false,
    showStartTips: false,
    showPlanTips: false,
    hidePlaneDetect: true, // * 隐藏默认扫描平面提示语
  },
  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });
  },

  async ready({ detail: view }) {
    this.view = view;
    this.mode = view.sceneInfo.mode;
    this.gyroscope = view.sceneInfo.setting.gyroscope;
    this.skipCloudar = view.sceneInfo.setting.skipScanMarker;
  },

  cloudarStart() {
    console.log(`cloudarStart`, this.skipCloudar);
    if (!this.skipCloudar) {
      this.setData({
        showScan: true,
      });
    }
  },

  cloudarEnd() {
    console.log(`cloudarEnd`);
    this.setData({
      showScan: false,
    });
  },

  // 平面检测开始
  planeDetectStart({ detail }) {
    wx.hideLoading();
    console.log(`planeDetectStart`);

    /**
     * 屏幕检测V1V2区别：
     * V1寻找平面快，并且平面是很大的，并且容易被带偏
     * V2寻找平面慢，平面大小有限
     *
     * 可通过 view.isV1() / view.isV2() 方法判断当前场景使用哪种方式检测平面
     */

    if (this.view.isV1?.()) {
      /**
       * V1 时等待一段事件后再开始检测平面，并显示一些提示引导用户对准水平面
       */
      // 暂停平面检测
      detail.pausePlaneDetect();
      // 显示提示
      this.setData({
        showStartTips: true,
        showPlanTips: false,
      });
      setTimeout(() => {
        try {
          // 恢复平面检测
          detail.resumePlaneDetect();
          this.setData({
            showStartTips: false,
            showPlanTips: true,
          });
        } catch (error) {
          console.log(`error`, error);
        }
      }, 2000);
    } else {
      this.setData({
        showStartTips: false,
        showPlanTips: true,
      });
    }
  },

  // 平面检测结束
  planeDetectEnd() {
    console.log(`planeDetectEnd`);
    this.setData({
      showScan: false,
      showStartTips: false,
      showPlanTips: false,
    });
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
