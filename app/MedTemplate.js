import React from 'react';
import './myinfo.css';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';

class AddModel extends React.Component {
    constructor(props) {
        super(props);
        this.num = 0;
        this.state={
            mlist:[],
        }
    }

    tagFieldBlur(event) {
        if (event.target.value=='') {
            alert('不能为空');
            this.refs.diatag.focus();
        }
    }

    delmode(val) {
        let num = $(val.target).attr('data');
        num = parseInt(num);
        let rows = this.state.mlist;
        rows[num] = [];
        this.setState({mlist:rows});
    }

    submitMod() {
        let name= this.refs.diatag.value;
        let nodes = {};
        let num = 0;
        nodes['method'] = [];
        $(".med").children().map((index,item)=>{
            let val = [];
            
            let dos = $(item).children()[1];
            var dosvalue = $(dos).children()[1].value;

            let date = $(item).children()[2];
            let datevalue = $(date).children()[1].value;

            let method = '';
            let checkbox = $(item).children()[0];
            
            $(checkbox).children('input').map((index,item)=>{
                if(index < 3) {
                    if(item.checked == true) {
                        method += (dosvalue+'d');
                    }else {
                        method += ('d');
                    }
                }else {
                     if(item.checked == true) {
                        method += dosvalue;
                    }
                }
            });
            num ++;
            val.push(datevalue);
            val.push(method);
            nodes['method'].push(val);
        })
        nodes['name'] = name;
        nodes['medicine'] = this.props.name[0];
        nodes['doctor'] = this.props.doctorid;
        nodes['count'] = num;
        console.info(nodes);
        $.ajax({
            method:'POST',
            url:'/doctor/addModel/',
            data:$.param(nodes),
            success:(ret)=>{
                if(ret == 'success') {
                    alert('模板添加成功');
                    this.props.callback();
                }else {
                    alert('该模板名称已存在');
                    this.refs.diatag.focus();
                }
            }
        })
    }

    addmod() {
        let mod = (<div key={'medkey-'+this.num} className="add-model-div">
        <div>服药时间:
        <input type="checkbox" value="0"/>早上
        &nbsp;&nbsp;&nbsp;
        <input type="checkbox" value="1"/>中午
        &nbsp;&nbsp;&nbsp;
        <input type="checkbox" value="2"/>晚上
        &nbsp;&nbsp;&nbsp;
        <input type="checkbox" value="3"/>睡前
        &nbsp;&nbsp;&nbsp;
        </div>
         <div>
        服用剂量:
        <input
        className="dostime" defaultValue="0" onBlur={(event)=>{this.initInputBlur(event)}} onFocus={(event)=>{this.initInputFocus(event)}} type="text"/>{this.props.name[1]}/次
        </div>
        <div>
        服用周期:
        <input type="text" defaultValue="0" onBlur={(event)=>{this.initInputBlur(event)}} onFocus={(event)=>{this.initInputFocus(event)}} />天
        </div>
        <div>
        <div className='model-btn-rit'>
        <button className="del-btn"  data={this.num} onClick={(val)=>{this.delmode(val)}}>删除</button>
        <button className="add-btn" onClick={()=>{this.addmod()}}>调量</button>
        </div>
        <div className='clear'>
        </div>
        </div>
        </div>);
        this.num ++;
        let rows = this.state.mlist;
        rows.push(mod);
        this.setState({mlist:rows});
    }

    initInputFocus(event) {
        if(event.target.value == '0') {
            event.target.value = '';
        }
    }

    initInputBlur(event) {
        if(event.target.value == '') {
            event.target.value = '0';
        }
    }

    render() {
        return(
            <div className="model-show-div">
                <div>
                    模板名称:
                    <input ref="diatag" placeholder="xx药xx天"/>
                </div>
                <div className='med'>
                    <div className='add-model-div'>
                        <div>
                        服药时间:    
                        <input type='checkbox' value='0'/>早上
                        &nbsp;&nbsp;&nbsp;
                        <input type='checkbox' value='1'/>中午
                        &nbsp;&nbsp;&nbsp;
                        <input type='checkbox' value='2'/>晚上
                        &nbsp;&nbsp;&nbsp;
                        <input type='checkbox' value='3'/>睡前
                        &nbsp;&nbsp;&nbsp;
                        </div>
                        <div>
                            服用剂量:
                            <input type="text" defaultValue="0"  onBlur={(event)=>{this.initInputBlur(event)}} onFocus={(event)=>{this.initInputFocus(event)}} className="dostime" />{this.props.name[1]}/次
                        </div>
                        <div>
                            服用周期:
                            <input type="text" onBlur={(event)=>{this.initInputBlur(event)}} onFocus={(event)=>{this.initInputFocus(event)}} defaultValue="0" />天
                        </div>
                        <div>
                        <div className="model-btn-rit">
                            <button className='add-btn' onClick={()=>{this.addmod()}}>调量</button>
                        </div>
                        <div className="clear">
                        </div>
                        </div>
                    </div>
                    {this.state.mlist}
                </div>
                <br/>
                <div className="model-btn-rit">
                <button onClick={()=>{this.props.callback()}}>关闭</button>
                <button onClick={()=>{this.submitMod()}}>提交</button>
                </div>
            </div>
        )
    }
}


class Model extends React.Component {
    constructor(props) {
        super(props);
    }

    initMthod(value,index) {
        return (<tr key={'tr-'+index}>
            <td>{value.time}</td>
            <td>{value.dosage}{this.props.name[1]}</td>
            <td>{value.days}天</td>
            </tr>)
    }

    tableMethod(value) {
        let rows = [];
        value.forEach((item,index)=>{
            let met = this.initMthod(item,index);
            rows.push(met)
        })
        return (<table className="model-method">
            <tbody>
            {rows}
            </tbody>
            </table>);
    }

    delMode(value) {
        $.ajax({
            method:'POST',
            url:'/doctor/delModel/',
            data:{id:value['val']},
            success:(ret)=>{
                alert("模板删除成功");
                this.props.showback();
            }
        })
    }

    initPage() {
        if(this.props.data.length == 0) {
            return (<div></div>)
        }else {
            let rows = [];
            let data = this.props.data;
            data.forEach((item,index)=>{
                let model  = (<div key={'model'+index} className="model-method-div">
                    <div className="model-title-div">
                    <span>{item.name}</span>
                    <span className="model-del-sp" onClick={({val = item.id})=>{this.delMode({val})}}>删除</span>
                    </div>
                    {this.tableMethod(item.method)}
                    </div>)
                rows.push(model);
            })
            return rows;
        }
    }

    render() {
        let model = this.initPage();
        return(
            <div className="model-show-div">
                {model}
                <div className="model-btn-rit">
                <button onClick={()=>{this.props.medshowback()}}>返回</button>
                <button onClick={()=>{this.props.callback()}}>增加模板</button>
                </div>
            </div>
        )
    }
}

class ModelShow extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            show:true,
            value:[],
        }
    }

    getModel() {
        let doctorid = this.props.doctorid;
        let name = this.props.name;
        $.ajax({
            method:'POST',
            url:'/doctor/getModel/',
            data:{id:doctorid,name:name[0]},
            dataType:'json',
            success:(ret)=>{
                console.info(ret);
                this.setState({value:ret})
            }
        })
    }

    showCallback() {
        this.getModel();
    }

    checkShow() {
        if (this.state.show == true) {
            this.setState({show:false});
        }else{
            this.setState({show:true});
            this.getModel();
        }
    }

    componentDidMount() {
        this.getModel();
    }

    render() {
        let model;
        if (this.state.show) {
            model = <Model  
            name={this.props.name} 
            data={this.state.value} 
            callback={()=>{this.checkShow()}} 
            showback={()=>{this.showCallback()}} 
            medshowback={()=>{this.props.callback()}}/>
        }else {
            model = <AddModel name={this.props.name} doctorid={this.props.doctorid} callback={()=>{this.checkShow()}}/>
        }
        return(
            <div>
               {model}
            </div>
        )
    }
}

class ShowMedicine extends React.Component {
    constructor(props) {
        super(props);
    }

    check(data) {
        this.props.callback(data.med);   
    }

    render() {
        let data = this.props.data;
        
        return(
            <div>
                <br/>
                <p className='title'>
                {this.props.title}
                </p>
                {this.props.data.map( (name,index) => {
                    return <div className='name' key={'medname-'+index} onClick={({med = name})=>{this.check({med})}}><p>{name[0]}</p></div>
                }
                )}
            </div>
        )
    }
}

class MedShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info:[],
            show:true,
        }
    }

    initPage(ret) {
        let rows=[];
        if (ret.length == 0) {
            rows.push(
                <div></div>
            );
        }else {
            for (var key in ret) {
                rows.push(<ShowMedicine callback={(val)=>{this.props.callback(val)}} key={"med-"+key} title={key} data={ret[key]} />)
            }
            
            this.setState({info:rows});
        }
    }

    getMed() {
        let doctorid = this.props.doctorid;
        $.ajax({
            method:'POST',
            url:'/doctor/getMed/',
            data:{id:doctorid},
            dataType:'json',
            success:(ret)=>{
                this.initPage(ret);
            }
        })
    }

    componentDidMount() {
        this.getMed()
    }

    render() {
        return(
            <div className='showMed-div'>
                {this.state.info}
            </div>
        )
    }
}

class MedTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show:true,
            name:'',
        }
    }

    ShowCallBack(value) {
        this.setState({show:!this.state.show,
                                name:value,
                            })
    }

    medShowCallBack() {
        this.setState({show:!this.state.show});
    }

    render() {
        let model;
        if (this.state.show) {
            model = (<MedShow  callback={(val)=>{this.ShowCallBack(val)}} doctorid={this.props.doctorid} />)
        }else {
            model = (<ModelShow  callback={()=>{this.medShowCallBack()}} name={this.state.name} doctorid={this.props.doctorid} />)
        }
        return(
            <div>
                {model}
            </div>
        )
    }
}

export default MedTemplate;