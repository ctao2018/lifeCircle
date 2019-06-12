const app = getApp();
import {addAnswerByUser} from '../../config/api'
import env from '../../config/env'

Page({
  data: {
    clArr:[],
    urlLink:'',
    selCl:[],
    selLeng:0,
    typeBack:'',
    changebtncol:false,
    questionId:'',
    imgUp:'',
    textarea:'',
    imgArr:[],
    detailedList:'',
    picturesUrl:'',
    showTK: false,
    qtCL:'',
  },

  onLoad(options) {
     if(options){
      this.setData({
        typeBack:options.typeBack,
        questionId:options.id,
      })
    }
  },
  onShow() {
   
  },
  onReady() {
    
  },
  //获取链接
  getLink(e) {
    this.setData({
      urlLink: e.detail.value,
    });
  },
  //点击上传图片
  upLoadimg() {
    const token = my.getStorageSync({ key: "token" });
    if(this.data.imgArr.length<8){
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
    this.setData({changebtncol:true,})
    this.setData({textarea:e.detail.value.textarea})
    let piclist = ''
    let imgUrl = []
    if(this.data.imgArr.length>0){
      for(let i=0;i<this.data.imgArr.length;i++){
        imgUrl.push(this.data.imgArr[i].data)
      }
      piclist = imgUrl.join('|')
    }
    //console.log('piclist',piclist)
    let dtlist = this.data.selCl.join(',')
    this.setData({
      detailedList:dtlist,
      picturesUrl:piclist
    })
    //console.log(this.data.detailedList)
    if(this.data.textarea || piclist){
     this._addAnswerByUser()
    } else{
      my.showToast({
        content: '请输入答案或者上传图片资料！'
      });
    }
  },
  //提交答案
  async _addAnswerByUser() {
    let result = await addAnswerByUser({
      answer: this.data.textarea,
      detailedList: this.data.detailedList,
      picturesUrl: this.data.picturesUrl,
      questionId: this.data.questionId,
      sourceUrl: this.data.urlLink,
    })
    //console.log('提交',result)
    if(result.data.code === 0){
       my.alert({
        title: '提交成功',
        content: '将在1-3个工作日内审核，审核通过后发放积分',
        success: () => {
          if(this.data.typeBack === '2'){
            my.navigateBack({delta: 2})
          }else{
            my.navigateBack()
          }
        },
      });
    }else{
      my.alert({
        title: '提交失败',
        content: result.data.message,
      });
    }
  },
});
