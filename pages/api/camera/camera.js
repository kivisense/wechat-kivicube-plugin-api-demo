Page({
  data: {
    defaultPosition: "front",
    showOperate: false,
  },

  ready({ detail: view }) {
    this.view = view;
  },

  sceneStart() {
    this.setData({ showOperate: true });
    this.position = this.data.defaultPosition;
  },

  switch() {
    const position = this.position === "front" ? "back" : "front";
    this.view.switchCamera(position);
    this.position = position;
  },
});
