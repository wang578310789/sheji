import utils from "../../../../utils/utils";
const http = utils.http;
var star = utils.star;
var handleCasts = utils.handleCasts;
var handleGenres = utils.handleGenres;
class Movie {
    constructor(url) {
        this.url = url;
    }
    getMovieData(cb) {
        this.cb = cb;
        http(this.url, this.handleData.bind(this));
    }
    handleData(res) {
        var data = res.data;
        var title = data.title;
        var country = data.countries[0] + "." + data.year;
        var like = data.wish_count;
        var comment = data.comments_count;
        var banner = data.images.large;
        var alt_title = data.original_title;
        var director = data.directors[0].name;
        var stars = star(data.rating.stars);
        var average = data.rating.average;
        var castsName = handleCasts(data.casts);
        var genres = handleGenres(data.genres);
        var sum = data.summary;
        var casts = data.casts;
        var movie = {
            title,
            country,
            like,
            comment,
            banner,
            alt_title,
            stars,
            average,
            director,
            castsName,
            genres,
            sum,
            casts
        };
        this.cb(movie);
        wx.hideLoading();
    }
}
export {Movie}