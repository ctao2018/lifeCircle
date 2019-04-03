const app = getApp();
import {getTokenByCode} from '../../config/api'

Page({
  data: {
  },

  onLoad() {
    
  },
  onShow() {
    app.getUserInfo().then(
      auth => {
          console.log(auth)
          let auth_code = auth.auth_code.authCode;
          getTokenByCode({
            appClient: '',
            code: auth_code,
            identityType: 1,
            mac: '',
            registePlat: 2
          }).then(result =>{
            console.log('index',result)
            if(result.data.code === 0){
              my.setStorage({
                key: 'token',
                data: result.data.data
              });
              console.log(app.backUrl)
              my.redirectTo({ url: '/'+app.backUrl})
            }else{
              my.showToast({
                content: '授权失败',
                success: () => {
                  my.switchTab({url: '/pages/index/index'})
                },
              });
              my.switchTab({url: '/pages/index/index'})
            }
            
          })
      }
    );
  },
  onReady() {
    
  },
 
});
