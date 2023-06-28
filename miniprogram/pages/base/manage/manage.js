import {
  errorHandler,
  requestFile,
  downloadFile,
  degToRad,
} from "../../../utils/helper";

const progress = (p) => console.log(p);

/**
 * 注意1：只能在loadSceneEnd及之后的事件触发后，才能通过view.getObject获取到素材对象。
 *
 * 注意2：如果要在合辑中动态增加场景内容，请参考README.md之中的“常见问题”说明。
 */
Page({
  data: {
    showOperate: false,
  },
  ready({ detail: view }) {
    /**
     * 注意：这里的view必须是kivicube-scene组件的高级API对象view，
     * 而不能是kivicube-collection组件通过ready事件传递的高级API对象collection，
     * 详细请参考README.md之中的“常见问题”说明。
     */
    this.view = view;
    this.view.skipCloudar();
  },

  sceneStart() {
    this.setData({ showOperate: true });
  },

  async addImage() {
    wx.showLoading({ title: "下载中...", mask: true });
    try {
      const imageAb = await requestFile(
        "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/image.jpg"
      );
      const image = await this.view.createImage(imageAb, progress);

      this.view.add(image);

      image.position.set(0, 1, 0);
      image.rotation.set(0, 0, 0);
      image.scale.setScalar(0.5);

      image.onBeforeRender = () => {
        image.rotation.y += 0.01;
      };

      this.image = image;

      wx.hideLoading();
    } catch (e) {
      wx.hideLoading();
      errorHandler(e);
    }
  },

  async addVideo() {
    wx.showLoading({ title: "下载中...", mask: true });
    try {
      // 既支持下载为本地文件路径，也支持直接使用url。
      const videoUrlOrPath = await downloadFile(
        "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/video.mp4"
      );
      const defaultThumbnailUrl = ""; // 如果视频显示不出来，则显示默认的缩略图。传递为空则不显示缩略图。
      const video = await this.view.createVideo(
        videoUrlOrPath, // 如果想视频边下边播，在线播放。这里直接输入视频URL地址即可(不需要预先下载下来)。
        defaultThumbnailUrl,
        progress
      );

      this.view.add(video);

      video.position.set(0, -1, 0);
      video.rotation.set(0, 0, 0);
      video.scale.setScalar(0.5);

      video.loop = true;
      video.videoContext.play();

      this.video = video;

      wx.hideLoading();
    } catch (e) {
      wx.hideLoading();
      errorHandler(e);
    }
  },

  async addAlphaVideo() {
    wx.showLoading({ title: "下载中...", mask: true });
    try {
      // 既支持下载为本地文件路径，也支持直接使用url。
      const videoUrlOrPath = await downloadFile(
        "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/alpha-video.mp4"
      );
      const defaultThumbnailUrl = ""; // 如果视频显示不出来，则显示默认的缩略图。传递为空则不显示缩略图。
      const video = await this.view.createAlphaVideo(
        videoUrlOrPath,
        defaultThumbnailUrl,
        progress
      );

      this.view.add(video);

      video.position.set(2, -1, 0);
      video.rotation.set(0, Math.PI / -4, 0);
      video.scale.setScalar(1);

      video.loop = true;

      video.videoContext.play();

      this.alphaVideo = video;

      wx.hideLoading();
    } catch (e) {
      wx.hideLoading();
      errorHandler(e);
    }
  },

  async addModel() {
    wx.showLoading({ title: "下载中...", mask: true });
    try {
      const modelUrl =
        "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/model.glb";
      const modelAb = await requestFile(modelUrl);
      // 如果模型是gltf格式，则必须传递第二个参数。否则可为空
      const model = await this.view.createGltfModel(modelAb, progress);

      const useDefaultEnvMap = true; // 默认使用场景中配置的环境贴图， 如果为 false 则不使用环境贴图

      this.view.add(model, useDefaultEnvMap);

      const rotY = degToRad(-45); // -45度 转化为弧度制

      model.position.set(0, 0, 0);
      model.rotation.set(0, rotY, 0); // 旋转设置 x, y, z 三个方向的旋转，使用的是弧度制
      // model.rotation.set(0, Math.PI / -4, 0); // 旋转设置 x, y, z 三个方向的旋转，使用的是弧度制
      model.scale.setScalar(0.5);

      const [name] = model.getAnimationNames();
      model.playAnimation({
        animationName: name,
        loop: true,
      });

      this.model = model;

      wx.hideLoading();
    } catch (e) {
      wx.hideLoading();
      errorHandler(e);
    }
  },

  async addAudio() {
    wx.showLoading({ title: "下载中...", mask: true });
    try {
      // 既支持下载为本地文件路径，也支持直接使用url。
      const audioUrlOrPath = await downloadFile(
        "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/audio.mp3"
      );
      const audio = await this.view.createAudio(audioUrlOrPath, progress);
      this.view.add(audio);

      audio.loop = true;
      audio.play();

      this.audio = audio;

      wx.hideLoading();
    } catch (e) {
      wx.hideLoading();
      errorHandler(e);
    }
  },

  removeImage() {
    if (this.image) {
      this.view.remove(this.image);
      this.image = null;
    }
  },

  removeVideo() {
    if (this.video) {
      this.view.remove(this.video);
      this.video = null;
    }
  },

  removeAlphaVideo() {
    if (this.alphaVideo) {
      this.view.remove(this.alphaVideo);
      this.alphaVideo = null;
    }
  },

  removeModel() {
    if (this.model) {
      this.view.remove(this.model);
      this.model = null;
    }
  },

  removeAudio() {
    if (this.audio) {
      this.view.remove(this.audio);
      this.audio = null;
    }
  },

  clear() {
    this.view.clear();
  },
});
