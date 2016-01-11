import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';

const Colors = require('material-ui/lib/styles/colors');
const TextField = require('material-ui/lib/text-field');

const RaisedButton = require('material-ui/lib/raised-button');

const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');
const Avatar = require('material-ui/lib/avatar');

import PatListItem from './patlistitem.js'
import PatSearch from './patsearch.js'

import './global.css';


class PatList extends React.Component{
  constructor(props) {
    super();
    this.state = {
      name:'zhangsan',
    };
  }

  render() {
    return (
        <div>
            <PatSearch name="按姓名或电话号码搜索">
                            </PatSearch>
            
        </div>
    );
  } 
}

export default PatList;
