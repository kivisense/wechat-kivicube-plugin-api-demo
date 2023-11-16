import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  data: {
    showTips: false,
  },
  onLoad() {},

  async ready({ detail: view }) {
    this.view = view;

    /**
     * 可通过 view.isV1() / view.isV2() 方法判断当前场景使用哪种方式检测平面
     *
     * V1V2区别：
     * V1 适用于用户在平面场景下，例如桌面，地面，泛平面场景，放置虚拟物体，不提供真实世界距离。用户放置物体时，手机相机倾斜向下对着目标平面点击即可，具有广泛的机型支持
     * V2 提供真实物理距离的 ar 定位功能，提供平面识别功能，用户在平面范围点击放置虚拟物体的功能，具有有限的机型支持。安卓v2不支持竖直平面。
     * 使用v2算法需要初始化，移动手机进行左右平移初始化效果最佳。
     *
     */

    console.log(view.isV1());
    console.log(view.isV2());
  },
  locateDeviceStart() {
    /**
     * 漫游AR运行前，需要用户设备进行手机进行左右平移来初始化，初始化成功后才会将AR场景显示出来
     */
    console.log(`locateDeviceStart`);
    this.setData({
      showTips: true,
    });
  },
  locateDeviceEnd() {
    console.log(`locateDeviceEnd`);
    this.setData({
      showTips: false,
    });
  },
  async sceneStart() {
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
