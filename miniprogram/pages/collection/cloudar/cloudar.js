Page({
  data: {
    showScanTip: true,
  },

  async ready({ detail: collection }) {
    try {
      // 如果5s后用户没有扫描到任何识别图，则关闭云识别，打开默认的场景。
      const timer = setTimeout(() => {
        // stopCloudar执行后，已执行的startCloudar会返回undefined，注意做好空值判定。
        collection.stopCloudar();

        this.setData({ showScanTip: false });
        collection.openScene("QR1gbCwigMD8zwA8mk8GA0PfHD0wY085").then(
          () => {
            console.log("已准备好场景信息，且sceneReady事件已触发");
          },
          (err) => {
            console.error("尝试打开场景失败：", err);
          }
        );
      }, 5000);

      // 自行启用云识别，来实现一致的扫描打开场景功能。
      // 注意：需要配合cloudarStart事件，阻止组件内部默认的云识别行为。否则后果无法预料。
      const sceneId = await collection.startCloudar();

      // 也可指定识别其他合辑，或只识别合辑中某个场景或几个场景的识别图。
      // 如果不指定，则使用组件collection-id属性指定的合辑和场景列表。
      /*
      const sceneList = [collection.collectionInfo.sceneList[0]]; // 指定只扫描第一个场景的识别图
      const sceneId = await collection.startCloudar(
        collection.collectionInfo.collectionId, // 也可指定其他的合辑
        sceneList // 指定希望扫描的场景id列表，id不在列表中的，即使扫描到也会忽略。
      );
      */

      clearTimeout(timer);
      this.setData({ showScanTip: false });

      if (sceneId) {
        await collection.openScene(sceneId); // 注意：插件版本>=1.5.1开始支持
      }
    } catch (e) {
      console.error(e);
      wx.showToast({ title: `发生错误：${e.message}`, icon: "none" });
    }
  },

  /**
   * 组件默认的云识别，会在合辑打开后就开始执行。
   * 如果是云识别合辑，则在点击返回按钮后，也会开始执行。
   * 如果是图像追踪合辑，则在追踪丢失和sceneStart事件触发时开始执行，且在扫描或追踪到场景识别图后自动停止。
   */
  cloudarStart({ detail }) {
    // 这样处理，会直接禁用组件默认的所有云识别行为。
    // 注意：使用了preventCloudar之后，cloudarEnd事件就不会触发。
    detail.preventCloudar(); // 注意：插件版本>=1.5.1开始支持

    /* 也可以有条件的进行禁用
    if (detail.collectionId === "" || detail.sceneList.includes("")) {
      detail.preventCloudar();
    }
    */
  },
});
