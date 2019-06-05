const app = getApp();
import {formalBusinessGuidedt} from '../../config/api'
import parse from 'mini-html-parser2';
Page({
  data: {
   id:'',
   detail:[],
   nodesTJ:[],
   nodesQD:[],
   nodesLC:[],
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
      let date = result.data.data.createTime.substring(0, 10);
      let newdate = `detail.createTime`
      this.setData({
        detail:result.data.data,
        [newdate]:date,
      })
      this.changeNode()
  },
  changeNode() {
    let htmlTJ = this.data.detail.businessCondition;
     let htmlQD = this.data.detail.detailedList;
      let htmlLC = this.data.detail.businesssProcess;
    parse(htmlTJ, (err, nodes) => {
      if (!err) {
        this.setData({
          nodesTJ:nodes,
        });
      }
    })
    parse(htmlQD, (err, nodes) => {
      if (!err) {
        this.setData({
          nodesQD:nodes,
        });
      }
    })
    parse(htmlLC, (err, nodes) => {
      if (!err) {
        this.setData({
          nodesLC:nodes,
        });
      }
    })
  },
});
