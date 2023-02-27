Page({
  /**
   * 所有高级API对象都是通过ready事件传递出来的。
   *
   * 通过kivicube-collection组件的ready事件对象象detail属性，可获取高级API对象collection。
   */
  ready({ detail: collection }) {
    /**
     * 注意：对象collection和kivicube-scene组件的view对象完全不一样(API和属性都不一样)。
     * 详细可参考README.md中的说明。
     */
    this.collection = collection;

    // 同时可查看当前合辑的基础信息。
    console.log(collection.collectionInfo);
    /* 对象结构如下所示：
    {
      collectionId,
      name,
      description,
      thumbnailUrl,
      // 若是“cloud-ar”，则为云识别类型合辑，意味着只能打开“云识别/陀螺仪”类型场景
      // 若是“image2d-tracking”，则为图像追踪类型合辑，意味着只能打开“图像追踪”类型场景
      functionType,
      firstPage: {
        backgroundImageUrl,
        buttonUrl,
        HideLogoAndName,
      },
      sceneList, // 该合辑可以打开的场景id列表，一个数组
    }
     */
  },

  /**
   * 参考/pages/base/scene/scene，和kivicube-scene组件的ready事件表现一致。
   */
  sceneReady({ detail: view }) {
    // 同时可查看当前场景的基础信息。
    console.log(view.sceneInfo);
  },
});
