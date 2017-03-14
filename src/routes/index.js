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
import {Router,Route,browserHistory,IndexRoute} from 'react-router'
import AppContainer from './../containers/AppContainer'
import HouseKeeper from './App'
import Home from './Home'

export default (
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={Home}/>
        <Route path="gallery" component={HouseKeeper}/>
      </Route>
    </Router>
  )
