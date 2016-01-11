import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';

import DiagList from './docDiagList';

const TextField = require('material-ui/lib/text-field')
const Colors = require('material-ui/lib/styles/colors');
const FlatButton = require('material-ui/lib/flat-button');
const RaisedButton = require('material-ui/lib/raised-button');
const FloatingActionButton = require('material-ui/lib/floating-action-button');

const styles = require('material-ui/lib/styles');


/*****************************************
 * 组件：添加医生药品
 * 属性：doctorid
 * 使用示例: <DocMedForm doctorid={2} />
 * 备注： 页面需要引用 jquery-form.js
 *
 *****************************************/

//医生药品添加表单
class DocMedForm extends React.Component {
    constructor() {
        super(); 
        this.imgname = '';
    }

    handleSubmit(event) {
        const diaglist = this.refs.diagList.getValue();
        const medName = this.refs.medName.getValue();
        const medunit = this.refs.medunit.getValue();
        const medchant = this.refs.medchant.getValue();
        const meddes = this.refs.meddes.getValue();
        //const img = this.refs.imgpath.value;
        //var arr = this.refs.imgpath.value.split("\\");
        //const imgpath = arr.pop();
        //console.log(imgpath);
        const doctorid = this.props.doctorid;

        var comment = {
       "diaglist":diaglist,
       "medName":medName,
       "medunit":medunit,
       "medchant":medchant,
       "meddes":meddes,
       "imgpath":this.imgname,
       "doctorid":doctorid
        };

        $.ajax({
            url:this.props.urlInfo.url, 
            //dataType:"json",
            type:this.props.urlInfo.type,
            data:comment,
            success: (data) => {
                alert(data); 
            },

            error: (xhr, status, err) => {
                alert('error'); 
            }
        });

    }

    imghandleSubmit(event) {
        var ajax_option = {
            url:"/doctor/imgUpload/", 
            dataType:"json",
            type:"POST",
            success: (data)=> {
                if (data.status == 'success') {
                    alert("上传成功"); 
                    this.imgname = data.imgname;
                }
                else {
                    alert("上传失败"); 
                }
            },

            error: (xhr, status, err) => {
                alert('上传失败');
            }

        }

        $("#imgForm").ajaxSubmit(ajax_option);
    }

    render() {
    return (
        <div className="conpent">
        <DiagList 
        ref="diagList"
        doctorid={this.props.doctorid}
        />

        <TextField 
        ref="medName"
        hintText="请输入药品名" 
        fullWidth={true}
        underlineFocusStyle={{borderColor: Colors.amber900}}
        />              
        <br />

        <TextField 
        ref="medunit"
        hintText="请输入剂量单位" 
        fullWidth={true}
        underlineFocusStyle={{borderColor: Colors.amber900}}
        />              
        <br />

        <TextField 
        ref="medchant"
        hintText="请输入厂家" 
        fullWidth={true}
        underlineFocusStyle={{borderColor: Colors.amber900}}
        />              
        <br />

        <TextField 
        ref="meddes"
        hintText="请输入详细说明" 
        multiLine={true}
        fullWidth={true}
        underlineFocusStyle={{borderColor: Colors.amber900}}
        />              
        <br />

        <form id="imgForm" encType="multipart/form-data" >
        <input 
        ref="imgpath" 
        type="file" accept="image/*" name="pic"/>
        <RaisedButton label="上传" secondary={true} 
        onTouchTap={event=> {this.imghandleSubmit(event)}} 
        />
        </form>
    
        <br/>
        <RaisedButton label="提交" secondary={true} 
        onTouchTap={event=> {this.handleSubmit(event)}} 
        />

        </div>
        );
    }

}

DocMedForm.defaultProps = {
    urlInfo:{
    url:"/doctor/addDocMed/",
    type:"POST"
    }
}

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

