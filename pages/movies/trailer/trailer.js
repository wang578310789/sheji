const app = getApp();
const dianying = app.globalData.doubanUrl;
import utils from "../../../utils/utils";
const http = utils.http;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    var id = options.id;
    var url = dianying + "subject/" + id;
    wx.request({
      url: url,
      header: {
        'Content-Type': 'json'
      },
      success: res => {
        if(res.data.trailers.length=1){
          var alt = res.data.trailers[0].id;
          var altUrl = res.data.trailers[0].alt; 
          this.setData({
            altUrl
          })
        }else{
          var alt = res.data.trailers[1].id;
          var altUrl = res.data.trailers[1].alt;
          this.setData({
            altUrl
          })
        }
      }
    })
  }
})