/**
 * 单幅图片组件
 *  ImageFigure.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-02-04 02:48:10
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

import React,{Component} from 'react'
import './figure.scss'
export default class ImageFigure extends Component{
  handleClick(e){
    const {isCenter,isInverse} = this.props.arrange;
    if(isCenter)
      this.props.inverse()
    else
      this.props.center()
    e.stopPropagation()
    e.preventDefault()
  }
  render(){
    const {imageUrl,title,desc} = this.props.data;
    const {isCenter} = this.props.arrange;
    var styleObj = {};
    if(this.props.arrange.pos){
      styleObj = this.props.arrange.pos;
    }
    if(this.props.arrange.rotate){
      (['MozTransform','msTransform','WebkitTransform','transform']).map(item=>{
        styleObj[item] = 'rotate('+this.props.arrange.rotate+'deg)';
      })
      
    }
    
    var imageFigureClassName = "img-figure";
    imageFigureClassName+= this.props.arrange.isInverse?' is-inverse':'';
    if(isCenter){
      imageFigureClassName += ' is-center';
    }
    return (
      <figure  className={imageFigureClassName} style={styleObj} onClick = {this.handleClick.bind(this)}>
        <img src={imageUrl} alt={title}/>
        <figcaption>
          <h2 className="img-title">{title}</h2>
          <div className="img-back" onClick={this.handleClick.bind(this)}>
              <p>
                {desc}
              </p>
          </div>
        </figcaption>
        
      </figure>
    )
  }
}
