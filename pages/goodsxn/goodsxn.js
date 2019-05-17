const app = getApp();
import {goodsDetail} from '../../config/api';
import parse from 'mini-html-parser2';

Page({
  data: {
    imgsrc:'../../assets/integral_bg.png',
    goodsId:'',
    goodsArr:[],
    nodes:[],
    noFlag:false,
  },

  onLoad(options) {
    if(options){
      this.setData({
        goodsId:options.id,
      })
      this._goodsDetail()
    }
  },
  onShow() {
    console.log(app.userInfo)
  },
  onReady() {
    
  },
  //商品详情
  async _goodsDetail() {
    let result = await goodsDetail({
      id:this.data.goodsId
    })
    console.log('goods',result)
    if(result.data.code === 0){
      this.setData({
        goodsArr: result.data.data.info
      })
      this.changeNode()
      if(result.data.data.info.goodsNumber < 1){
        this.setData({
          noFlag: true,
        })
      }else if(result.data.data.info.goodsIntegral>app.userInfo.point) {
        this.setData({
          noFlag: true,
        })
      }
    }else{
      console.log(result)
    }
  },
  //点击兑换
  exchange() {
    if(!this.data.noFlag){
      my.confirm({
        title: '确认兑换',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: (result) => {
          console.log(result)
          if(result.confirm){
            my.alert({
              title: '兑换成功',
              buttonText: '确认',
              success: () => {
                
              },
            });
          }
        },
      });
    }
    
  },
  changeNode() {
    let html = this.data.goodsArr.goodsDesc
    parse(html, (err, nodes) => {
      if (!err) {
        this.setData({
          nodes,
        });
      }
    })
    //console.log(this.data.nodes)
  },
});
