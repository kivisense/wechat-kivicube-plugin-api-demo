// 去除图像追踪功能水印的license，一般而言，建议在App.onLaunch方法之中设置。
// 必须在打开场景之前设置好license，否则就会出现水印。
const { setOptions } = requirePlugin("kivicube");
setOptions({
  license: "OA7EIJ7JB4JmAZ5CiceSt0ScZael9lB0GJTb+5YJ5B6l8idXnc3eJ5/8wlH44ZPycUu1anh7DuOremv6GKmChel5PT4WcQNqny5/vpWy4Zr7Y119sdRK7bGEpBVx6b9IpO2/otJ7e7qQza9ESKBR+0i2EaYxd9khEdWE/ofgsONfEDW+mWqT26i598ev1zbhO8lwGYbUcqhL0UIrTjdLpfG0sBp2a4WqNc3YOnoh0e5EnzRn3h1AXVHpjutf86vwuDgJKq/MTVBZ7Y3dP7K7Jbye9whYL2nrgRQkvw38nsuo/FspqweCujz7MzP1wPpYZLms2KtgGdjzSfuTbWxThQ=="
});

Page({
  data: {
    showTip: true,
  },
  tracked() {
    this.setData({ showTip: false });
  },
  lostTrack() {
    this.setData({ showTip: true });
  },
});
