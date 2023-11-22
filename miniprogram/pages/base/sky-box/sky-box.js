import {
  errorHandler,
  showAuthModal,
  requestFile,
} from "../../../utils/helper";

Page({
  data: {},

  onLoad() {
    wx.showLoading({ title: "初始化中..." });
  },
  ready({ detail: view }) {
    this.view = view;
  },

  async sceneStart() {
    const view = this.view;
    try {
      const cubeImageUrl =
        "https://meta.kivisense.com/kivicube-wechat-mp-plugin/demo-assets/image/skybox";
      const cubeImages = ["px", "nx", "py", "ny", "pz", "nz"];
      const cubePromises = cubeImages.map((image) =>
        requestFile(`${cubeImageUrl}/${image}.jpg`)
      );

      const [px, nx, py, ny, pz, nz] = await Promise.all([...cubePromises]);

      const config = { px, nx, py, ny, pz, nz };

      /**
       * 增加天空盒对象
       * @param {Object} config - 6张天空盒图片的配置对象，包含6张图的内容。
       * @param {Boolean} [background=true] - 是否显示为背景，不论模型放置离相机多远，天空盒始终在模型背后作为背景显示
       * @param {Function} [progress=()=>{}] - 加载进度
       * @returns {Promise<THREE.Mesh>}
       */
      const skybox = await view.createSkyBox(config);

      /**
       * <将天空盒做为整个场景的背景>
       * 调用createSkyBox时，background属性使用默认值true，
       * 再使用defaultCamera.add放入天空盒，就可让天空盒作为背景存在，不会遮挡住场景中的其他内容。
       */
      view.defaultCamera.add(skybox);

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
});
