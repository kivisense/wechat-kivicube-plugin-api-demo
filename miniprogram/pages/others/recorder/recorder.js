Page({
  data: {
    id: "",
    renderCamera: true, // ! 注意，录制功能必须 设置 renderCamera 为 true
    recordDisable: false,
    autoDownload: true,
    recorderStatus: "初始状态",
    leftTime: 0,
  },

  onLoad({ id }) {
    this.setData({ id });
  },

  ready({ detail }) {
    this.view = detail;
  },

  sceneStart() {
    const { name } = this.view.sceneInfo.objects[0];
    const model = this.view.getObject(name);

    /**
     * 只需在sceneStart事件之中，执行音乐、视频和动画的播放操作即可。
     */

    model.playAnimation({
      animationName: "dance", // 动画名称
      loop: true, // 是否循环播放
    });

    this.model = model;
  },

  error({ detail }) {
    wx.hideLoading();
    console.error(detail);
  },

  async startRecord() {
    this.setData({ startDisable: true });

    if (!this.recorder) {
      this.initRecorder();
    }

    this.enableOnBeforeRender();
    console.log("--- start ---");
    const localPath = await this.recorder.start();
    console.log("--- end ---");

    this.setData({ startDisable: false, stopDisable: false });

    wx.saveVideoToPhotosAlbum({
      filePath: localPath,
    });
  },

  /**
   * 初始化AR录制器
   * AR内容录制功能开通请参考：
   * https://www.yuque.com/kivicube/slam/slam-develop#pUA07
   * **/
  initRecorder() {
    try {
      // 实例化视频录制对象
      this.recorder = this.view.createRecorder({
        options: {
          // 录制时长毫秒，如果调用了stop方法，录制会提前结束
          duration: 10 * 1000,
        },
      });
    } catch (err) {
      console.log(err);
      wx.showToast({
        title: err.message,
        icon: "none",
      });

      this.setData({ startDisable: false });
    }

    this.recorder.on("start", () => {
      console.log("recorder log:  start 开始录制");
    });

    this.recorder.on("pause", () => {
      console.log("recorder log:  pause 暂停录制");
    });

    this.recorder.on("resume", () => {
      console.log("recorder log:  resume 恢复录制");
    });

    this.recorder.on("stop", () => {
      console.log("recorder log:  stop 停止录制");
    });

    this.recorder.on("end", (path) => {
      console.log("recorder log:  end", path);
    });

    this.recorder.on("error", (error) => {
      console.log("recorder log: error", error);
    });
  },

  stopRecord() {
    this.recorder.stop();
  },

  enableOnBeforeRender() {
    const { model, recorder } = this;
    const RecorderStatusEnum = recorder.RecorderStatusEnum;

    // 使用渲染钩子函数，实现更新录制状态。
    // 注意：当屏幕上看不见模型时，则不会调用此方法。
    model.onBeforeRender = () => {
      if (recorder) {
        const statusMap = {
          [RecorderStatusEnum.INIT]: "初始状态",
          [RecorderStatusEnum.RECORDING]: "录制中",
          [RecorderStatusEnum.PAUSE]: "暂停中",
          [RecorderStatusEnum.END]: "已结束",
          [RecorderStatusEnum.PROCESSING]: "处理中",
          [RecorderStatusEnum.DOWNLOADING]: "下载中",
        };

        this.setData({
          recorderStatus: statusMap[recorder.status] || "",
          leftTime: (recorder.leftTime / 1000).toFixed(2),
        });
      }
    };
  },

  disableOnBeforeRender() {
    delete this.model.onBeforeRender;
  },

  onUnload() {
    this.disableOnBeforeRender();
    this.recorder.destroy();
    this.recorder = null;
    this.model = null;
    this.view = null;
  },
});
