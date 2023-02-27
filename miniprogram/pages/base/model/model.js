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
    const model = this.view.getObject(name);

    model.addEventListener("click", () => {
      wx.showToast({ icon: "none", title: "模型被点击" });
    });
    model.addEventListener("play", () => {
      wx.showToast({ icon: "none", title: "模型动画开始播放" });
    });
    model.addEventListener("pause", () => {
      wx.showToast({ icon: "none", title: "模型动画暂停播放" });
    });
    model.addEventListener("animationEnded", ({ animationName }) => {
      wx.showToast({
        icon: "none",
        title: `模型动画(${animationName})播放完毕`,
      });
    });
    model.addEventListener("animationLoop", ({ animationName, loopDelta }) => {
      wx.showToast({
        icon: "none",
        title: `模型动画(${animationName})循环播放，${loopDelta}次`,
      });
    });

    this.model = model;
  },

  play() {
    const [name] = this.model.getAnimationNames();
    // 如果name为假，说明此模型没有模型动画
    if (name) {
      this.model.playAnimation({
        name, // 动画名称
        loop: false, // 是否循环播放
        clampWhenFinished: true, // 播放完毕后是否停留在动画最后一帧
      });
    } else {
      console.warn(`模型(${this.model.name})没有动画`);
    }
  },
  pause() {
    const [name] = this.model.getAnimationNames();
    if (name) {
      this.model.pauseAnimation(name);
    } else {
      console.warn(`模型(${this.model.name})没有动画`);
    }
  },
  stop() {
    const [name] = this.model.getAnimationNames();
    if (name) {
      this.model.stopAnimation(name);
    } else {
      console.warn(`模型(${this.model.name})没有动画`);
    }
  },
  playback() {
    const [name] = this.model.getAnimationNames();
    if (name) {
      this.model.playbackAnimation({
        name, // 动画名称
        loop: false, // 是否循环播放
        clampWhenFinished: true, // 播放完毕后是否停留在动画最后一帧
      });
    } else {
      console.warn(`模型(${this.model.name})没有动画`);
    }
  },
});
