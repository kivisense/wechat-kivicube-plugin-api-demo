import { errorHandler, requestFile } from "../../../utils/utils";

Page({
  data: {
    showOperate: false
  },

  onLoad() {
    // 小程序并不支持任意的图片分辨率，建议不要超过1024x1024。否则加载时会报错。
    this.downloadImage = requestFile(
      "https://kivicube-resource.kivisense.com/wechat-kivicube-plugin-api-demo/image-sprite.png"
    );
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
    try {
      const spriteName = "show";
      const image = await this.downloadImage;
      const imageSprite = await this.view.addImageSprite({
        images: image,
        type: "png",
        sprite: spriteName,
        col: 5,
        row: 5,
        lastRowEmptyCol: 2,
        width: 1,
        height: 1,
        fps: 15
      });

      imageSprite.position.y = 2.5;
      imageSprite.rotation.y = -Math.PI / 4;
      imageSprite.scale.setScalar(3);

      imageSprite.addEventListener("spriteEnded", ({ sprites }) => {
        wx.showToast({
          title: `精灵图自然播放完毕，序列名称：${sprites.join(",")}`,
          icon: "none"
        });
      });
      imageSprite.addEventListener("spriteLoop", ({ sprites, loopDelta }) => {
        wx.showToast({
          title: `精灵图循环播放完毕${loopDelta}次，序列名称：${sprites.join(
            ","
          )}`,
          icon: "none"
        });
      });

      this.imageSprite = imageSprite;
      this.spriteName = spriteName;

      this.setData({ showOperate: true });
    } catch (e) {
      errorHandler(e);
    }
  },

  play() {
    const loop = Math.random() > 0.5;
    this.imageSprite.playSprite(this.spriteName, loop);
  },
  pause() {
    this.imageSprite.pauseSprite();
  }
});
