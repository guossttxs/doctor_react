import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';

const Colors = require('material-ui/lib/styles/colors');
const TextField = require('material-ui/lib/text-field');

const RaisedButton = require('material-ui/lib/raised-button');

const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');

const List = require('material-ui/lib/lists/list');
const ListDivider = require('material-ui/lib/lists/list-divider');
const ListItem = require('material-ui/lib/lists/list-item');

const Avatar = require('material-ui/lib/avatar');

import PatList from './patlist.js';
import OrderWithDoctorBox from './myOrderList'
import DoctorInfo from './doctorInfo'

import './global.css';

class DoctorPage extends React.Component {
    constructor(props) {
        super();
        this.state = {
            patients: [],
        }
    }

    componentDidMount() {
        $.ajax({
            url: "/doctor/patlist/",
            method: "POST",
            data: $.param({
                'doctor_id': 1,
            }),
            traditional: true,
            dataType: 'json',
            success: ret=>{
                let result = eval(ret)
                //console.log(result['doctor_id']);
                //var patstr = $.parseJSON(JSON.stringify(ret))['patients'];
                //console.log(eval(result['patients']));
                this.setState({patients:eval(result['patients'])})
            }
        });
    }


    render() {
        //var props = {
//
        //}
        return(
            <div>
                <Tabs
                 tabItemContainerStyle={{
                     //放下面的时候加上 bottom left position zindex
                    bottom:0, 
                    left: 0,
                    position:'fixed',
                    backgroundColor:'orange', 
                    zIndex:100,
                }}

                //跟随条
                inkBarStyle={{
                    position: 'fixed',
                    backgroundColor:'#e0e0e0',
                    height:'4',
                }}>

                    <Tab 
                        label="我的订单"
                        style={{
                            borderColor:'white',
                            border:'solid 1px',
                        }}>
                       <OrderWithDoctorBox doctorid={2}/> 
                    </Tab>

                    <Tab 
                        label="我的病人"
                        style={{
                                borderColor:'white',
                                border:'solid 1px'
                        }}>
                        <PatList />
                    </Tab>
                    <Tab 
                        label="我的资料"
                        style={{
                                borderColor:'white',
                                border:'solid 1px'
                        }}>
                        <DoctorInfo doctorid={2}/>
                    </Tab>
                    <Tab 
                        label="更多"
                        style={{
                                borderColor:'white',
                                border:'solid 1px'
                        }}>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

ReactDOM.render(
    <DoctorPage />,
    document.getElementById('example')
);

