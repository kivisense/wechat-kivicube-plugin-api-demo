Page({
  data: {
    showOperate: false
  },

  ready({ detail: view }) {
    this.view = view;
    this.view.skipCloudar();
  },

  sceneStart() {
    this.setData({ showOperate: true });

    const { name } = this.view.sceneInfo.objects[0];
    const audio = this.view.getObject(name);

    audio.addEventListener("play", () => {
      wx.showToast({ icon: "none", title: "音乐开始播放" });
    });
    audio.addEventListener("pause", () => {
      wx.showToast({
        icon: "none",
        title: `音乐暂停播放，当前时间：${audio.currentTime}`
      });
    });
    audio.addEventListener("ended", () => {
      wx.showToast({
        icon: "none",
        title: `音乐播放完毕，总时长：${audio.duration}`
      });
    });

    this.audio = audio;
  },

  play() {
    this.audio.loop = false; // 是否循环播放
    this.audio.play();
  },
  pause() {
    this.audio.pause();
  },
  stop() {
    this.audio.stop();
  },
  playback() {
    this.audio.loop = false; // 是否循环播放
    this.audio.playback();
  }
});
