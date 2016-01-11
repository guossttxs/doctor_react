import React from 'react';
import './myinfo.css';
import './pub.js'

class AddTypical extends React.Component {
    constructor(props) {
        super(props);
    }

    //将form中的值转换为键值对。
    getFormJson(frm) {
        var o = {};
        var a = $(frm).serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }

    //将form转为AJAX提交
     ajaxSubmit(frm, fn) {
         var dataPara = this.getFormJson(frm)
         if (dataPara.description == '') {
            alert("主诉不能为空");
            {this.refs.desp.focus()}
            return null;
         }
        $.ajax({
            url: frm.action,
            type: frm.method,
            data: dataPara,
            success: fn
        });
    }

    saveInfo() {
        this.ajaxSubmit(this.refs.typical_fm,(ret)=>{
            if (ret == 'error') {
                alert('添加病例失败');
            }else {
                alert('病例添加成功');
                this.props.callback();
            }
        })
    }

    render() {
        return(
            <div  className="showinfo-div">
                <form ref="typical_fm" method="POST" action={"/doctor/addTypical/?doctorid="+this.props.doctorid} >
                    <p>
                        主    诉:
                            &nbsp;&nbsp;&nbsp;
                            <input type="text" ref="desp" name="description" />
                    </p>
                     <p> 
                        病情概要:
                            <br/>
                            <textarea name="details"></textarea>
                    </p>
                     <p>
                        检     查:
                            <br/>
                            <textarea name="check"></textarea>
                    </p>
                     <p>
                        曾服用药物:
                            &nbsp;&nbsp;
                            <input type="text" name="medicine"/>
                    </p>
                     <p>
                        诊    断:
                            &nbsp;&nbsp;&nbsp;
                            <input type="text" name="diagnose" />
                    </p>
                    <p>
                        处    方:
                            &nbsp;&nbsp;&nbsp;
                            <input type="text" name="prescription" />
                    </p>
                    <p>
                        治疗进展:
                            <br/>
                            <textarea name="progress"></textarea>
                    </p>
                    <p>
                        治疗心得:
                            <br/>
                            <textarea name="summary"></textarea>
                    </p>
                    <br/>
                     <div className="div-rit">
                        <span>
                            <input type="button"  className="editor-input-btn" value="关闭"  onClick={()=>{this.props.callback()}}/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="button"  className="editor-input-btn" value="保存" onClick={()=>{this.saveInfo()}} />
                        </span>
                    </div>
                </form>
            </div>
        )
    }
}


class Editor extends React.Component {
    constructor(props) {
        super(props);
    }

    getFormJson(frm) {
        var o = {};
        var a = $(frm).serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }

    //将form转为AJAX提交
     ajaxSubmit(frm, fn) {
         var dataPara = this.getFormJson(frm)
         if (dataPara.description == '') {
            alert("主诉不能为空");
            {this.refs.desp.focus()}
            return null;
         }
        $.ajax({
            url: frm.action,
            type: frm.method,
            data: dataPara,
            success: fn
        });
    }


    saveInfo() {
         this.ajaxSubmit(this.refs.typical_fm,(ret)=>{
            if(ret == "success") {
                alert("病例修改成功");
                this.props.update();
            }else {
                alert("病例修改失败");
            }
         })
    }

    deleteCase() {
        $.ajax({
            url:"/doctor/delTypical/",
            method:"POST",
            data: $.param({
                'typicalid': this.props.data.id,
            }),
            traditional: true,
            success:(ret)=>{
                if(ret == 'success') {
                    alert("删除病例成功");
                    this.props.update();
                }              
            }
        })      
    }

    render() {
        let data = this.props.data;
        return(
            <div  className="showinfo-div">
                <form ref="typical_fm" method="POST" action={"/doctor/updateTypical/?caseid="+data.id}>
                    <p>
                        主    诉:
                            &nbsp;&nbsp;&nbsp;
                            <input type="text" ref="desp" defaultValue={data.description} name="description" />
                    </p>
                     <p> 
                        病情概要:
                            <br/>
                            <textarea name="details" defaultValue={data.details}></textarea>
                    </p>
                     <p>
                        检     查:
                            <br/>
                            <textarea name="check" defaultValue={data.check}></textarea>
                    </p>
                     <p>
                        曾服用药物:
                            &nbsp;&nbsp;
                            <input type="text" defaultValue={data.medicine} name="medicine"/>
                    </p>
                     <p>
                        诊    断:
                            &nbsp;&nbsp;&nbsp;
                            <input type="text" defaultValue={data.diagnose} name="diagnose" />
                    </p>
                    <p>
                        处    方:
                            &nbsp;&nbsp;&nbsp;
                            <input type="text" defaultValue={data.prescription} name="prescription" />
                    </p>
                    <p>
                        治疗进展:
                            <br/>
                            <textarea name="progress" defaultValue={data.progress}></textarea>
                    </p>
                    <p>
                        治疗心得:
                            <br/>
                            <textarea name="summary" defaultValue={data.summary}></textarea>
                    </p>
                    <br/>
                     <div className="div-rit">
                        <span>
                            <input type="button"  className="editor-input-btn" value="关闭"  onClick={()=>{this.props.callback()}}/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="button"  className="editor-input-btn" value="删除"  onClick={()=>{this.deleteCase()}}/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="button"  className="editor-input-btn" value="保存" onClick={()=>{this.saveInfo()}} />
                        </span>
                    </div>
                </form>
            </div>
        )
    }
}

class ShowList extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {
        let data = this.props.data;
        this.props.callback(data);
    }
    render() {
        let data = this.props.data;
        return(
            <div>
                <br/>
                <div className="case-title">
                    <p>{data.description}<span className="eidtor-case"  onClick={()=>{this.handleClick()}}>编辑</span></p>
                </div>
                <div>
                    <p className="case-pres">{data.details}{data.check}{data.medicine}{data.diagnose}{data.prescription}{data.progress}</p>
                    <br/>
                    <p className="case-pres">总结:{data.summary}</p>
                </div>
            </div>
        )
    }
}

class Show extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="showinfo-div">
                {this.props.data}
                <div>
                    <button className="myinfo-editor-btn" onClick={()=>{this.props.callback()}}>增加病例</button>
                </div>
            </div>
        )
    }
}


class TypicalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            show:true,
            cur:[],
        }
    }

    editorCallback(value) {
        this.setState({show:false,
                                cur:value,
                            })
    }

    showCallBack() {
        this.setState({show:true});
    }

    updateCallBack() {
        this.setState({show:true});
        this.getdepartList();
    }

    initList(ret) {
        let rows = [];
        if (ret.length == 0) {
            rows.push(
                <div></div>
            );
        }else {
            ret.forEach((item,index) => {
                rows.push(<ShowList  callback ={(val)=>{this.editorCallback(val)}} data={item} key={"list-"+index} />);
            }
        )}
        this.setState({list:rows});
        
    }


    getdepartList() {
        $.ajax({
            url:"/doctor/getTypical/",
            method:"POST",
            data: $.param({
                'doctor_id': this.props.doctorid,
            }),
            dataType:"json",
            traditional: true,
            success:(ret)=>{
                this.initList(ret);                
            }
        })
    }

    componentDidMount() {
        this.getdepartList();  
    }

    render() {
        let casepage;    
        if (this.state.show) {
            if(this.state.list.length == 0) {
                casepage = (<div></div>)
            }else {
                casepage = (<Show data={this.state.list} callback={()=>{this.props.callback()}} />)
            }
        }else {
            casepage = (<Editor data={this.state.cur} update={()=>{this.updateCallBack()}} callback={()=>{this.showCallBack()}} />)
        }
        return(
            <div>
                {casepage}
            </div>
        )
    }
}


class TypicalCase extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showcase:true,
        }
    }

    showCallBack() {
        this.setState({showcase:!this.state.showcase});
    }

    render() {
        let casePage;
        if (this.state.showcase) {
            casePage = <TypicalList doctorid={this.props.doctorid}  callback={()=>{this.showCallBack()}} />
        }else {
            casePage = <AddTypical doctorid={this.props.doctorid} callback={()=>{this.showCallBack()}} />
        }
        return(
            <div>
                {casePage}
            </div>
        )
    }   
}

export default TypicalCase;