Page({
  ready({ detail: view }) {
    this.view = view;

    // 暂停场景的加载。【也支持合辑，一样的方式】
    // 注意：此方法只能在ready事件监听函数的同步执行栈中，才能调用此方法。异步调用无效(比如setTimeout后)。
    // 插件 >= 2.16.21开始支持
    view.pauseLaunch();
    // 此时可自定义逻辑，比如验证camera权限、检查网络环境、是否具备打开资格、是否已登录等。
    wx.showModal({
      title: "提示",
      content: "点击确定才开始加载场景",
      success: ({ confirm }) => {
        if (confirm) {
          // 恢复并继续加载场景。
          // 插件 >= 2.16.21开始支持
          view.resumeLaunch();
        }
      },
    });

    // 如果要异步操作后(比如请求服务器数据)，才能知道是否需要暂停，则可以传入一个异步函数。
    // 插件 >= 2.16.21开始支持
    /*
    view.pauseLaunch(async () => {
      // 模拟异步操作，比如请求服务器数据。
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // 返回true(或其他真值)表示需要暂停加载，返回false(或其他假值)，则不暂停。
      return true;
    });
    */
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
