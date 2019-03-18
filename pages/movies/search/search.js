import utils from "../../../utils/utils";
const http = utils.http;
const director = utils.director;
var sliceTitle = utils.sliceTitle;
Page({

  data: {
    
  },
  onConfirm(e) {
    var count = e.detail.value;
    var url = `http://localhost/movie/search?q=${count}`;
    http(url, this.handleData);
  },
  handleData(res) {
    var subjects = res.data.subjects;
    var movies = [];
    subjects.forEach(ele => {
      var imgUrl = ele.images.small;
      var title = sliceTitle(ele.title);
      var id = ele.id;
      var year = ele.year;
      var average = ele.rating.average;
      var name = director(ele.directors[0]);
      var temp = {
        imgUrl,
        title,
        id,
        year,
        average,
        name
      }
      movies.push(temp);
    });
    this.setData({
      movies
    })
  },
  onSearch(res) {
    var id = res.currentTarget.dataset.id;
    if (id == undefined) {
      wx.showToast({
        title: '没有搜索到详细内容',
        icon: 'none'
      });
    } else {
      wx.navigateTo({
        url: '../movie-detail/movie-detail?id=' + id
      });
    }
  }
}) 