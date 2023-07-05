import { errorHandler, requestFile } from "../../../utils/helper";

Page({
  data: {
    showOperate: false,
  },

  async onLoad() {
    try {
      wx.showLoading();

      // 小程序并不支持任意的图片分辨率，建议不要超过1024x1024。否则加载时会报错。
      this.downloadEnvMap = Promise.all([
        requestFile(
          "https://meta.kivisense.com/kivicube-slam-mp-plugin/demo-assets/model/damaged-helmet.glb"
        ),
        requestFile(
          "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/cube-map/nx.jpg"
        ),
        requestFile(
          "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/cube-map/ny.jpg"
        ),
        requestFile(
          "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/cube-map/nz.jpg"
        ),
        requestFile(
          "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/cube-map/px.jpg"
        ),
        requestFile(
          "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/cube-map/py.jpg"
        ),
        requestFile(
          "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/cube-map/pz.jpg"
        ),
        requestFile(
          "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/panorama-map/panorama.jpg"
        ),
        requestFile(
          "https://meta.kivisense.com/kivicube-slam-mp-plugin/demo-assets/hdr/default.hdr"
        ),
      ]);

      const [modelArrayBuffer, nx, ny, nz, px, py, pz, panoramaAb, hdrAb] =
        await this.downloadEnvMap;

      this.cubeMapData = {
        nx,
        ny,
        nz,
        px,
        py,
        pz,
        "nx-type": "jpg",
        "ny-type": "jpg",
        "nz-type": "jpg",
        "px-type": "jpg",
        "py-type": "jpg",
        "pz-type": "jpg",
      };
      this.modelAb = modelArrayBuffer;
      this.panoramaAb = panoramaAb;
      this.hdrAb = hdrAb;
    } catch (e) {
      errorHandler(e);
    }
  },

  ready({ detail: view }) {
    this.view = view;
    view.skipCloudar();
  },

  /**
   * 注意：只能在loadSceneEnd及之后的事件触发后，才能通过view.getObject获取到素材对象。
   */
  async sceneStart() {
    await this.downloadEnvMap;

    this.model = await this.view.createGltfModel(this.modelAb);
    const progress = (p) => console.log(p);
    // 注意：插件版本 <= 1.3.4，generateEnvMapByCubeMap方法存在BUG不可用。
    this.cubeEnvMap = await this.view.createEnvMapByCubeMap(
      this.cubeMapData,
      progress
    );

    this.panoramaEnvMap = await this.view.createEnvMapByPanorama(
      this.panoramaAb,
      progress
    );

    this.hdr = await this.view.createEnvMapByHDR(this.hdrAb, progress);

    const useDefaultEnvMap = true; // 默认使用场景中配置的环境贴图， 如果为 false 则不使用环境贴图

    this.view.add(this.model, useDefaultEnvMap);
    this.setData({ showOperate: true });
    wx.hideLoading();
  },

  useCubeMap() {
    this.model.useEnvMap(this.cubeEnvMap);
  },

  usePanorama() {
    this.model.useEnvMap(this.panoramaEnvMap);
  },

  useHDR() {
    this.model.useEnvMap(this.hdr);
  },

  remove() {
    this.model.useEnvMap(null);
  },
});
