const app = getApp();
import {queryAllValidMaterials,uploadPic} from '../../config/api'

Page({
  data: {
    clArr:[],
    urlLink:'',
    selCl:[],
    selLeng:0,
    typeBack:'',
    changebtncol:false,
    questionId:'',
    imgUp:''
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
    my.chooseImage({
      success: (res) => {
        let imgSrc = res.apFilePaths[0];
        console.log(imgSrc)
        //this._uploadPic(imgSrc)
      },
    });
  },
  //上传图片
  async _uploadPic(img) {
    let result = await uploadPic({
      file:img
    },{'Content-Type': 'multipart/form-data'})
    console.log('图片',result)
    
  },
  //点击提交按钮
  submitFn() {
    this.setData({changebtncol:true,})
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
