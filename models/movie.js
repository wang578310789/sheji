import {HTTP} from "../utils/http-p";
class MovieModel extends HTTP{
    getSearch(count){
        return this.request({
            url:`/search?q=${count}`
        })
    }
}
export default MovieModel;