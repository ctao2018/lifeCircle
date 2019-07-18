const app = getApp();
import {addAnswerByUser,submitCorrection} from '../../config/api'
import env from '../../config/env'

Page({
  data: {
    phone:'',
    type:'',
    id:null,
    imgUp:'',
    textarea:'',
    imgArr:[],
    picturesUrl:'',
    submitF:true,
  },

  onLoad(options) {
     if(options){
      this.setData({
        type:options.type,
        id:options.id,
      })
    }
  },
  onShow() {
    this.setData({submitF:true})
  },
  onReady() {
    
  },
  //获取电话
  getLink(e) {
    this.setData({
      phone: e.detail.value,
    });
  },
  //点击上传图片
  upLoadimg() {
    const token = my.getStorageSync({ key: "token" });
    if(this.data.imgArr.length<4){
      my.chooseImage({
        success: (res) => {
          let imgSrc = res.apFilePaths[0];
          //console.log(imgSrc)
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
    } else{
      my.showToast({
        content: '上传的图片张数已超过最大值！'
      });
    }
  },
  //点击删除照片
  delPicFn(e) {
    let index=e.currentTarget.dataset['index'];
    this.data.imgArr.splice(index,1)
    this.setData({imgArr:this.data.imgArr})
  },
  //点击提交按钮
  submitFn(e) {
    this.setData({
      textarea:e.detail.value.textarea,
      phone:e.detail.value.phoneinp,
    })
    let reg=/^1[3456789]\d{9}$/;
     if(this.data.phone){
       if(!reg.test(this.data.phone)){
          my.showToast({
            content: '请输入正确的电话号码'
          });
          return false;
      }
     }
    let piclist = ''
    let imgUrl = []
    if(this.data.imgArr.length>0){
      for(let i=0;i<this.data.imgArr.length;i++){
        imgUrl.push(this.data.imgArr[i].data)
      }
      piclist = imgUrl.join('|')
    }
    //console.log('piclist',piclist)
    this.setData({
      picturesUrl:piclist
    })
    if(this.data.textarea){
      if(this.data.submitF){
        this._submitCorrection()
        this.setData({submitF:false})
      }
    } else{
      my.showToast({
        content: '请输入问题描述！'
      });
    }
  },
  //提交
  async _submitCorrection() {
    let result = await submitCorrection({
      description: this.data.textarea,
      picturesUrl: this.data.picturesUrl,
      businessId: this.data.id,
      category: this.data.type,
      telephone: this.data.phone,
    })
    //console.log('提交',result)
    if(result.data.code === 0){
       my.alert({
        title: '提交成功',
        content: '感谢您的积极反馈，我们将认真采纳您的建议积极排查问题',
        success: () => {
          my.navigateBack()
        },
      });
    }else{
      my.alert({
        title: '提交失败',
        content: result.data.message,
      });
      this.setData({submitF:true})
    }
  },
});
