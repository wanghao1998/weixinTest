// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    isShow: false,
  },
  handleClick(){
    // 点击跳转到list
    wx.switchTab({
      url: '/pages/list/list',
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      获取用户登录信息
     */
    //判断用户是否授权
    this.getUserinfo();
   
  },
  //获取用户信息
  getUserinfo () {
    wx.getSetting({
      success: (data) => {
        console.log(data);
        if (data.authSetting['scope.userInfo']) {
          //用户授权
          this.setData({
            isShow: false
          })
        } else {
          //用户未授权
          this.setData({
            isShow: true
          })
        }
      }
    })
    wx.getUserInfo({
      success: (data) => {
        console.log(data)
        this.setData({
          user: data.userInfo
        })
      },
      fail: () => {
        console.log('获取用户失败')
      }
    })
  },
  //获取用户信息点击
  handleGetUserInfo(data){
    //判断用户点击
    if (data.detail.rawData) {
      //用户点击允许,刷新页面
      this.onLoad();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})