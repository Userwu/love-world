/**
 * AppContainer
 *  AppContainer.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-02-13 14:06:38
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */
import React, { Component } from 'react'
import './appContainer.scss'
import { Link, IndexLink } from 'react-router'
export default class AppContainer extends Component {
  render() {
    return (
      <div className="stage">
        <nav className = "menu">
          <ul>
            <li>
              <IndexLink to="/" activeClassName="active">首页</IndexLink>
            </li>
            <li>
              <Link to="/gallery" activeClassName="active">画廊</Link>
            </li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
