// 代码来自：https://github.com/tweenjs/tween.js
// 使用文档参考：https://github.com/tweenjs/tween.js/blob/main/docs/user_guide.md
// 这里内置的为18.6.4，可自行升级到最新版本
import TWEEN from "./tween.umd";

Page({
  ready({ detail: view }) {
    this.view = view;
  },

  /**
   * 注意：只能在loadSceneEnd及之后的事件触发后，才能通过view.getObject获取到素材对象。
   */
  async sceneStart() {
    const { name } = this.view.sceneInfo.objects[0];
    const model = this.view.getObject(name);

    // 或者改用setInterval(() => {}, 1000 / 60)实现渲染循环也可以。
    // 如果使用onBeforeRender，必须保证动画过程中模型一直可见。
    model.onBeforeRender = () => {
      TWEEN.update();
    };

    const startTransform = {
      px: 0,
      py: 0,
      pz: 0,
      rx: 0,
      ry: 0,
      rz: 0,
      scale: 0.1,
    };
    const endTransform = {
      px: 1,
      py: -1,
      pz: -100,
      rx: Math.PI,
      ry: Math.PI / 2,
      rz: Math.PI * 2,
      scale: 1.5,
    };
    const duration = 5000;
    new TWEEN.Tween(startTransform)
      .to(endTransform, duration)
      .easing(TWEEN.Easing.Bounce.InOut)
      .onUpdate(({ px, py, pz, rx, ry, rz, scale }) => {
        model.position.set(px, py, pz);
        model.rotation.set(rx, ry, rz);
        model.scale.setScalar(scale);
      })
      .repeat(Infinity)
      .start();
  },
});
