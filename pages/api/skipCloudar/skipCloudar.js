Page({
  ready({ detail: view }) {
    this.view = view;
  },

  /**
   * 目前版本(<= 1.3.4)，需要在loadSceneEnd事件之中执行才有效。
   */
  loadEnd() {
    // 只有云识别类型的场景，才具备api：skipCloudar。
    if (this.view.sceneInfo.mode === "cloud-ar") {
      // 目前版本(<= 1.3.4)，需要延时执行才有效。
      setTimeout(() => {
        this.view.skipCloudar();
      }, 0);
    }
  }
})