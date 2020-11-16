Page({
    ready({ detail: view }) {
        this.view = view;
    },
    sceneStart() {
        const { name } = this.view.sceneInfo.objects[0];
        this.obj = this.view.getObject(name);

        const minX = this.obj.position.x - 0.2;
        const maxX = this.obj.position.x + 0.2;
        const minScale = this.obj.scale.x - 0.2;
        const maxScale = this.obj.scale.x + 0.2;
        // 修改位置/大小/旋转
        this.timer = setInterval(() => {
            if (this.obj.position.x < minX) {
                this.obj.position.x = maxX;
            }
            this.obj.position.x -= 0.01;

            if (this.obj.scale.x < minScale) {
                this.obj.scale.setScalar(maxScale);
            }
            this.obj.scale.setScalar(this.obj.scale.x - 0.01);

            this.obj.rotation.x += 0.01;
            // or 也支持使用四元数来旋转
            // this.obj.quaternion.x += 0.01;
        }, 1000 / 15);

        // 监听点击事件
        this.view.getAllObject().forEach((obj) => {
            obj.addEventListener("click", () => {
                wx.showToast({ icon: "none", title: `对象(${obj.name})被点击` });
            });
        });
    },
    // 隐藏和显示
    hide() {
        this.obj.visible = false;
    },
    show() {
        this.obj.visible = true;
    },

    onUnload() {
        clearInterval(this.timer);
    }
})