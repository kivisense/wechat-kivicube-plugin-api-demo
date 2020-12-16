Page({
  /**
   * 所有高级API都是基于场景管理对象view延伸出来的。
   *
   * 通过kivicube-scene组件的ready事件对象，可获取场景管理对象view。
   *
   * 获取场景中某个具体的素材对象，可查看sceneStart部分。
   * 获取到素材对象后，即可通过API对其进行操控。
   */
  ready({ detail: view }) {
    this.view = view;

    // 同时可查看当前场景的基础信息。
    console.log(view.sceneInfo);
    /* 对象结构如下所示：
    {
      sceneId,
      name,
      description,
      thumbnailUrl,
      mode, // cloud-ar代表云识别/陀螺仪类型场景，web3d代表纯3D类型场景。因暂不支持图像追踪，因此也会是cloud-ar。
      collectionId,
      collectionName,
      firstPage: { // 编辑器中首页设置的信息
        backgroundImageUrl,
        buttonUrl,
        hideLogoAndSceneName,
        logoUrl
      },
      metadata: {
        htmlTitle, // 编辑器中设置的网页标题
        share: { // 编辑器中设置的分享信息
          description,
          pictureUrl,
          title
        }
      },
      setting: {
        skipScanMarker // 是否跳过扫描识别图阶段
      },
      objects: [ // 编辑器中增加的所有素材信息列表
        {
          id,
          name,
          type
        }
      ],
    }
     */
  },

  /**
   * 只能在loadSceneEnd及之后的事件中才能获取到素材对象。
   *
   * 通过场景管理对象，获取具体的素材对象。
   */
  sceneStart() {
    // 既可一次性获取所有的素材对象
    console.log(this.view.getAllObject());

    // 也可获取指定的素材对象
    if (this.view.sceneInfo.objects.length > 0) {
      const { name } = this.view.sceneInfo.objects[0];
      // 不同类型的素材对象，既拥有独有的API，也拥有共有的API。
      // 详细使用在页面/pages/api/common/common查看共有API
      // 页面/pages/api/video/video, /pages/api/model/model,
      // /pages/api/audio/audio，查看独有API
      console.log(this.view.getObject(name));
    }
  },
});
