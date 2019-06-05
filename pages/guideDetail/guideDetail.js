const app = getApp();
import {formalBusinessGuidedt} from '../../config/api'
import parse from 'mini-html-parser2';
Page({
  data: {
   id:'',
   detail:[],
   nodes:[],
  },

  onLoad(options) {
    if(options){
      this.setData({
        id:options.id,
      })
    }
    app.getUrl(2,this.data.id)
  },
  onShow() {
    this.setData({
      detail:[],
    });
    this._formalBusinessGuidedt()
  },
  onReady() {
    
  },
  
  //详情
  async _formalBusinessGuidedt() {
    let result = await formalBusinessGuidedt(this.data.id)
    console.log('详情',result)
      
      this.setData({
        detail:result.data.data
      })
      this.changeNode()
  },
  changeNode() {
    let html = this.data.detail.content
    parse(html, (err, nodes) => {
      if (!err) {
        this.setData({
          nodes,
        });
      }
    })
    console.log(this.data.nodes)
  },
});
