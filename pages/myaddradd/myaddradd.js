const app = getApp();
import {addressSave} from '../../config/api'

Page({
  data: {
    showAddr:false,
    textarea:'',
    province: '',
    city: '',
    county: '',
    check:false,
    name:'',
    phone:'',
    addrDt:'',
    areaCode:'',
    pushFlag:false,
  },

  onLoad() {
    
  },
  onShow() {
   
  },
  onReady() {
    
  },
  //点击省市区
  selCity() {
    this.setData({showAddr:true})
  },
  //点击省市区 返回结果
  onChange(val,code) {
    console.log("com",val)
    this.setData({showAddr:false})
    if(val) {
      if(val[4]){
        this.setData({areaCode:val[4]})
      }else{
        this.setData({areaCode:val[3]})
      }
      this.setData({
        province: val[0],
        city: val[1],
        county: val[2],
      })
    }
    
  },
  //添加地址
  async _addressSave() {
    let result = await addressSave({
      areaCode: this.data.areaCode,
      cityName: this.data.city,
      countyName: this.data.county,
      detailInfo: this.data.addrDt,
      id: '',
      isDefault: this.data.check,
      nationalCode: 'CN',
      postalCode: '',
      provinceName: this.data.province,
      telNumber: this.data.phone,
      userId: app.userInfo.id,
      userName: this.data.name
    })
   console.log('添加地址',result)
   if(result.data.code ===0){
     my.showToast({
      content: '添加成功',
      success: () => {
       my.navigateBack()
      },
     });
   }
  },
  //点击保存按钮
   saveBtn(e) {
     //console.log(this.data.name,this.data.phone,this.data.province,this.data.addrDt,)
     this.setData({
      name: e.detail.value.name,
      phone: e.detail.value.phone,
      addrDt: e.detail.value.addrdt,
    })
     if(!this.data.name){
        my.showToast({
          content: '请输入姓名'
        });
        return false;
     }
     let reg=/^1[3456789]\d{9}$/;
     if(!this.data.phone){
        my.showToast({
          content: '请输入电话号码'
        });
        return false;
     }else if(!reg.test(this.data.phone)) {
        my.showToast({
            content: '请输入正确的电话号码'
          });
          return false;
        }
     if(!this.data.province){
        my.showToast({
          content: '请选择省市区'
        });
        return false;
     }
     if(!this.data.addrDt){
        my.showToast({
          content: '请输入详细地址'
        });
        return false;
     }else if(this.data.addrDt.length<5) {
       my.showToast({
          content: '详细地址过短'
        });
        return false;
     }
     if(!this.data.pushFlag){
       this._addressSave()
       this.setData({pushFlag:true})
     }
   },
   //设为默认地址
   setAddr() {
     if(this.data.check){
       this.setData({check:false,})
     }else{
       this.setData({check:true,})
     }
   },
   //收货人
   getName(e) {
     this.setData({
        name: e.detail.value,
      });
   },
   //电话
   getPhone(e) {
     this.setData({
        phone: e.detail.value,
      });
   },
   //详细地址
   getAddrdt(e) {
     this.setData({
        addrDt: e.detail.value,
      });
   },
});
