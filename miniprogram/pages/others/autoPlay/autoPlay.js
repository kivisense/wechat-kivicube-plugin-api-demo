Page({
  ready({ detail: view }) {
    this.view = view;
  },

  loadEnd() {
    this.view.skipCloudar();
  },

  /**
   * 注意：只能在loadSceneEnd及之后的事件触发后，才能通过view.getObject获取到素材对象。
   */
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
  },
});
