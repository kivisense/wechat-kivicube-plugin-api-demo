import { errorHandler, requestFile } from "../../../utils/helper";

Page({
  data: {
    showOperate: false,
  },

  onLoad() {
    // 小程序并不支持任意的图片分辨率，建议不要超过1024x1024。否则加载时会报错。
    this.downloadImage = requestFile(
      "https://meta.kivisense.com/kivicube-wechat-mp-plugin/demo-assets/image/animated-image/fireworks.gif"
    );
  },

  ready({ detail: view }) {
    this.view = view;
  },

  loadEnd() {
    this.view.skipCloudar();
  },

  async sceneStart() {
    try {
      const image = await this.downloadImage;

      const animatedImage = await this.view.createAnimatedImage(
        image,
        (process) => {
          console.log("process:", process);
        }
      );

      this.view.add(animatedImage);

      animatedImage.play();

      this.animatedImage = animatedImage;

      this.setData({ showOperate: true });
    } catch (e) {
      errorHandler(e);
    }
  },

  play() {
    this.animatedImage.play();
  },

  pause() {
    this.animatedImage.pause();
  },

  stop() {
    this.animatedImage.stop();
  },
});
