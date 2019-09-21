// pages/detail/detail.js
let dates = require('../../datas/list-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},//页面数据
    isShow: false,//是否显示收藏
    index: null,//当前数据的位置
    isMusic: false//是否播放音乐
  },
  //收藏点击处理函数
  isShows() {
    let i = !this.data.isShow;
    let index = this.data.index;
    
    this.setData({
      isShow: i
    });
    wx.getStorage({
      key: 'isShowss',
      success: (datas) => {
        let obj = datas.data;
        obj[index] = i;
        wx.setStorage({
          key: 'isShowss',
          data: obj,
          success:()=>{
            wx.showToast({
              title: i?'收藏成功':'取消收藏',
              icon: 'success',
              duration: 2000
            }); 
          }
        });
      },
      fail:()=>{
        let obj = {};
        obj[index] = i;
        wx.setStorage({
          key: 'isShowss',
          data: obj,
          success: () => {}
        });
      }
    })
  },
  //音频播放点击处理函数
  playMusic(){
    let isMusic = !this.data.isMusic;
    let { dataUrl, title, coverImgUrl} = this.data.detail.music
    console.log(title)
    this.setData({
      isMusic
    })
    if(isMusic){
      wx.playBackgroundAudio({
        dataUrl: dataUrl,
        title: title,
        coverImgUrl: coverImgUrl
      })
    } else {
      wx.pauseBackgroundAudio()
    }
  },
  //分享功能点击处理函数
  ShareMenu(){
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到朋友', '分享到空间'],
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detail: dates.list_data[options.index],
      index: options.index
    })
    let show = wx.getStorageSync('isShowss')
    if (show[options.index]) {
      this.setData({
        isShow: show[options.index]
      })
    }
    //监听音乐播放
    wx.onBackgroundAudioPlay(()=>{
      this.setData({
        isMusic: true
      })
    })
    //监听音乐暂停
    wx.onBackgroundAudioPause(()=>{
      this.setData({
        isMusic: false
      })
    })
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
    wx.showShareMenu({
      withShareTicket: true
    })

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
    wx.stopBackgroundAudio()
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