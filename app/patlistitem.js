import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';

const Colors = require('material-ui/lib/styles/colors');
const TextField = require('material-ui/lib/text-field');

const RaisedButton = require('material-ui/lib/raised-button');
const Avatar = require('material-ui/lib/avatar');
import './global.css';


class PatListItem extends React.Component{
      constructor(props) {
        super();
        this.state = {
          selected: false,
          collected: false,
        };
      }

      render() {
        var props = {
            patient_id:32,
        };
        return (
            <div>
                <div>
                       <Avatar src="./xwp.jpg" />
                        <div>
                            <p>a</p>
                        </div>
                        <div>
                            <p>b</p>
                        </div>
                    </div>
            </div>
        );
      } 
    }

export default PatListItem;
