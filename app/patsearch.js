import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';

const Colors = require('material-ui/lib/styles/colors');
const TextField = require('material-ui/lib/text-field');

const RaisedButton = require('material-ui/lib/raised-button');

import './global.css';


class PatSearch extends React.Component{
  constructor(props) {
    super();
    this.state = {
      name:'zhangsan',
    };
  }

  render() {
    var props = {
        name: this.state.name,
    };
    return (

        <div>
            <div>
                <TextField
                    hintText={this.props.name}
                    value={this.state.propValue}
                    underlineStyle={{
                        borderColor:Colors.grey500,
                    }}
                    underlineFocusStyle={{
                        borderColor: Colors.orange500,
                    }}
                    style={{
                        width: '63%',
                        //height: '36px',
                    }}
                    onChange={this._handleInputChange} />
                    //自定义样式
                <RaisedButton 
                    //linkButton={true} 
                    //href="https://github.com/callemall/material-ui" 
                    secondary={true} 
                    labelColor='white'
                    backgroundColor='orange'
                    labelStyle={{
                        padding: '0px',
                        textAlign: 'center',
                    }}
                    style={{
                        margin: "0 2%",
                    }}
                    label="搜索">
                </RaisedButton>
            </div>
            <div>
                <RaisedButton 
                    //linkButton={true} 
                    //href="https://github.com/callemall/material-ui" 
                    secondary={true} 
                    labelColor='white'
                    backgroundColor='orange'
                    style={{
                        border:'solid 1px white',
                        }}
                    label="今天关注">
                    </RaisedButton>
                <RaisedButton 
                    //linkButton={true} 
                    //href="https://github.com/callemall/material-ui" 
                    secondary={true} 
                    labelColor='white'
                    backgroundColor='orange'
                    labelStyle={{
                        padding: '30px'
                    }}
                    style={{
                        border:'solid 1px white'
                        }}
                    label="刷新">
                    </RaisedButton>
                <RaisedButton 
                    //linkButton={true} 
                    //href="https://github.com/callemall/material-ui" 
                    secondary={true} 
                    labelColor='white'
                    backgroundColor='orange'
                    style={{
                        border:'solid 1px white'
                        }}
                    label="排序">
                    </RaisedButton> 
            </div>  
        </div>
    );
  } 
}

export default PatSearch;
