Page({
  data: {
    photoPath: ""
  },
  onLoad({ photo }) {
    this.setData({ photoPath: decodeURIComponent(photo) });
  },

  save() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.photoPath,
      success() {
        wx.showToast({ title: "保存照片成功" });
      },
      fail(e) {
        console.error("保存照片失败", e);
        wx.showToast({ title: "保存照片失败", icon: "none" });
      }
    });
  }
})