export function errorHandler(errInfo) {
  let message = errInfo;
  if (typeof errInfo === "object") {
    if (errInfo instanceof Error) {
      message = errInfo.message;
    } else if (errInfo.errMsg) {
      message = errInfo.errMsg;
    } else {
      message = Object.values(errInfo).join("; ");
    }
  }
  console.error(errInfo);
  wx.showToast({
    title: message,
    icon: "none",
  });
}

export function requestFile(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      dataType: "",
      responseType: "arraybuffer",
      success({ statusCode, data }) {
        if (statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`下载素材(${url})发生错误(状态码-${statusCode})`));
        }
      },
      fail: reject
    });
  });
}

export function downloadFile(url) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      success({ statusCode, tempFilePath }) {
        if (statusCode === 200) {
          resolve(tempFilePath);
        } else {
          reject(
            new Error(`下载文件：${url} 失败。statusCode：${statusCode}`)
          );
        }
      },
      fail: reject,
    });
  });
};