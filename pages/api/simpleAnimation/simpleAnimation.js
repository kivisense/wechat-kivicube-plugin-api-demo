Page({
  ready({ detail: view }) {
    this.view = view;
  },

  async sceneStart() {
    const { name } = this.view.sceneInfo.objects[0];
    const model = this.view.getObject(name);

    const minX = model.position.x - 1;
    const maxX = model.position.x + 1;
    let step = 0.01;
    // 3d渲染循环的每一帧渲染前，会调用此方法。同理也存在onAfterRender方法。
    // 注意：当模型内容不在屏幕之内时(即不可见时)，就不需要渲染此模型，因此也不会调用此方法。
    model.onBeforeRender = () => {
      if (model.position.x < minX) {
        step = 0.01;
      }
      if (model.position.x > maxX) {
        step = -0.01;
      }

      model.position.x += step;
    };
  }
});
