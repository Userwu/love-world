/**
 * 控制组件
 *  ControllerUnit.js build on Windows 
 * @authors wuhongxu (wuhongxu1208@gmail.com)
 * @date    2017-02-04 16:05:26
 * @version $Id$
 * @link <link>https://userwu.github.io/</link>
 * 
 */

import React, { Component } from 'react'
import './controllerUnit.scss'
export default class ControllerUnit extends Component {
    static propTypes = {
        arrange: React.PropTypes.object.isRequired,
        inverse: React.PropTypes.func.isRequired,
        center: React.PropTypes.func.isRequired,
    }

    handleClick() {
        const { isCenter } = this.props.arrange;

        if (isCenter)
            this.props.inverse();
        else
            this.props.center();
    }

    render() {

        var className = 'controller-unit'
        const { arrange } = this.props

        if (arrange.isCenter) {
            className += ' is-center'
        }

        if (arrange.isInverse) {
            className += ' is-inverse'
        }

        return ( < span className = { className }onClick = { this.handleClick.bind(this) } />
        )
    }
}