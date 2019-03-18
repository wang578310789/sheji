Component({
  /**
   * 组件的属性列表
   */
  properties: {
    openType:String
  },
  options: {
    multipleSlots: true
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event){
      const userInfo = event.detail.userInfo;
      this.triggerEvent('onGet',{
        userInfo
      });
    }
  }
})
