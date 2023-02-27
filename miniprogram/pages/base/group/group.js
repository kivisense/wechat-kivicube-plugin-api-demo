import {
  errorHandler,
  showAuthModal,
  requestFile,
  downloadFile,
} from "../../../utils/helper";

Page({
  data: {
    // license: getApp().globalData.license,
    operation: false,
  },

  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });

    this.downloadAsset = Promise.all([
      requestFile(
        "https://meta.kivisense.com/kivicube-slam-mp-plugin/demo-assets/model/rabbit.glb"
      ),
      downloadFile(
        "https://meta.kivisense.com/kivicube-slam-mp-plugin/demo-assets/video/slam.mp4"
      ),
      downloadFile(
        "https://meta.kivisense.com/kivicube-slam-mp-plugin/demo-assets/video/glow.mp4"
      ),
      requestFile(
        "https://meta.kivisense.com/kivicube-slam-mp-plugin/demo-assets/image/music-effect.png"
      ),
      requestFile(
        "https://meta.kivisense.com/kivicube-slam-mp-plugin/demo-assets/image/kivisense-logo.png"
      ),
    ]);
  },

  async ready({ detail: view }) {
    this.view = view;

    try {
      const [
        modelArrayBuffer,
        videoPath,
        alphaVideoPath,
        imageSpriteArrayBuffer,
        imageArrayBuffer,
      ] = await this.downloadAsset;

      console.log(0);

      const spriteName = "music";
      const [model3d, video, alphaVideo, image, imageSprite] =
        await Promise.all([
          view.createGltfModel(modelArrayBuffer),
          view.createVideo(videoPath),
          view.createAlphaVideo(alphaVideoPath),
          view.createImage(imageArrayBuffer),
          view.createImageSprite({
            images: imageSpriteArrayBuffer,
            type: "png",
            sprite: spriteName,
            col: 16,
            row: 16,
            lastRowEmptyCol: 2,
            width: 1,
            height: 1,
            fps: 30,
          }),
        ]);

      /**
       * 创建一个组合对象。
       * @returns {Group3D}
       */
      const group = view.createGroup();

      group.add(model3d);
      group.add(video);
      group.add(image);

      model3d.scale.setScalar(30);
      video.position.set(-1, 1, 0);
      image.position.set(1, 1, 1);
      image.scale.setScalar(0.3);

      // 普通3d对象，也可以作为组合对象存在。
      video.add(alphaVideo);
      alphaVideo.position.z = -1;
      alphaVideo.position.y = 1;

      image.add(imageSprite);
      imageSprite.position.set(0, 0, -1);
      imageSprite.scale.setScalar(10);

      // 此处指定的大小，为所有内容融合后的整体大小。
      // 一般来说，组合内部的内容大小，还需要自行调整。
      view.add(group, 1);

      group.position.set(0, 0, -2);

      this.group = group;

      this.setData({
        operation: true,
      });

      imageSprite.playSprite(spriteName, true);
      video.videoContext.play();
      alphaVideo.loop = true;
      alphaVideo.videoContext.play();
      model3d.playAnimation({ loop: true });

      wx.hideLoading();
    } catch (e) {
      wx.hideLoading();
      errorHandler(e);
    }
  },
  move1() {
    this.group.position.set(0, 1, -2);
  },
  move2() {
    this.group.position.set(0, -1, -2);
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
