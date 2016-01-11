import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import './myinfo.css';

class Show extends React.Component {
    constructor(props) {
        super();
        this.state = {
            tab:{},
        }
        
    }

    render() {
        let doctor = this.props.data;
        let icon = <img src="/static/images/matching/iphone6plus/icon/heart.png" />;
        let sp = (<span></span>);
        return(
            <div>
                <div className="img-div-rit">
                    <img  src={"/static/images/matching/iphone6plus/"+doctor.photo} />
                </div>
                <div >
                    <p>
                        <span>姓  名:{doctor.name}</span>     
                    </p>
                    <p>
                        <span>年  龄:{doctor.age}岁</span>
                    </p>
                    <p>
                        <span>性  别:{doctor.sex == 'f' ? '女' : '男'}</span>
                    </p>
                    <p>
                        <span>职  称:{doctor.title}</span>
                    </p>
                    <p>
                        <span>医  院:{doctor.hospital}</span>
                    </p>
                    <p>
                        <span>科  室:{doctor.department}</span>
                    </p>
                    <p>
                        <span>电  话:{doctor.tel}</span>
                    </p>
                    <p>
                        <span>咨询价格:{doctor.price}元/10分钟</span>
                    </p>
                    <p>
                        就诊时间:
                    </p>
                   <table className="doctor-tab">
                        <tbody>
                                <tr>
                                    <th></th>
                                    <th>上午</th>
                                    <th>下午</th>
                                    <th>晚上</th>
                                </tr>
                                <tr>
                                    <th>星期一</th>
                                    <th>{doctor.worktime[0][0] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[0][1] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[0][2] == 0 ? sp : icon}</th>
                                </tr>
                                 <tr>
                                    <th>星期二</th>
                                    <th>{doctor.worktime[1][0] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[1][1] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[1][2] == 0 ? sp : icon}</th>
                                </tr>
                                 <tr>
                                    <th>星期三</th>
                                    <th>{doctor.worktime[2][0] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[2][1] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[2][2] == 0 ? sp : icon}</th>
                                </tr>
                                 <tr>
                                    <th>星期四</th>
                                    <th>{doctor.worktime[3][0] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[3][1] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[3][2] == 0 ? sp : icon}</th>
                                </tr>
                                 <tr>
                                    <th>星期五</th>
                                    <th>{doctor.worktime[4][0] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[4][1] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[4][2] == 0 ? sp : icon}</th>
                                </tr>
                                 <tr>
                                    <th>星期六</th>
                                    <th>{doctor.worktime[5][0] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[5][1] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[5][2] == 0 ? sp : icon}</th>
                                </tr>
                                 <tr>
                                    <th>星期日</th>
                                    <th>{doctor.worktime[6][0] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[6][1] == 0 ? sp : icon}</th>
                                    <th>{doctor.worktime[6][2] == 0 ? sp : icon}</th>
                                </tr>
                        </tbody>
                   </table>
                   <br/>
                    <p>
                        <span>备  注:{doctor.memo}</span>
                    </p>                    
                    <p>
                        <button  className="myinfo-editor-btn" onClick={()=>{this.props.callback()}}>
                             编辑资料
                        </button>
                    </p>
                </div>
            </div>
        )
    }
}

class Editor extends React.Component {
    constructor(props) {
        super();
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
        $.ajax({
            url: frm.action,
            type: frm.method,
            data: dataPara,
            success: fn
        });
    }

    saveInfo() {
        var price = parseFloat(this.refs.price.value);
        if(isNaN(price)) {
            alert("请输入正确的价格");
            return null;
        }
        this.ajaxSubmit(this.refs.fm,(data)=>{
            if(data=="error") {
                alert("保存信息出错");
                return null;
            }
            this.props.showcallback();
        });
    }

    initTab() {
        let d = this.props.data.info;
        for (var i = 0; i < 7; i++) {
            for(var k = 0 ; k < 3; k++) {
                if(d.worktime[i][k] == 1) {
                    var str = String(i)+String(k);
                    $(".t"+str).attr("checked","true");
                }
            }
        }
    }

    componentDidMount() {
        this.initTab();
    }

    render() {
        let doctor = this.props.data.info;
        let depatyList = this.props.data.depList;
        return(
            <div>
                <form ref="fm" method="POST" action="/doctor/editorInfo">
                    <input type="hidden" name="id" defaultValue={doctor.id} />
                    <p>
                        姓    名
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" name="name" defaultValue={doctor.name} />
                    </p>
                    <p>
                        年    龄
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" name="age" defaultValue={doctor.age} />
                    </p>
                    <p>
                        性    别
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" name="sex" defaultValue={doctor.sex == 'f' ? '女' : '男'} />
                    </p>
                    <p>
                        职    称
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <select name="title" defaultValue={doctor.title}>
                            <option value="主任医师">主任医师</option>
                            <option value="副主任医师">副主任医师</option>
                            <option value="主治医师">主治医师</option>
                        </select>
                    </p>
                    <p>
                        医    院
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" name="hospital" defaultValue={doctor.hospital} />
                    </p>
                    <p>
                        科    室
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <select name="department" ref="depart">
                             {depatyList}
                        </select>
                    </p>
                    <p>
                        电    话
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" name="tel" defaultValue={doctor.tel} />
                    </p>
                    <p>
                        咨询价格
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input ref="price" type="text" name="price" placeholder="10分钟咨询价格" defaultValue={doctor.price} />
                    </p>
                    <p>
                        就诊时间
                    </p>
                    <table className="doctor-tab">
                        <tbody>
                                <tr>
                                    <th></th>
                                    <th>上午</th>
                                    <th>下午</th>
                                    <th>晚上</th>
                                </tr>
                                <tr>
                                    <th>星期一</th>
                                    <th><input type="checkbox" name="day1" defaultValue="1"  className="t00"  /></th>
                                    <th><input type="checkbox" name="day1" defaultValue="2"  className="t01" /></th>
                                    <th><input type="checkbox" name="day1" defaultValue="4"  className="t02" /></th>
                                </tr>
                                 <tr>
                                    <th>星期二</th>
                                    <th><input type="checkbox" name="day2" defaultValue="1" className="t10" /></th>
                                    <th><input type="checkbox" name="day2" defaultValue="2" className="t11" /></th>
                                    <th><input type="checkbox" name="day2" defaultValue="4" className="t12" /></th>
                                </tr>
                                 <tr>
                                    <th>星期三</th>
                                    <th><input type="checkbox" name="day3" defaultValue="1" className="t20"/></th>
                                    <th><input type="checkbox" name="day3" defaultValue="2" className="t21"/></th>
                                    <th><input type="checkbox" name="day3" defaultValue="4" className="t22"/></th>
                                </tr>
                                 <tr>
                                    <th>星期四</th>
                                    <th><input type="checkbox" name="day4" defaultValue="1" className="t30"/></th>
                                    <th><input type="checkbox" name="day4" defaultValue="2" className="t31"/></th>
                                    <th><input type="checkbox" name="day4" defaultValue="4" className="t32"/></th>
                                </tr>
                                 <tr>
                                    <th>星期五</th>
                                    <th><input type="checkbox" name="day5" defaultValue="1" className="t40"/></th>
                                    <th><input type="checkbox" name="day5" defaultValue="2" className="t41"/></th>
                                    <th><input type="checkbox" name="day5" defaultValue="4" className="t42"/></th>
                                </tr>
                                 <tr>
                                    <th>星期六</th>
                                    <th><input type="checkbox" name="day6" defaultValue="1" className="t50"/></th>
                                    <th><input type="checkbox" name="day6" defaultValue="2" className="t51"/></th>
                                    <th><input type="checkbox" name="day6" defaultValue="4" className="t52"/></th>
                                </tr>
                                 <tr>
                                    <th>星期日</th>
                                    <th><input type="checkbox" name="day7" defaultValue="1" className="t60"/></th>
                                    <th><input type="checkbox" name="day7" defaultValue="2" className="t61"/></th>
                                    <th><input type="checkbox" name="day7" defaultValue="4" className="t62"/></th>
                                </tr>
                        </tbody>
                   </table>
                   <br/>
                    <p>    
                        备注信息
                        <br/>                           
                        <textarea name="memo" className="input-memo" defaultValue={doctor.memo}>                      
                        </textarea>
                    </p>
                    <div className="div-rit">
                        <span>
                            <input type="button"  className="editor-input-btn" value="关闭" onClick={()=>{this.props.callback()}} />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="button"  className="editor-input-btn" value="保存" onClick={()=>{this.saveInfo()}} />
                        </span>
                    </div>
                </form>
            </div>
        )
    }
}


class MyInfo extends React.Component {
    constructor(props) {
        super();
        this.state = {
            info:{},
            show:false,
            depList:[],
        }
    }

    initDepartment(data){
         let rows = [];
         let first = [];
        data.forEach((item,index)=>{
             if(item.name == this.state.info.department){
               first.push(<option key={"option-"+index} value={item.id}>{item.name}</option>)
             }else{
                 rows.push(
                     <option key={"option-"+index} value={item.id}>{item.name}</option>
                 )
           }
         });
         rows = first.concat(rows);
         this.setState({depList:rows});
    }

    getDepartment(){
        $.ajax({
            url:'/worker/getDeparments/',
            type:'POST',
            success:(result)=>{
                if(result == "error"){
                    alert("error");
                    return null;
                }
                this.initDepartment(result);
             },
            error:function(xhr,status,error){
                alert(error);
            }
        });
    }

    getdoctorInfo() {
        $.ajax({
            url: "/doctor/info/",
            method: "POST",
            data: $.param({
                'doctor_id': this.props.doctorid,
            }),
            traditional: true,
            dataType: 'json',
            success: ret=>{
                this.setState({info:eval(ret)});
                this.getDepartment();
            },
            error:function(xhr,status,error){
                alert(error);
            }
        });
    }

    componentDidMount() {
        this.getdoctorInfo();
    }

    showCallBack() {
        this.getdoctorInfo();
        this.setState({show:false})
    }

    callback() {
        this.setState({show:false});
    }

    editorCallBack() {
        this.setState({show:true});
    }

    render() {
        var showInfo;
        if(!this.state.info.name) {
            showInfo = (<div></div>);
        }
        else {
            if(this.state.show) {
                showInfo = <Editor data={this.state} callback={()=>{this.callback()}} showcallback={ ()=>{this.showCallBack()}} />
            }else{
                showInfo = <Show data={this.state.info} callback={()=>{this.editorCallBack()}}/>
            }
        }

        return(
            <div className="showinfo-div">
               {showInfo}            
            </div>
        )
    }
}
 
export default MyInfo;
