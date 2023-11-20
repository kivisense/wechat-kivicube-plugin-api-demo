import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  data: {
    showScan: false,
    showStartTips: false,
    showPlaneTips: false,
    hidePlaneDetect: true, // * 隐藏默认扫描平面提示语
  },
  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });
  },

  async ready({ detail: view }) {
    /**
     * 可通过 view.isV1() / view.isV2() 方法判断当前场景使用哪个版本算法在检测平面
     *
     * V1/V2区别：
     * V1 适用于用户在平面场景下，例如桌面，地面，泛平面场景，放置虚拟物体，不提供真实世界距离。用户放置物体时，手机相机倾斜向下对着目标平面点击即可，具有广泛的机型支持
     * V2 提供真实物理距离的 ar 定位功能，提供平面识别功能，用户在平面范围点击放置虚拟物体的功能，具有有限的机型支持。安卓v2不支持竖直平面。**使用v2算法需要初始化，移动手机进行左右平移初始化效果最佳。**
     * 可通过 kivicube 平台来配置降级策略
     */
    this.view = view;
    this.mode = view.sceneInfo.mode;
    this.gyroscope = view.sceneInfo.setting.gyroscope;
    this.skipCloudar = view.sceneInfo.setting.skipScanMarker;
  },

  cloudarStart({ detail }) {
    console.log(`cloudarStart`, this.skipCloudar);

    /*
    插件 >=2.8.6支持
    const { collectionId, sceneId, preventCloudar } = detail;
    // 可在符合某个条件时，禁止云识别功能开启，相当于跳过云识别步骤。
    if (sceneId !== 'some scene id') {
      preventCloudar();
    }
    */

    if (!this.skipCloudar) {
      this.setData({
        showScan: true,
      });
    }
  },

  cloudarEnd({ detail }) {
    console.log(`cloudarEnd`);

    /*
    插件 >=2.8.6支持
    const {
      result, // result为云识别结果，跳过云识别时，返回true，否则为场景id
      sceneId,
      pausePlaneDetect, // 详细使用见planeDetectStart方法中说明
      resumePlaneDetect,
    } = detail;
    */

    this.setData({
      showScan: false,
    });
  },

  // 平面检测开始
  planeDetectStart({ detail }) {
    wx.hideLoading();
    console.log(`planeDetectStart`);

    const {
      cancelLocateScene,
      pausePlaneDetect,
      resumePlaneDetect,
    } = detail;

    /**
     * 等待一段事件后再开始检测平面，可以显示一些提示，来引导用户对准水平面
     */
    // 暂停平面检测
    pausePlaneDetect();
    // 显示提示
    this.setData({
      showStartTips: true,
      showPlaneTips: false,
    });
    setTimeout(() => {
      // 恢复平面检测
      resumePlaneDetect();
      this.setData({
        showStartTips: false,
        showPlaneTips: true,
      });
    }, 2000);
  },

  // 平面检测结束
  planeDetectEnd({ detail }) {
    console.log(`planeDetectEnd`);

    const {
      cancelLocateScene,
    } = detail;

    this.setData({
      showScan: false,
      showStartTips: false,
      showPlaneTips: false,
    });
  },

  // 指示器放置，显示指示器
  indicatorVisible({ detail }) {
    console.log(`indicatorVisible`);
    const { indicator, locateScene } = detail;
    /*
      可以拿到指示器素材对象，进行自定义操作。
      比如增加自己的一些个性内容:
      const imageAb = await requestFile('https://your-domain.com/path/to/image.jpg');
      const image = await this.view.createImage(imageAb);
      indicator.add(image);
      或其他任何素材相关的可用操作
    */

    /**
     * locateScene方法用来尝试放置场景，让应用层，可以自行决定何时放置场景。而不是一定要在点击之后。
     *
     * 比如3s后自动放置。注意：执行了也不一定就放置成功，只是尝试。后续支持放置结果返回
     * setTimeout(locateScene, 3000);
     */
  },

  // 指示器放置，隐藏指示器
  indicatorInvisible({ detail }) {
    // 指示器不可见时，也可以拿到指示器对象，做出需要的操作。
    const { indicator } = detail;
    console.log(`indicatorInvisible`);
  },

  // 点击组件，进行放置时触发的事件
  touchLocate({ detail }) {
    console.log(`touchLocate`);
    const { indicator, preventLocateScene, touches: [{ pageX, pageY }] } = detail;
    // 使符合某些条件时，阻止掉此次放置。
    if (pageX < 10 && pageY < 10) {
      preventLocateScene();
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
