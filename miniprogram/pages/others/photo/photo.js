import { errorHandler } from "../../../utils/helper";

Page({
  data: {
    showTakePhoto: false,
  },

  ready({ detail: view }) {
    this.view = view;
  },

  sceneStart() {
    this.setData({ showTakePhoto: true });
  },

  async takePhoto() {
    try {
      wx.showLoading({ title: "拍照中...", mask: true });
      const photoPath = await this.view.takePhoto();
      wx.hideLoading();

      wx.navigateTo({
        url: `./view/viewPhoto?photo=${encodeURIComponent(photoPath)}`,
      });
    } catch (e) {
      wx.hideLoading();
      errorHandler(e);
    }
  },
});
