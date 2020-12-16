Page({
  data: {
    showOperate: false,
  },
  ready({ detail: view }) {
    this.view = view;
    this.view.skipCloudar();
  },

  async sceneStart() {
    this.setData({ showOperate: true });
  },

  enableMask() {
    /**
     * 只要是3d内容的素材，都可以指定为遮罩。比如图片、视频和模型。
     * 这里只以模型为示例。
     */
    this.view.sceneInfo.objects.forEach(({ name, type }) => {
      if (type === "model") {
        const model = this.view.getObject(name);
        model.setEnableMask();
      }
    });
  },

  disableMask() {
    this.view.sceneInfo.objects.forEach(({ name, type }) => {
      if (type === "model") {
        const model = this.view.getObject(name);
        model.setDisableMask();
      }
    });
  }
});
