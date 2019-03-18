// pages/movies/movies-more/movies-more.js
var douban = getApp().globalData.doubanUrl;
import utils from "../../../utils/utils";
var http = utils.http;
var star = utils.star;
var sliceTitle = utils.sliceTitle;
Page({
  data: {
    start:0,
    // 定义movies的数据是否为空
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var type = options.type;
    var title = options.title;
    var url = douban + type;
    http(url, this.handleData);
    /* 设置标题 */
    wx.setNavigationBarTitle({
      title
    });
    this.setData({
      type
    })
  },
  handleData(res) {
    var title = res.data.title;
    var subjects = res.data.subjects;
    var movies = [];
    subjects.forEach(ele => {
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
    // isEmpty定义movies是否为空
    if(this.data.isEmpty){
      this.setData({
        movies,
        title,
        isEmpty:false
      })   
    }else{
      this.setData({
        movies:this.data.movies.concat(movies)
      })
    }
    //数据渲染完成关闭
    wx.hideLoading();
    
  },
  onReachBottom(){
    var type = this.data.type;
    this.data.start+=20;
    var start = this.data.start;
    var url = `${douban}${type}?start=${start}&count=20`;
    http(url,this.handleData);
    //下拉触发加载
    wx.showLoading({
      title:"加载数据"
    });
  },
  onClick(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id='+id
    })
  }
 
 
})