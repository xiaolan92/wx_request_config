//app.js
App({
  onLaunch: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    this.autoUpdate();
  },
  // 自动更新
  autoUpdate (){
    const _self = this;
    // 获取小程序更新机制兼容
    if(wx.canIUse("getUpdateManager")){
      const updateManager = wx.getUpdateManager();
      //  获取小程序是否有新版本发布
      updateManager.onCheckForUpdate(res=>{
        if(res.hasUpdate){
          wx.showModal({
            title:"更新提示",
            content:"检测到新版本，是否下载新版本并重启小程序？",
            success: res =>{
              if(res.confirm){
                _self.downLoadAndUpdate(updateManager);

              }
              // 如果用户取消了小程序新版本的更新,则给予二次弹窗,如果不需要二次弹窗,这段代码可以去掉
              else if(res.cancel){
                wx.showModal({
                  title:"温馨提示~",
                  content:"本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~",
                  showCancel:true,  //  隐藏取消按钮
                  confirmText:"确定更新",
                  success:res =>{
                    if(res.confirm){
                      _self.downLoadAndUpdate(updateManager);

                    }

                  }

                });
              }
            }
          });

        }
      });

    }else{
      wx.showModal({
        title:"提示",
        showCancel:false,
        content:"当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试."


      });

    }

  },
  // 下载小程序新版本并重启应用
  downLoadAndUpdate (updateManager){
    wx.showLoading();
    updateManager.onUpdateReady(()=>{
      wx.hideLoading();
      updateManager.applyUpdate();
    });
    // 新的版本更新失败
    updateManager.onUpdateFailed(()=>{
      wx.howModal({
        title:"已经有新版本了哟~",
        content:"新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
      });
    });

  },
  // 显示消息提示框
  showToast(title){
    wx.showToast({
      title,
      icon:"none",
      duration:1500,
      mask:true

    });

  },
  // 获取code
  login (){
    wx.login({
      sucees :res =>{
        if(res.code){
          this.globalData.loginCode = res.code;
        }
      }
    });

  },
  globalData: {
    userInfo: "",
    token:"",
    loginCode:""
  }
})
