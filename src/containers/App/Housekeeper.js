/**
 * 舞台管家
 *  Housekeeper.jsx build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-02-04 11:27:29
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

import React, { Component } from 'react'
import ReactDom from 'react-dom'
import './houseKeeper.scss'
import ImageFigure from '../../components/ImageFigure'
var imgDatas = require('../../data/stories.json');
/**
 * 自执行函数，获取图片数据，将图片信息转换成图片url路径信息（webpack中的url-loader，将图片转换成base64）
 * @Author   wuhongxu
 * @DateTime 2017-02-04T02:24:57+0800
*/
(() => {
  imgDatas.map((item, index) => {
    item.imageUrl = require('../../assets/images/' + item.fileName);
  })
})()


/**
 * 舞台管家
 */
export default class HouseKeeper extends Component {

  constructor(props) {
    super(props);
    this.constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: { //水平方向的取值范围
        leftSecx: [0, 0],
        rightSecx: [0, 0],
        y: [0, 0],
      },
      vPosRange: { //垂直方向取值范围
        x: [0, 0],
        topY: [0, 0],
      }
    }
    this.state = {
      imgsArrangeArr: [
        /*{
          pos:{
            left:0,
            right:0
          },
          rotate:0 //旋转角度,
          isInverse:false //图片正反面
          isCenter:false //是否居中
        }*/
      ]
    }
  }

  componentDidMount() {
    var dom = ReactDom.findDOMNode(this.refs.stage);
    var stageW = dom.scrollWidth,
      stageH = dom.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);
    var imgFigureDom = ReactDom.findDOMNode(this.refs.figure0),
      imgW = imgFigureDom.scrollWidth,
      imgH = imgFigureDom.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2)

    this.constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH,
    }

    var hPosRange = this.constant.hPosRange
    hPosRange.leftSecx = [
      -halfImgW, halfStageW - halfImgW * 3
    ]
    hPosRange.rightSecx = [
      halfStageW + halfImgW, stageW - halfImgW
    ]
    hPosRange.y = [
      -halfImgH, stageH - halfImgH
    ]

    var vPosRange = this.constant.vPosRange

    vPosRange.x = [
      halfStageW - imgW, halfStageW
    ]

    vPosRange.topY = [
      -imgH / 2, halfStageH - halfImgH * 3
    ]

    this.rearrage(0);

  }
  /**
   * 重新布局图片
   * @Author   wuhongxu
   * @DateTime 2017-02-04T13:00:17+0800
   * @param    {[integer]}                 centerIndex 居中图片index
   */
  rearrage(centerIndex) {
    const imgsArrangeArr = this.state.imgsArrangeArr,
      constant = this.constant;
    const {centerPos, hPosRange, vPosRange} = constant;

    const {leftSecx, rightSecx, y} = hPosRange,
      {x, topY} = vPosRange;
    var imgsArrangeTopArr = [],
      topImgNum = Math.ceil(Math.random() * 2),
      topImgSpliceIndex = 0,
      imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);


    imgsArrangeCenterArr[0] = {
      pos:centerPos,
      rotate:0,
      isInverse:false,
      isCenter:true,
    }
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));

    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);
    imgsArrangeTopArr.map((item, index) => {
      imgsArrangeTopArr[index] = {
        pos: {
          top: this.getRangeRandom(topY[0], topY[1]),
          left: this.getRangeRandom(x[0], x[1])
        },
        rotate: this.get30DegRandom(),
        isCenter:false,
        isInverse:false,
      }
    })
    for (var i = 0, j = imgsArrangeArr.length, k = j / 2;
      i < j; i++) {
      var hPosRangeLORX = null;

      if (i < k)
        hPosRangeLORX = leftSecx
      else
        hPosRangeLORX = rightSecx
      imgsArrangeArr[i]={
        pos:{
          top: this.getRangeRandom(y[0], y[1]),
          left: this.getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
        },
        rotate:this.get30DegRandom(),
        isInverse:false,
        isCenter:false,
      }
    }
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, ...imgsArrangeTopArr)
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0])
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    })
  }
  /**
   * 获取区间内的一个随机值
   * @Author   wuhongxu
   * @DateTime 2017-02-04T13:12:27+0800
   * @param    {[type]}                 low  [description]
   * @param    {[type]}                 high [description]
   * @return   {[type]}                      [description]
   */
  getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low)
  }
  /**
   * 获取0-30的正负随机值
   * @Author   wuhongxu
   * @DateTime 2017-02-04T13:40:35+0800
   * @return   {[type]}                 [description]
   */
  get30DegRandom() {
    return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30)
  }

  /**
   * 翻转居中图片
   * @Author   wuhongxu
   * @DateTime 2017-02-04T15:44:32+0800
   * @param    {[type]}                 index [description]
   * @return   {[type]}                       [description]
   */
  inverse(index) {
    return () => {
      const {imgsArrangeArr} = this.state
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse

      this.setState({
        imgsArrangeArr: imgsArrangeArr
      })
    }
  }

  center(index) {
    return ()=>this.rearrage(index)
  }

  render() {
    var controllerUnits = [],
      imgFigures = [];

    imgDatas.map((item, index) => {
      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
        }
      }
      imgFigures.push(
        <ImageFigure data={item}
                     key={index + ''}
                     ref={'figure' + index}
                     arrange = {this.state.imgsArrangeArr[index]}
                     inverse={this.inverse(index)}
                     center={this.center(index)}/>
      )
    })
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    )
  }
}
