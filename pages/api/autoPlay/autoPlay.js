Page({
  ready({ detail: view }) {
      this.view = view;
  },

  loadEnd() {
      setTimeout(() => {
          this.view.skipCloudar();
      }, 0);
  },

  sceneStart() {
      const { name } = this.view.sceneInfo.objects[0];
      const model = this.view.getObject(name);

      /**
       * 只需在sceneStart事件之中，执行音乐、视频和动画的播放操作即可。
       */
      model.playAnimation({
        name: "dance", // 动画名称
        loop: true // 是否循环播放
      });
  }
})