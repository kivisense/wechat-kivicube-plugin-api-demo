Page({
  ready({ detail: collection }) {
    this.collection = collection;
  },

  cloudarStart({ detail: { preventCloudar } }) {
    preventCloudar(); // 注意：插件版本>=1.5.1开始支持
  },

  openScene(sceneId) {
    // 注意：插件版本>=1.5.1开始支持
    this.collection.openScene(sceneId).then(
      () => {
        console.log("已准备好场景信息，且sceneReady事件已触发");
      },
      (err) => {
        console.error("打开场景失败：", err);
      }
    );
  },

  openScene1() {
    this.openScene("9vR08tpLesfKVWs2XbbnNKSsX3JqpaAp");
  },

  openScene2() {
    this.openScene("QR1gbCwigMD8zwA8mk8GA0PfHD0wY085");
  },

  closeCurrentScene() {
    this.collection.closeCurrentScene().catch((e) => {
      wx.showToast({ title: `关闭场景失败：${e.message}`, icon: "none" });
    });
  },
});
