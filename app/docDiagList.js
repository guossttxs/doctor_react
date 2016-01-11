import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';

/**************************************************
 * 组件：医生诊断多选框
 * 属性：doctorid
 * 使用示例: <DiagList doctorid={2} />
 * ***********************************************/

//医生诊断多选框
class DiagList extends React.Component {
    constructor() {
        super(); 
        this.state = {
            diaglist:[] 
        }
    }

    componentDidMount() {
        const doctorid = parseInt(this.props.doctorid);
        var comment = {"doctor_id":doctorid};

        $.ajax({
            url:this.props.urlInfo.url, 
            dataType: "json",
            type:this.props.urlInfo.type,
            data:comment,
            success: (data) => {
                this.setState({diaglist:data.docdiag_list});
            },

            error: (xhr, status, err) => {
                alert("获取医生诊断列表失败"); 
            }
        });
    }

    getValue() {
        var list = [];

        $('.docdiag-list option:selected').each(function(i, selected){
            list[i] = $(selected).val();
        });

        return list;
    }

    render() {
        let rows = [];
        let diags = this.state.diaglist;
        diags.forEach((item,index)=>{
            rows.push(
               <option key={'option'+index.toString()} value={item.id}>{item.diagTag}</option>
                )
        });

    return (
    <div>
        <select className="docdiag-list" multiple="multiple">
        {rows}
        </select>
    </div>
    ); 
    }
}

DiagList.defaultProps = {
    urlInfo:{
//获取医生诊断列表的url
        url:"/doctor/docDiags/", 
        type:"POST"
    }
}

export default DiagList;
