const app = getApp();
import {orderDetail} from '../../config/api';
import env from '../../config/env';

Page({
  data: {
    orderId:'',
    detail:[],
    typeArr:['请选择 >','错拍/多拍','卖家发错货','收到商品少件/破损/污渍等','其他'],
    indexType:0,
    phoneNum:'',
    tkReason:'',
    imgArr:[],
    upPicF:true,
    submitF:true,
  },

  onLoad(options) {
    if(options){
      this.setData({
        orderId:options.id,
      })
      this._orderDetail()
    }
  },
  onShow() {
   this.setData({
    submitF:true
   })
  },
  onReady() {
    
  },
  //详情
  async _orderDetail() {
    const result = await orderDetail(this.data.orderId)
    //console.log('详情',result)
    if(result.data.code === 0){
      this.setData({detail:result.data.data})
    }else{
      my.showToast({
        type: 'exception',
        content: result.data.message,
        duration: 2000,
      });
    }
  },
  //选择类型
  bindPickerChange(e) {
    this.setData({
      indexType: e.detail.value,
    });
  },
  //获取手机号
  getPhone(e) {
    this.setData({
      phoneNum: e.detail.value,
    });
  },
  //退款说明
  getSM(e) {
    this.setData({
      tkReason: e.detail.value,
    });
  },
  //点击上传图片
  upLoadimg() {
    const token = my.getStorageSync({ key: "token" });
    my.chooseImage({
      success: (res) => {
        let imgSrc = res.apFilePaths[0];
        my.uploadFile({
          header: {'Authorization': token.data},
          url: env.base_url_dev + '/sharecom/oss/picture/upload', // 开发者服务器地址
          filePath: imgSrc, // 要上传文件资源的本地定位符
          fileName: 'file', // 文件名，即对应的 key, 开发者在服务器端通过这个 key 可以获取到文件二进制内容
          fileType: 'image', // 文件类型，image / video / audio
          success: (res) => {
            let list = JSON.parse(res.data)
            //console.log(list)
            if(list.code === 0){
              this.data.imgArr = this.data.imgArr.concat(list)
              this.setData({imgArr:this.data.imgArr})
              if(this.data.imgArr.length>=3){
                this.setData({upPicF:false})
              }
            }
          },
          fail: (res) => {
            my.alert({
              title: '上传失败' 
            });
          },
        });
        //this._uploadPic(imgSrc)
      },
    });
  },
    //点击删除照片
  delPicFn(e) {
    let index=e.currentTarget.dataset['index'];
    let pic = this.data.imgArr;
    pic.splice(index,1);
    this.setData({
      imgArr:pic,
      upPicF:true,
    });
  },
  //点击提交
  submitFn(e) {
    my.redirectTo({
      url: "/pages/refundDetail/refundDetail"
    })
    this.setData({
      tkReason:e.detail.value.reasoninp,
      phoneNum:e.detail.value.phoneinp,
    })
    if(this.data.indexType === 0){
      my.showToast({
        content: '请选择退款原因',
        duration: 2000,
      });
      return false
    }
    let reg=/^1[3456789]\d{9}$/;
    if(!this.data.phoneNum){
      my.showToast({
        content: '请填写手机号码',
        duration: 2000,
      });
      return false
    }else if(!reg.test(this.data.phoneNum)) {
      my.showToast({
        content: '请输入正确的电话号码'
      });
      return false;
    }
    let piclist = '';
    let imgUrl = [];
    if(this.data.imgArr.length>0){
      for(let i=0;i<this.data.imgArr.length;i++){
        imgUrl.push(this.data.imgArr[i].data)
      }
      piclist = imgUrl.join('|')
    }
    if(this.data.submitF){
      this.setData({submitF:false})
    }
    console.log(this.data.typeArr[this.data.indexType],this.data.phoneNum,this.data.tkReason,piclist)
  },
});
