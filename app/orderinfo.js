import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';

const TextField = require('material-ui/lib/text-field')
const RaisedButton = require('material-ui/lib/raised-button');
const Colors = require('material-ui/lib/styles/colors');

/*************************************************************
 *  组件：医生订单详情
 *  属性：订单id
 *  使用示例：<>
 * **********************************************************/

//医生订单详情
class Orderinfo extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            orderinfo:{}
        }
    }

}









let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
