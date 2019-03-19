const app = getApp();
import {queryAllValidMaterials} from '../../config/api'
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
    this._queryAllValidMaterials()
  },
  onReady() {
    
  },
  //获取链接
  getTit(e) {
    this.setData({
      urlLink: e.detail.value,
    });
  },
   //所需材料 列表
  async _queryAllValidMaterials() {
    let result = await queryAllValidMaterials()
   // console.log('材料',result)
    let list = result.data.data
    let newList = list.map((obj,index) => {
      return {
        lists:obj,
        flaga:false
      }
    })
    this.setData({clArr:newList})
  },
  //点击选择材料
  selCLfn(e) {
    let index=e.currentTarget.dataset['index'];
    let sItem = "clArr["+ index + "].flaga";
    if(this.data.clArr[index].flaga){
      this.setData({
        [sItem]:false,
      })
    }else{
      if(this.data.selLeng<3){
        this.setData({
          [sItem]:true,
        })
      }
    }
    let selArr = []
    let that = this
    that.data.clArr.forEach(function (e, i) {
      if(that.data.clArr[i].flaga){
        selArr.push(that.data.clArr[i].name)
      }
    })
    this.setData({selCl:selArr})
    let nowLeng = this.data.selCl.length
    this.setData({selLeng:nowLeng})
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
              this.data.imgArr = this.data.imgArr.concat(list)
              this.setData({imgArr:this.data.imgArr})
              console.log(this.data.imgArr)
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
    my.alert({
      title: '提交成功',
      content: '将在3-6个工作日内审核，审核通过后发放积分',
      success: () => {
        if(this.data.typeBack === '2'){
          my.navigateBack({delta: 2})
        }else{
          my.navigateBack()
        }
      },
    });
  },
});
