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

    model.addEventListener("click", (data) => {
      console.log("被点击网格", data.name); // 可以获取到被点击的网格名
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

    model.onBeforeRender = () => {
      if (!this.isLookCamera) {
        return;
      }

      const camera = this.view.defaultCamera;
      const position = camera.position;

      // * 注意：lookAt 会自动修改模型的rotation
      model.lookAt(position.x, position.y, position.z);
    };

    this.model = model;
  },

  play() {
    const [name] = this.model.getAnimationNames();
    // 如果name为假，说明此模型没有模型动画
    if (name) {
      this.model.playAnimation({
        animationName: name, // 动画名称
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
        animationName: name, // 动画名称
        loop: false, // 是否循环播放
        clampWhenFinished: true, // 播放完毕后是否停留在动画最后一帧
      });
    } else {
      console.warn(`模型(${this.model.name})没有动画`);
    }
  },
  openLookCamera() {
    this.isLookCamera = true;
    if (!this.originRotation) {
      const { x, y, z } = this.model.rotation;

      const originRotation = {
        x,
        y,
        z,
      };

      this.originRotation = originRotation;
    }
  },
  closeLookCamera() {
    this.isLookCamera = false;

    // 取消面向相机后，手动还原模型的旋转
    if (this.originRotation) {
      const { x, y, z } = this.originRotation;

      this.model.rotation.set(x, y, z);
    }
  },
});
