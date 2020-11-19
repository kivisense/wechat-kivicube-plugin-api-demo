Page({
  ready({ detail: view }) {
    this.view = view;
  },

  /**
   * 插件版本 <= 1.3.4时，需要在loadSceneEnd事件之中执行才有效。
   * 当 >= 1.3.5时，只要在sceneStart事件之前执行都有效。
   */
  loadEnd() {
    // 只有云识别类型的场景，才具备api：skipCloudar。
    if (this.view.sceneInfo.mode === "cloud-ar") {
      // 立即跳过识别，插件版本 <= 1.3.4时，需要延时执行才有效。
      setTimeout(() => {
        this.view.skipCloudar();
      }, 0);

      // 或者实现为识别超时5s，就自动跳过。
      // setTimeout(() => {
      //   this.view.skipCloudar();
      // }, 5000);
    }
  }
})
