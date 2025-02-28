Page({
  /**
   * 所有高级API对象都是通过ready事件传递出来的。
   *
   * 通过kivicube-scene组件的ready事件对象detail属性，可获取高级API对象view。
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
          title, // 分享标题
          description, // 分享描述
          pictureUrl, // Web端分享缩略图
          imageUrl, // 小程序端转发图
        }
      },
      setting: {
        skipScanMarker, // 是否跳过扫描识别图阶段
        hideTakePhoto,
        showSwitchCamera,
        hideRecordVideo,
        hideStart,
        plane: {
          horizontal,
          vertical
        },
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
   * 获取场景下载进度
   * 注意：
   * 2.14.0以前 进度数值为 e.detail
   * 2.14.0之后 进度数值改为 e.detail.progress
   */
  downloadAssetProgress(e) {
    console.log(e.detail.progress);
  },

  /**
   * 通过高级API对象，获取具体的素材对象。
   */
  sceneStart() {
    /**
     * 注意：只能在loadSceneEnd及之后的事件触发后，才能获取到素材对象。
     */

    // 既可一次性获取所有的素材对象
    console.log(this.view.getAllObject());

    // 也可获取指定的素材对象
    if (this.view.sceneInfo.objects.length > 0) {
      const { name } = this.view.sceneInfo.objects[0];
      /*
        不同类型的素材对象，既拥有独有的API，也拥有共有的API。
        详细使用在页面pages/base/common/common查看共有API

        /pages/base/audio/audio
        /pages/base/model/model
        /pages/base/video/video
        查看各素材独有API
      */
      console.log(this.view.getObject(name));
    }
  },
});
