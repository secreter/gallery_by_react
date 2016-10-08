require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ImgFigure from './imgFigure.js';
import {findDOMNode} from 'react-dom';

let imageArr=require('../data/images.json');

class AppComponent extends React.Component {
  state = {
    imgsArrangeArr:[
      {
        pos:{
          left:0,
          top:0
        },
        rotate:0,
        isInverse:false,  //图片正反面
        isCenter:false
      }
    ]


  };
  constant={
    centerPos:{
      left:0,
      top:0
    },
    hPosRange:{
      leftSecX:[],
      rightSecX:[],
      y:[]
    },
    vPosRange:{
      topY:[],
      x:[]
    }
  }
  rangeRandom(a,b){
    return Math.ceil(Math.random()*(b-a)+a)
  }
  get30DegRandom(){
    return (Math.random()>0.5?'':'-') + Math.ceil(Math.random()*30)
  }
  //图片加载后计算每张图片的位置
  componentDidMount(){
    //先拿到舞台的大小
    var stage=findDOMNode(this.refs.stage)
    var stageW=stage.scrollWidth
    var stageH=stage.scrollHeight
    var halfStageW=stageW/2
    var halfStageH=stageH/2
    //拿到图片大小
    var img=findDOMNode(this.refs.imgFigure0)
    var imgW=img.scrollWidth
    var imgH=img.scrollHeight
    var halfImgW=imgW/2
    var halfImgH=imgH/2
    //中心图片位置
    this.constant.centerPos={
      left: halfStageW-halfImgW,
      top:halfStageH-halfImgH
    }
    //计算左侧右侧图片排布取值范围
    this.constant.hPosRange.leftSecX[0]=-halfImgW
    this.constant.hPosRange.leftSecX[1]=halfStageW-imgW
    this.constant.hPosRange.rightSecX[0]=halfStageW+halfImgW
    this.constant.hPosRange.rightSecX[1]=stageW-halfImgW
    this.constant.hPosRange.y[0]=-halfImgH
    this.constant.hPosRange.y[1]=stageH-halfImgH

    //计算上侧排布取值范围
    this.constant.vPosRange.topY[0]=-halfImgH
    this.constant.vPosRange.topY[1]=halfStageH-halfImgH*3
    this.constant.vPosRange.x[0]=halfStageW-halfImgW
    this.constant.vPosRange.x[1]=halfStageW
    this.reArrange(0)
  }
  //重新布局所有图片
  reArrange(centerIndex){
    var imgsArr=this.state.imgsArrangeArr
    var constant=this.constant
    var hPosRange=constant.hPosRange
    var vPosRange=constant.vPosRange

    //上侧有0或1张图片
    var topImgArr=[]
    var topImgNum=Math.ceil(Math.random()*2)
    var topImgSpliceIndex=0
    //中间图片
    var centerImgArr=imgsArr.splice(centerIndex,1)

    //让中心图片居中
    centerImgArr[0].pos=constant.centerPos
    centerImgArr[0].rotate=0
    centerImgArr[0].isInverse=false
    centerImgArr[0].isCenter=true
    //取出要布局上侧的图片
    topImgSpliceIndex=Math.ceil(Math.random()*(imgsArr.length-topImgNum))
    topImgArr=imgsArr.splice(topImgSpliceIndex,topImgNum)
    //布局位于上侧的图片
    topImgArr.forEach((val,index)=>{
      topImgArr[index]={
        pos:{
          top: this.rangeRandom(vPosRange.topY[0],vPosRange.topY[1]),
          left: this.rangeRandom(vPosRange.x[0],vPosRange.x[1])
        },
        rotate:this.get30DegRandom(),
        isCenter:false
      }
    })

    //布局左右两侧的图片
    for(var i= 0,j=imgsArr.length,k=j/2;i<j;i++){
      var range=null
      if(i<k){
        range=hPosRange.leftSecX
      }else{
        range=hPosRange.rightSecX
      }
      imgsArr[i]={
        pos:{
          top: this.rangeRandom(hPosRange.y[0],hPosRange.y[1]),
          left: this.rangeRandom(range[0],range[1])
        },
        rotate:this.get30DegRandom(),
        isCenter:false
      }

    }
    if(topImgArr&&topImgArr[0]){
      imgsArr.splice(topImgSpliceIndex,0,topImgArr[0])
    }
    imgsArr.splice(centerIndex,0,centerImgArr[0])
    this.setState({
      imgsArrangeArr:imgsArr
    })
  }
  //翻转图片，用闭包函数
  inverse(index){
    return ()=>{
      var imgsArrangeArr=this.state.imgsArrangeArr
      imgsArrangeArr[index].isInverse=!imgsArrangeArr[index].isInverse
      this.setState({
        imgsArrangeArr:imgsArrangeArr
      })
    }
  }
  //居中图片，用闭包
  center(index){
    return ()=>{
      this.reArrange(index)
    }
  }
  render() {
    let controllerUnits=[];
    let imgFigures=[];
    imageArr.forEach((obj,index) => {
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index]={
          pos:{
            left:0,
            top:0
          },
          rotate:0
        }
      }
      imgFigures.push(<ImgFigure key={'key_'+index}
                                 data={obj}
                                 ref={'imgFigure'+index}
                                 arrange={this.state.imgsArrangeArr[index]}
                                 inverse={this.inverse(index)}
                                 center={this.center(index)}
      />)
    });
    return (
      //<div className="index">
      //  <img src={yeomanImage} alt="Yeoman Generator" />
      //  <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      //</div>
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="img-nav">
          {controllerUnits}
        </nav>

      </section>
    );
  }
}



export default AppComponent;
