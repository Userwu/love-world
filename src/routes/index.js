/**
 * index
 *  index.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-02-13 13:47:30
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */
import React,{Component} from 'react'
import {Router,Route,hashHistory,IndexRoute} from 'react-router'
import HouseKeeper from './App'
import AppContainer from './AppContainer'
import Canvas from './Canvas'

export default (
    <Router history={hashHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={Canvas}/>
        <Route path="gallery" component={HouseKeeper}/>
      </Route>
    </Router>
  )
