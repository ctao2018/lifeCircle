const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    imgsrc:'../../assets/integral_bg.png',
  },

  onLoad() {
    
  },
  onShow() {
    
  },
  onReady() {
    
  },
  //点击兑换
  exchange() {
    my.confirm({
      title: '确认兑换',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
        console.log(result)
        if(result.confirm){
          my.alert({
            title: '兑换成功',
            buttonText: '确认',
            success: () => {
              
            },
          });
        }
        
      },
    });
  },
});
