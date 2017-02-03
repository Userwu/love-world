import React,{Component} from 'react'
import './index.scss'
import ImageFigure from '../../components/ImageFigure'
var imgDatas = require('../../data/stories.json');
/**
 * 自执行函数，获取图片数据，将图片信息转换成图片url路径信息（webpack中的url-loader，将图片转换成base64）
 * @Author   wuhongxu
 * @DateTime 2017-02-04T02:24:57+0800
*/
(()=>{
  imgDatas.map((item,index)=>{
    item.imageUrl = require('../../assets/images/'+item.fileName);
  })
})()
export default class App extends Component{
  render(){
    var controllerUnits = [],
        imgFigures = [];
    imgDatas.map((item)=>{
        imgFigures.push(
            <ImageFigure data={item}/>
          )
    })
    return (
      <section className="stage">
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
