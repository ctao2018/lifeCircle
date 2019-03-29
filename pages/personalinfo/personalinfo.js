const app = getApp();
import {userUpdateUserInfo,queryMyAcctUserInfoAndPoint} from '../../config/api'

Page({
  data: {
    info:[],
  },

  onLoad() {
    
  },
  onShow() {
   this.setData({
     info:[],
   })
   this._queryMyAcctUserInfoAndPoint()
  },
  onReady() {
    
  },
  //获取个人信息
  async _queryMyAcctUserInfoAndPoint() {
    let result = await queryMyAcctUserInfoAndPoint()
    //console.log('我的',result)
    if(result.data.code === 0){
      this.setData({info:result.data.data,})
    }else{
      console.log(result)
    }
  },
  //点击昵称
  tapName() {
    my.showToast({
        content: '昵称到支付宝设置页面修改'
      });
  },
  //点击年龄
  tapAge() {
    my.datePicker({
      format: 'yyyy-MM-dd',
      startDate: '1901-1-1',
      success: (res) => {
        this._userUpdateUserInfo(res.date)
      },
    });
  },
   //修改个人信息
  async _userUpdateUserInfo(date) {
    let result = await userUpdateUserInfo({
      birthday:date
    })
   // console.log('change',result)
    my.showToast({
        content: result.data.message,
        success: () => {
          this._queryMyAcctUserInfoAndPoint()
        },
      });
  },
});
