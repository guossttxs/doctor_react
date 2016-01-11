import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';

const TextField = require('material-ui/lib/text-field')
const RaisedButton = require('material-ui/lib/raised-button');
const Colors = require('material-ui/lib/styles/colors');

import './global.css';
import './patlist.css';

/********************************************************
 * 组件：医生订单列表 
 * 属性：doctorid
 * 使用示例：<OrderWithDoctorBox doctorid={2} />
 * ******************************************************/
 
 
function orderStateChange(num){
        if (num == 1)
            return '预约中'
        else if (num == '2')
            return '完成预约'
        else if (num == '3')
            return '完成治疗'
        else if (num == '4')
            return '完成售后'
        else
            return '未知状态'
}

function payStateChange(num){
    if(num == 0)
        return '未支付'
    else if(num == 1)
        return '已支付'
    else
        return '未知状态'
}

//医生订单列表
class OrderWithDoctorBox extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            pageName:'OrderWithDoctorList',
            pageArgs:{},
            orderList:[],
        }
    }

    //后台请求订单列表数据
    componentDidMount() {
        const doctorid = this.props.doctorid; 
        var comment = {"doctor_id":doctorid};

        $.ajax({
            url: this.props.urlInfo.url,
            dataType:"json",
            type:this.props.urlInfo.type,
            data:comment,
            success: (data) => {
                //订单列表
                this.setState({orderList:data.order_list});
            },

            error: (xhr, status, err) => {
                alert("获取医生订单列表失败"); 
            }
        });
    
    }

    setPage(pageName,args){
        switch(pageName){
            case 'OrderWithDoctorList':
                this.setState({pageName:'OrderWithDoctorList'});
                break;
            case 'OrderWithDoctorInfo':
                this.setState({pageName:'OrderWithDoctorInfo'});
                this.setState({pageArgs:args});
        }
    }

    render() {
        let Child = {};

        if(this.state.pageName == "OrderWithDoctorInfo" && this.state.pageArgs!={}) {
            //订单详情
            Child = (
                <OrderWithDoctorInfo info={this.state.pageArgs} 
                setPage={(p,a)=>{this.setPage(p,a)}} />
            )
        }
        else if (this.state.pageName == "OrderWithDoctorList") {
            //订单列表
            Child = (
                    <OrderWithDoctorList info={this.state.orderList} 
                    setPage={(p,a)=>{this.setPage(p,a)}}  />
            ) 
        }

        return (
            <div>         
                {Child}
            </div>
        )
    
    }
}

//医生订单列表
class OrderWithDoctorList extends React.Component {

    constructor() {
        super(); 
    }

    render() {
        let rows = []; 
        let orderList = this.props.info;
        orderList.forEach((item,index) => {
            rows.push(
                <OrderWithDoctorItem key={'dorder'+index.toString()} 
                item={item} 
                setPage={(p,a)=>{this.props.setPage(p,a)}} />
            ) 
        });

        return (
            <div className="list-container"> 
                <div className="listItem-container roundbtn orange-bg full-panel">
                        <p className="white super-large-font-size">订单列表</p>
                </div>
                {rows}
            </div>
        )
    }
}

//医生订单列表中的单项
class OrderWithDoctorItem extends React.Component {
    constructor() {
        super(); 
    }

    onClick() {
        this.props.setPage('OrderWithDoctorInfo', this.props.item); 
    }

    render() {
        return (
            //根据要显示的内容，后台进行封装(时间，患者，状态)
            <div>
            
            
            <div onClick={()=>{this.onClick()}} className="listItem-container  normal-btn-bd orange-bd roundbtn full-panel">         


            <div className="square-btn left-float">
                <p className="orange">
                    {this.props.item.cctime}
                </p>
            </div>
            <div className="square-btn left-float">
                <p className="orange">
                    {this.props.item.pat[0]}
                </p>
            </div>
            <div className="square-btn left-float">
                <p className="orange">
                    {orderStateChange(this.props.item.status)}
                </p>
            </div>
            </div>
            </div>
        ) 
    }

}

//医生订单详细信息
class OrderWithDoctorInfo extends React.Component {
    constructor() {
        super(); 
    }

    backWard() {
            this.props.setPage('OrderWithDoctorList', this.props.item); 
         }

    render() {
        //在这里进行数据格式转换之类的操作，如没有，可不用
        let rows=[];
        let consults = this.props.info.consults;

        consults.forEach((item, index) => {
      
            rows.push(
               <div> 
               {item.question}
               <br />
               {item.answer}
               <br />
               </div>
                ) 
            
        });

        return (
            <div>
                <div className="listItem-container  no-bd orange-bg roundbtn full-panel">
                    <div className="square-btn left-float">
                        <p className="white large-font-size">{this.props.info.pat[0]}</p>
                    </div>
                    <div className="square-btn right-float">
                        <p className="white large-font-size">{this.props.info.diags}</p>
                    </div>
                </div>
                <div className="listItem-container  normal-btn-bd orange-bd roundbtn full-panel">
                    <div className="no-bd roundbtn full-panel">
                        <div className="  left-float">
                            <p className="black   large-font-size">订单编号：</p>
                        </div>
                        <div className="  right-float">
                            <p className="black   large-font-size">{this.props.info.sn}</p>
                        </div>
                    </div>
                    <div className="no-bd roundbtn full-panel">
                        <div className="  left-float">
                            <p className="black  large-font-size">患者姓名：</p>
                        </div>
                        <div className="  right-float">
                            <p className="black   large-font-size">{this.props.info.pat[0]}</p>
                        </div>
                    </div>
                    <div className="no-bd roundbtn full-panel">
                        <div className="  left-float">
                            <p className="black   large-font-size">来电时间： </p>
                        </div>
                        <div className="  right-float">
                            <p className="black   large-font-size">{this.props.info.ctime}</p>
                        </div>
                    </div>
                    <div className="no-bd roundbtn full-panel">
                        <div className="  left-float">
                            <p className="black   large-font-size">治疗时间： </p>
                        </div>
                        <div className="  right-float">
                            <p className="black   large-font-size">{this.props.info.ttime}</p>
                        </div>
                    </div>
                    <div className="no-bd roundbtn full-panel">
                        <div className="  left-float">
                            <p className="black   large-font-size">近期服用药物及剂量：</p>
                        </div>
                        <div className="  right-float">
                            <p className="black   large-font-size">{this.props.info.recentMed}</p>
                        </div>
                    </div>
                    <div className="no-bd roundbtn full-panel">
                        <div className="  left-float">
                            <p className="black   large-font-size">近期症状及改善情况: </p>
                        </div>
                        <div className="  right-float">
                            <p className="black   large-font-size">{this.props.info.recentImprove} </p>
                        </div>
                    </div>
                    <div className="no-bd roundbtn full-panel">
                        <div >
                            <p className="black   large-font-size">患者咨询目的： </p>
                        </div>
                        <div className=" full-panel normal-btn-bd black-light-bd">
                           {rows}
                        </div>
                    </div>
                </div>
                <div className="no-bd full-panel">
                    <div className="right-float">
                    <RaisedButton 
                    label="返回" 
                    primary={true} 
                    secondary={true} 
                    labelColor='white'
                    backgroundColor='orange'
                    style={{
                        border:'solid 1px white',
                        }} 
                    onClick={()=>{this.backWard()}} />
                    </div>
                </div>
                 
            </div>
        ) 
    }
}

OrderWithDoctorBox.defaultProps = {
    urlInfo:{
        url:"/doctor/docOrders/",
        type:"POST"
    }
}

export default OrderWithDoctorBox;
