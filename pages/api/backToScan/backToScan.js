Page({
  data: {
    showBack: false
  },

  ready({ detail: collection }) {
    this.collection = collection;
  },

  sceneStart() {
    this.setData({ showBack: true });
  },

  back() {
    // 此方法只有云识别类型合辑有效。
    if (this.collection.collectionInfo.functionType === "cloud-ar") {
      this.setData({ showBack: false });
      this.collection.backToScan();
    }
  },
});
