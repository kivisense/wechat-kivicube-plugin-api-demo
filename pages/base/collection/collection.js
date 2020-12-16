Page({
  /**
   * 所有高级API都是基于合辑管理对象collection延伸出来的。
   *
   * 通过kivicube-collection组件的ready事件对象，可获取合辑管理对象collection。
   */
  ready({ detail: collection }) {
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
  }
});
