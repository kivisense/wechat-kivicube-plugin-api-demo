import { errorHandler } from "../../../utils/helper";

Page({
  data: {
    showTakePhoto: false,
  },

  ready({ detail: collection }) {
    this.collection = collection;
    this.setData({ showTakePhoto: true });
  },

  async takePhoto() {
    try {
      wx.showLoading({ title: "拍照中...", mask: true });
      /* 插件版本>=1.5.6开始支持 */
      const photoPath = await this.collection.takePhoto();
      wx.hideLoading();

      wx.navigateTo({
        url: `../photo/view/viewPhoto?photo=${encodeURIComponent(photoPath)}`,
      });
    } catch (e) {
      wx.hideLoading();
      errorHandler(e);
    }
  },
});
