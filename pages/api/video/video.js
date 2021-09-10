Page({
  data: {
    showOperate: false,
  },

  ready({ detail: view }) {
    this.view = view;
    this.view.skipCloudar();
  },

  /**
   * 注意：只能在loadSceneEnd及之后的事件触发后，才能通过view.getObject获取到素材对象。
   */
  sceneStart() {
    this.setData({ showOperate: true });

    const { name } = this.view.sceneInfo.objects[0];
    const video = this.view.getObject(name);

    video.addEventListener("click", () => {
      wx.showToast({ icon: "none", title: "视频被点击" });
    });
    video.addEventListener("play", () => {
      wx.showToast({ icon: "none", title: "视频开始播放" });
    });
    video.addEventListener("pause", () => {
      wx.showToast({ icon: "none", title: "视频暂停播放" });
    });
    video.addEventListener("ended", () => {
      wx.showToast({ icon: "none", title: "视频播放完毕" });
    });

    this.video = video;
  },

  play() {
    this.video.loop = false; // 是否循环播放
    this.video.play();
  },
  pause() {
    this.video.pause();
  },
  stop() {
    this.video.stop();
  },
  playback() {
    this.video.seek(0.1);
    // seek需要一段时间起作用
    setTimeout(() => {
      this.video.loop = false; // 是否循环播放
      this.video.play();
    }, 50);
  },
  fullScreenPlay() {
    this.video.loop = false; // 是否循环播放
    this.video.play();
    this.video.requestFullScreen();

    // 退出全屏API
    // this.video.exitFullScreen();
  },
});
