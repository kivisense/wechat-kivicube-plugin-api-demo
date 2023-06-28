import {
  errorHandler,
  showAuthModal,
  requestFile,
} from "../../../utils/helper";

Page({
  data: {
    operation: false,
    animationName: [],
  },

  onLoad() {
    wx.showLoading({ title: "初始化中...", mask: true });

    this.downloadAsset = Promise.all([
      requestFile("https://project.kivisense.com/tmp-assets/skateboarder.glb"),
    ]);
  },

  async ready({ detail: view }) {
    this.view = view;

    try {
      const [modelArrayBuffer] = await this.downloadAsset;

      const [model3d] = await Promise.all([
        view.createGltfModel(modelArrayBuffer),
      ]);

      const animationName = model3d.getAnimationNames();
      console.log("animation names", animationName);

      model3d.scale.set(15, 15, 15);

      this.view.add(model3d);

      model3d.addEventListener("stepChange", (data) => {
        console.log("stepChange", data);
      });

      this.model = model3d;

      wx.hideLoading();

      this.setData({
        operation: true,
        animationName,
      });
    } catch (e) {
      wx.hideLoading();
      errorHandler(e);
    }
  },
  playAnimation(e) {
    const name = e.currentTarget.dataset.name;
    const runingNames = this.model.getAnimationIsRunningNames();

    // 注意：播放特定动画需要停止其他动画播放
    runingNames.forEach((name) => {
      // 停止播放动画
      this.model.stopAnimation(
        name // 需要停止的动画名
      );
    });

    this.model.playAnimation({
      animationName: name, // 动画名称
      loop: true, // 是否循环播放
      clampWhenFinished: true, // 播放完毕后是否停留在动画最后一帧
      timeScale: 1, // 动画播放的速度，默认为 1
    });
  },

  playAnimationByStep() {
    if (this.isStepPlaying) {
      return;
    }

    this.isStepPlaying = true;

    // 可自定一个动画播放的步骤
    this.model
      .playAnimationByStep(["walk", "jump", "walk", "jump", "tricks_2"], {
        clampWhenFinished: true,
        timeScale: 1,
      })
      .then(() => {
        console.log("步骤播放完毕");
        this.isStepPlaying = false;
      });
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
