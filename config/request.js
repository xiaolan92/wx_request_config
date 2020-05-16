import { host } from "./host";

/**
 * d
 * @param { string } url  api接口
 * @param { string/object/ArrayBuffer } data  请求参数
 */
const request_post = function ({url, data = {}}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: "POST",
      data: data,
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      timeout: 10000,
      success: res => {
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            resolve(res.data);

          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 1000,
              mask: true
            })
          }
        } else {
          reject(res);
        }


      },
      fail: res => {
        wx.showToast({
          title: res.errMsg,
          icon: "none",
          duration: 1000,
          mask: true
        })

      }
    })

  });


};
/**
 * 
 * @param { string } url  api接口 
 * @param { string/object/ArrayBuffer }  data   请求参数
 */
const request_get = function ({url,data ={}}) {
  wx.showLoading({
    title: '加载中...',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: "GET",
      data:data,
      timeout: 10000,
      success: res => {
        wx.hideLoading();
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            resolve(res.data);

          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2000,
              mask: true,
            })

          }
        } else {
          reject(res);
        }

      },
      fail: res => {
        wx.hideLoading();
        wx.showToast({
          title: res.errMsg,
          icon: "none",
          duration: 2000,
          mask: true
        })
      }
    })

  })

}
export {
  request_get,
  request_post
};