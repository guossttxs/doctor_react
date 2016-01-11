import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';

const TextField = require('material-ui/lib/text-field')
const RaisedButton = require('material-ui/lib/raised-button');
const Colors = require('material-ui/lib/styles/colors');

/***********************************
 *  组件：添加医生诊断
 *  属性：doctorid
 *  使用示例： <Diagform doctorid={2} />
 * *********************************/

//添加医生诊断
class DiagForm extends React.Component {

    tagFieldBlur(event) {
        if (event.target.value=='') {
            alert('诊断名不能为空');
            this.refs.diatag.focus();
        }
    }

    handleSubmit(event) {
        const tag = this.refs.diatag.getValue();
        const doctorid = this.props.doctorid;

        if (tag==''){
            alert('诊断名不能为空');
            this.refs.diatag.focus();
        }
        else {
        var data = {'doctor_id':doctorid, "tag":tag};
        //请求url
        var desturl = "/doctor/addDocDiag/";

        $.ajax({
            url:desturl,
            type:"POST",
            data:data,
            success: (status)=> {
            //成功处理
                alert(status);
            },
            error:(xhr, status, err) => {
            //失败处理
                alert('添加失败');    
            }
        });
    }
    }

    render() {
        return (
        <div>
        <TextField 
        ref="diatag"
        hintText="请输入医生诊断标签" 
        underlineFocusStyle={{borderColor: Colors.amber900}}
        onBlur={event=> {this.tagFieldBlur(event)}}
        />              

        <RaisedButton label="提交" secondary={true} 
        onTouchTap={event=> {this.handleSubmit(event)}} 
        />
        </div>
    );
    
    }
}

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

