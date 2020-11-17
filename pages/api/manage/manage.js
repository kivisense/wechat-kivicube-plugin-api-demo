import { errorHandler, requestFile, downloadFile } from "../../../utils/utils";

const progress = (p) => console.log(p);

Page({
  data: {
    showOperate: false,
  },
  ready({ detail: view }) {
      this.view = view;
  },

  loadEnd() {
      setTimeout(() => {
          this.view.skipCloudar();
      }, 0);
  },

  async sceneStart() {
      this.setData({ showOperate: true });
  },

  async addImage() {
    wx.showLoading({ title: "下载中...", mask: true });
    try {
      const imageAb = await requestFile("https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/image.jpg");
      const image = await this.view.addImage(imageAb, "jpg", progress);

      image.position.set(0, 1, 0);
      image.rotation.set(0, 0, 0);
      image.scale.setScalar(0.5);

      image.onBeforeRender = () => {
        image.rotation.y += 0.01;
      }

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
      const videoUrlOrPath = await downloadFile("https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/video.mp4");
      const defaultThumbnailUrl = ""; // 如果视频显示不出来，则显示默认的缩略图。传递为空则不显示缩略图。
      const video = await this.view.addVideo(videoUrlOrPath, defaultThumbnailUrl, progress);

      video.position.set(0, -1, 0);
      video.rotation.set(0, 0, 0);
      video.scale.setScalar(0.5);

      video.loop = true;
      video.play();

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
      const videoUrlOrPath = await downloadFile("https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/alpha-video.mp4");
      const defaultThumbnailUrl = ""; // 如果视频显示不出来，则显示默认的缩略图。传递为空则不显示缩略图。
      const video = await this.view.addAlphaVideo(videoUrlOrPath, defaultThumbnailUrl, progress);

      video.position.set(2, -1, 0);
      video.rotation.set(0, Math.PI / -4, 0);
      video.scale.setScalar(1);

      video.loop = true;
      video.play();

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
      const modelUrl = "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/model.glb";
      const modelAb = await requestFile(modelUrl);
      // 如果模型是gltf格式，则必须传递第二个参数。否则可为空
      const model = await this.view.addModel(modelAb, modelUrl, progress);

      model.position.set(0, 0, 0);
      model.rotation.set(0, Math.PI / -4, 0);
      model.scale.setScalar(0.5);

      const [name] = model.getAnimationNames();
      model.playAnimation({
        name,
        loop: true
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
      const audioUrlOrPath = await downloadFile("https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/audio.mp3");
      const audio = await this.view.addAudio(audioUrlOrPath, progress);
      
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
  }
})