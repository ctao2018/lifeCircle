const app = getApp();
import {queryListByUserId} from '../../config/api'

Page({
  data: {
    check:false,
    addrList:[],
  },

  onLoad() {
    
  },
  onShow() {
   this._queryListByUserId()
  },
  onReady() {
    
  },
  toAddrAdd() {
    my.navigateTo({ url: '/pages/myaddradd/myaddradd'})
  },
  //地址列表
  async _queryListByUserId() {
    let result = await queryListByUserId()
   //console.log('addr',result)
   if(result.data.code === 0){
     this.setData({
        addrList:result.data.data
      })
   }
  },
  setAddr(e) {
    let index=e.currentTarget.dataset['index'];
    let flagM = this.data.addrList[index].isDefault
    console.log(flagM)
    if(!flagM){
       this.setData({check:false,})
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
