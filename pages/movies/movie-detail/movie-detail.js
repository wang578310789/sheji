const app = getApp();
const douban = app.globalData.doubanUrl;
import utils from "../../../utils/utils";
const http = utils.http;
var star = utils.star;
var handleCasts = utils.handleCasts;
var handleGenres = utils.handleGenres;
import {Movie} from "class/Movie.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:"数据加载中"
    });
    var url = douban+"subject/"+options.id;
    var movie = new Movie(url);
    var self = this;
    var id = options.id;
    movie.getMovieData(function(movie){
      self.setData(movie);
    })
    this.setData({
      id
    })
  },
  onPreview(){
    var self = this;
    wx.previewImage({
      // current: 'String', // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [self.data.banner]
    })
  },
  onTrailer(options){
    var id = options.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../trailer/trailer?id='+id
    })
  }
})