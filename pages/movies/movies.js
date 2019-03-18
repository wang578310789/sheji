// pages/movies/movies.js
const app = getApp();
const douban = app.globalData.doubanUrl;
import utils from "../../utils/utils";
const http = utils.http;
var star = utils.star;
var sliceTitle = utils.sliceTitle;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: [{
      url: "../../images/pege/01.png"
    },
    {
      url: "../../images/pege/02.png"
    },
    {
      url: "../../images/pege/03.png"
    }],
    "in_theaters": {},
    "coming_soon": {},
    "top250": {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:"加载数据"
    });
    var count = "?start=0&count=3";
    var inTheatersUrl = douban + "in_theaters" + count;
    var comingSoon = douban+"coming_soon"+count;
    var top250 = douban+"top250"+count;
    http(inTheatersUrl, this.handleData,"in_theaters");
    http(comingSoon, this.handleData,"coming_soon");
    http(top250, this.handleData,"top250");
  },
  handleData(res,type) {
    var title = res.data.title;
    var subjects = res.data.subjects;
    var movies = [];
    subjects.forEach(ele=>{
      var average = ele.rating.average;
      var stars = star(ele.rating.stars);
      var title = sliceTitle(ele.title);
      var imgUrl = ele.images.small;
      var id = ele.id;
      var temp = {
        average,
        stars,
        title,
        imgUrl,
        id
      };
      movies.push(temp);
    })
    var readyData={};
    readyData[type]= {
      movies,
      title,
      type
    };
    this.setData(readyData);
    wx.hideLoading();
  },
  // 跳转到更多页面
  more(event){
    var type = event.currentTarget.dataset.type;
    var title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: 'movies-more/movies-more?type='+type+"&title="+title
    });
  },
  onClick(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movies/movie-detail/movie-detail?id='+id
    })
  },
  onSearch(){
    wx.navigateTo({
      url: '../../pages/movies/search/search'
    })
  }

})