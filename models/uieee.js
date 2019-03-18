import { HTTP } from "../utils/https";
class UieeeModel extends HTTP {
    getLatest(callback) {
        this.request({
            url: "/in_theaters",
            success: res => {
                let index = res.index;
                callback(res);
                wx.setStorageSync('latest', res.index);
            }
        });
    }
}
export { UieeeModel };