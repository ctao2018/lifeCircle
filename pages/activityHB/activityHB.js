const app = getApp();
import {} from '../../config/api';
import env from '../../config/env';

Page({
  data: {
    imgsrc:env.pic_url+'activity_hongbao.png',
  },

  onLoad() {
    
  },
  onShow() {
   this.setData({
    
   })
  },
  onReady() {
    
  },
  copyCode() {
    my.setClipboard({
      text: '510252399',
      success:()=>{
        my.showToast({
          content: '复制成功',
          duration: 1500,
        });
      }
    })
  },
  saveImg() {
    my.saveImage({
      url: this.data.imgsrc,
      success: () => {
        my.showToast({
          content: '保存成功',
          duration: 1500,
        });
      },
    });
  },
});
