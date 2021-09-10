Page({
  ready({ detail: view }) {
    this.view = view;
  },

  /**
   * 注意：只能在loadSceneEnd及之后的事件触发后，才能通过view.getObject获取到素材对象。
   */
  sceneStart() {
    const { name } = this.view.sceneInfo.objects[0];
    const obj = this.view.getObject(name);

    const minX = obj.position.x - 0.2;
    const maxX = obj.position.x + 0.2;
    const minScale = obj.scale.x - 0.2;
    const maxScale = obj.scale.x + 0.2;
    // 修改位置/大小/旋转
    this.timer = setInterval(() => {
      if (obj.position.x < minX) {
        obj.position.x = maxX;
      }
      obj.position.x -= 0.01;

      if (obj.scale.x < minScale) {
        obj.scale.setScalar(maxScale);
      }
      obj.scale.setScalar(obj.scale.x - 0.01);

      obj.rotation.x += 0.01;
      // or 也支持使用四元数来旋转
      // obj.quaternion.x += 0.01;
    }, 1000 / 15);

    this.obj = obj;

    // 监听点击事件
    this.view.getAllObject().forEach((obj) => {
      // 可能的值有image,video,alphaVideo,model,sound,panorama
      console.log(obj.type);
      obj.addEventListener("click", () => {
        wx.showToast({ icon: "none", title: `对象(${obj.name})被点击` });
      });
    });
  },
  // 隐藏和显示
  hide() {
    this.obj.visible = false;
  },
  show() {
    this.obj.visible = true;
  },

  onUnload() {
    clearInterval(this.timer);
  },
});
