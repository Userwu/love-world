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
  render(){
    const {imageUrl,title} = this.props.data
    return (
      <figure className="img-figure">
        <img src={imageUrl} alt={title}/>
        <figcaption>
          <h2 className="img-title">{title}</h2>
        </figcaption>
      </figure>
    )
  }
}
