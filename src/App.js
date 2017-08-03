import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import update from 'react-addons-update';
// import createFragment from 'react-addons-create-fragment';
// import TestUtils from 'react-addons-test-utils';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImgFigure from './ImgFigure.js'
import ControllerUnit from './ControllerUnit.js'
import imgDatas from './imgDatas.json';
import styles from './App.css';

var imgDatas2 = (function(imgDataArr){
  for(var i=0,j=imgDataArr.length;i<j;i++){
    var singleImgData = imgDataArr[i];
    singleImgData.imgUrl = require('./img/'+singleImgData.fileName);
    imgDataArr[i] = singleImgData;
  }
  return imgDataArr;
})(imgDatas);

function getRangeRandom(low, high){
  return Math.ceil(Math.random()*(high - low) + low);
}

function get30DegRandom () {
  return (Math.random()>0.5?'':'-')+Math.ceil(Math.random()*30);
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      imgsArrangeArr: []
    };
  }

  center(index) {
    return function (){
      this.rearrange(index);
    }.bind(this);
  }
  Constant = {
    centerPos : {
      left:0,
      top:0
    },
    hPosRange : {
      leftSecX:[0,0],
      rightSecX:[0,0],
      y:[0,0]
    },
    vPosRange : {
      x:[0,0],
      topY:[0,0]
    }
  }
  inverse(index){
    return function(){
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr: imgsArrangeArr
      });
    }.bind(this);
  }
  rearrange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,
        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random()*2),
        topImgSpliceIndex = 0,
        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

    imgsArrangeCenterArr[0] = {
      pos: centerPos,
      rotate: 0,
      isCenter: true,
      isInverse: false
    }

    topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));
    debugger;
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

    imgsArrangeTopArr.forEach(function(value, index){
      imgsArrangeTopArr[index] = {
        pos :{
          top: getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
          left: getRangeRandom(vPosRangeX[0],vPosRangeX[1])
        },
        rotate: get30DegRandom(),
        isCenter: false
      } 
    });
//左右两侧
    for(var i=0,j=imgsArrangeArr.length,k=j/2;i<j;i++){
      let hPosRangeLORX = null;
      if(i < k){
        hPosRangeLORX = hPosRangeLeftSecX;
      } else {
        hPosRangeLORX = hPosRangeRightSecX;
      }

      imgsArrangeArr[i] = {
        pos :{
          top: getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
          left: getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1]),
        },
        rotate: get30DegRandom(),
        isCenter: false
      } 
    }

    if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
    }
    debugger;
    imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    })

  }
  componentDidMount(){
    let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW/2),
        halfStageH = Math.ceil(stageH/2);
    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imageFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW/2),
        halfImgH = Math.ceil(imgH/2);
        debugger;
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }
    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW -halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  }
  componentWillMount() {
    /*debugger;
    let controllerUnits = [];//,
        // imgFigures = [];
    let oriData = {
      pos: {
        left: '0',
        top: '0'
      },
      rotate: 0,
      isInverse: false,
      isCenter: false
    }
    imgDatas2.forEach(function(value,index){
      if(!this.state.imgsArrangeArr[index]){
        //初始化
        
        // this.setState({
        //   imgsArrangeArr[index] : oriData
        // });
      }
      // imgFigures.push(
      //   <ImgFigure data={value} key={'key_'+index} ref={'imageFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />
      // );
    }.bind(this));
    this.setState({
      // imgFigures: imgFigures,
      imgDatas2: imgDatas2,
      controllerUnits: controllerUnits
    })*/
  }
  render() {
    debugger;
    let controllerUnits = [],//this.state.controllerUnits;//,
        imgFigures = [];//this.state.imgFigures;
    imgDatas2.forEach(function(value,index){
      if(!this.state.imgsArrangeArr[index]){
        //初始化
        // createFragment({
        //   value: 
        // });
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: '0',
            top: '0'
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        }
      }
      imgFigures.push(
        <ImgFigure data={value} key={'key_'+index} ref={'imageFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)} />
      );
      controllerUnits.push(
        <ControllerUnit key={'id_'+index} arrange={this.state.imgsArrangeArr[index]} center={this.center(index)} inverse={this.inverse(index)} />
        // <ControllerUnit key={'data-reactid-'+index} />
      )
    }.bind(this));
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
            {imgFigures} 
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}

export default App;
