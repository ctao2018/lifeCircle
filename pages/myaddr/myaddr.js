const app = getApp();
import {} from '../../config/api'

Page({
  data: {
    noAddr:false,
    check:false,
  },

  onLoad() {
    
  },
  onShow() {
   
  },
  onReady() {
    
  },
  toAddrAdd() {
    my.navigateTo({ url: '/pages/myaddradd/myaddradd'})
  },
  setAddr() {
    if(this.data.check){
       this.setData({check:false,})
     }else{
       this.setData({check:true,})
     }
  },
  addrChange() {

  },
  addrDel() {
    my.confirm({
      content: '是否确认删除这条地址',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
       
      },
    });
  },
});
