Page({
  ready({ detail: view }) {
      this.view = view;
  },

  loadEnd() {
      setTimeout(() => {
          this.view.skipCloudar();
      }, 0);
  },

  sceneStart() {
      const { name } = this.view.sceneInfo.objects[0];
      const model = this.view.getObject(name);

      model.addEventListener("click", () => {
          wx.showToast({ icon: "none", title: "模型被点击" });
      });
  },

  tap(e) {
    if (e && e.touches.length > 0) {
      const [{ pageX, pageY }] = e.touches;
      // 要确保pageX, pageY的值是逻辑像素，同时值的原点要在kivicube-scene组件的左上角。
      // 例如：如果kivicube-scene组件只展示在屏幕右半部分，那么点击屏幕中间时，第一个参数值应该是0；
      // 点击屏幕右边缘时，第一个参数值应该是screenWidth / 2。第二个参数同理。
      this.view.dispatchTouchEvent(pageX, pageY);
    }
  }
})