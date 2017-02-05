import React from 'react';
import { render } from 'react-dom';
import HouseKeeper from './containers/App'

const root = document.getElementById('app');

/*if ( __DEV__ ){
  console.log("现在是开发环境!")
}

if (__PROD__) {
  console.log("现在是生产环境")
}*/

render(<HouseKeeper/>, root)
