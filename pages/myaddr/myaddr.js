const app = getApp();
import {queryListByUserId,addressDelete,addressSave} from '../../config/api'

Page({
  data: {
    check:false,
    addrList:[],
    addrType:false,
  },

  onLoad(options) {
    if(options.type === '1'){
      this.setData({
        addrType:true,
      })
    }
  },
  onShow() {
    this.setData({
      addrList:[],
    })
   this._queryListByUserId()
  },
  onReady() {
    
  },
  //添加地址
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
  //设为默认
  setAddr(e) {
    let index=e.currentTarget.dataset['index'];
    let flagM = this.data.addrList[index].isDefault
    let id =this.data.addrList[index].id
    //console.log(flagM)
    if(!flagM){
       this.setData({check:true,})
       this._addressSave(id)
     }
  },
  //修改地址
  async _addressSave(id) {
    let result = await addressSave({
      id: id,
      isDefault: this.data.check,
    })
   //console.log('设置默认',result)
   if(result.data.code ===0){
     my.showToast({
      content: '设置成功',
      success: () => {
        this._queryListByUserId()
      },
     });
   }
  },
  //修改地址
  addrChange(e) {
    let index=e.currentTarget.dataset['index'];
    let id =this.data.addrList[index].id
    my.navigateTo({ url: '/pages/myaddrch/myaddrch?id='+ id})
  },
  //点击删除
  addrDel(e) {
    let index=e.currentTarget.dataset['index'];
    let id =this.data.addrList[index].id
    my.confirm({
      content: '是否确认删除这条地址',
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      success: (result) => {
        if(result.confirm){
          this._addressDelete(id)
        }
      },
    });
  },
  //删除
  async _addressDelete(id) {
    let result = await addressDelete(id)
   //console.log('del',result)
   if(result.data.code === 0){
     this.setData({
        addrList:[],
      })
    this._queryListByUserId()
   }
  },
  //下单页面过来 点击选择地址
  selAddrbx(e) {
    let index=e.currentTarget.dataset['index'];
    let seladdr = this.data.addrList[index]
    if(this.data.addrType){
      app.selAddr = seladdr
      my.navigateBack()
    }
  },
});
