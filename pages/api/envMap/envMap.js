import { errorHandler, requestFile } from "../../../utils/utils";

Page({
  data: {
    showOperate: false,
  },

  async onLoad() {
    try {
      // 小程序并不支持任意的图片分辨率，建议不要超过1024x1024。否则加载时会报错。
      this.downloadEnvMap = Promise.all([
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
      ]);

      const [nx, ny, nz, px, py, pz, panorama] = await this.downloadEnvMap;

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
      this.panoramaAb = panorama;
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
    const { name } = this.view.sceneInfo.objects[0];
    this.model = this.view.getObject(name);

    await this.downloadEnvMap;

    const progress = (p) => console.log(p);
    // 注意：插件版本 <= 1.3.4，generateEnvMapByCubeMap方法存在BUG不可用。
    this.cubeEnvMap = await this.view.generateEnvMapByCubeMap(
      this.cubeMapData,
      progress
    );
    this.panoramaEnvMap = await this.view.generateEnvMapByPanorama(
      this.panoramaAb,
      "jpg",
      progress
    );

    this.setData({ showOperate: true });
  },

  cubeMap() {
    this.model.useEnvMap(this.cubeEnvMap);
  },

  panorama() {
    this.model.useEnvMap(this.panoramaEnvMap);
  },

  remove() {
    this.model.useEnvMap(null);
  },
});
