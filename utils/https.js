import {config} from "../config";
class HTTP {
    request({url,method = "GET",data={},success}) {
        wx.request({
            url: config.uieee_url+url,
            data,
            method,
            header: {
                'Content-Type': 'application/json',
            },
            success: res=>{
                const statusCode = res.statusCode.toString();
                if (statusCode.startsWith("2")) {
                    if(success){
                        success(res.data);
                        
                    }
                } else {
                    
                   this._showError();
                }
            },
            fail:err=>{
                this._showError();
            }
        })
    }
    _showError(){
        wx.showToast({
            title: "网络错误",
            icon: "none"
        })
    }
}

export {
    HTTP
};