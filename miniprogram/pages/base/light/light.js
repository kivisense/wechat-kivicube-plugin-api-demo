import { errorHandler, showAuthModal } from "../../../utils/helper";

Page({
  data: {
    ambientIntensity: 0,
    directionalIntensityLeft: 0,
    directionalIntensityRight: 0,
    moreAmbientIntensity: 0,
    moreDirectionalIntensity: 0,
  },

  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });
  },

  ready({ detail: view }) {
    this.view = view;
  },

  async sceneStart() {
    try {
      const view = this.view;

      const { name } = this.view.sceneInfo.objects[0];
      const model = this.view.getObject(name);

      /**
       * 组件内部拥有默认的环境光和平行光，灯光颜色皆为白色，环境光强度为0.4，平行光强度为0.8。
       * 组件内部平行光有两个分别在左侧和右侧
       */
      const {
        defaultAmbientLight,
        defaultDirectionalLightLeft,
        defaultDirectionalLightRight,
      } = view;

      this.setData({
        ambientIntensity: defaultAmbientLight.intensity,
        directionalIntensityLeft: defaultDirectionalLightLeft.intensity,
        directionalIntensityRight: defaultDirectionalLightRight.intensity,
      });

      /**
       * 大部分情况下，对模型使用环境贴图和默认的环境光、平行光已经足够。
       * 如果确实有特殊情况，可以增加更多的灯光。
       * 注意：灯光不能增加太多，否则性能会严重受损。
       */

      /**
       * 创建一个环境光
       * @param {String|Integer} [color=0xffffff] - 指定颜色值，默认为白色。格式可为：0xff0000、'rgb(250, 0,0)'、'rgb(100%,0%,0%)'、'hsl(0, 100%, 50%)'、'#ff0000'、'#f00'、'red'
       * @param {Number} [intensity=1] - 灯光强度，默认为1。
       * @returns {AmbientLight}
       */
      const ambientLight = view.createAmbientLight(0xffffff, 1);
      view.add(ambientLight);

      /**
       * 创建一个平行光
       * @param {String|Integer} [color=0xffffff] - 指定颜色值，默认为白色。格式参考上方。
       * @param {Number} [intensity=1] - 灯光强度，默认为1。
       * @returns {DirectionalLight}
       */
      const directionalLight = view.createDirectionalLight(0xffffff, 2);

      directionalLight.position.set(0, 0, 1);
      directionalLight.target.position.set(0, 0, 0); // target对象position默认为0，0，0

      model.add(directionalLight);
      model.add(directionalLight.target);

      this.ambientLight = ambientLight;
      this.directionalLight = directionalLight;

      this.setData({
        moreAmbientIntensity: ambientLight.intensity,
        moreDirectionalIntensity: directionalLight.intensity,
      });

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

  ambientChange({ detail }) {
    const intensity = (+detail.value).toFixed(1);
    this.setData({ ambientIntensity: intensity });

    this.view.defaultAmbientLight.intensity = intensity;
  },

  directionalChange({ detail, currentTarget }) {
    const type = currentTarget.dataset.type;
    console.log(type);

    const intensity = (+detail.value).toFixed(1);

    if (type === "left") {
      this.setData({ directionalIntensityLeft: intensity });
      this.view.defaultDirectionalLightLeft.intensity = intensity;
    } else {
      this.setData({ directionalIntensityRight: intensity });
      this.view.defaultDirectionalLightRight.intensity = intensity;
    }
  },

  moreAmbientChange({ detail }) {
    const intensity = (+detail.value).toFixed(1);
    this.setData({ moreAmbientIntensity: intensity });

    this.ambientLight.intensity = intensity;
  },

  moreDirectionalChange({ detail }) {
    const intensity = (+detail.value).toFixed(1);
    this.setData({ moreDirectionalIntensity: intensity });

    this.directionalLight.intensity = intensity;
  },
});
