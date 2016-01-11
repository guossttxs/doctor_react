import React from 'react';

import MyInfo from './myInfo'
import TypicalCase from './typicalCase'
import MedTemplate from './MedTemplate'

const Tabs = require('material-ui/lib/tabs/tabs');
const Tab = require('material-ui/lib/tabs/tab');

class DoctorInfo extends React.Component {
    constructor(props) {
        super();
    }
    render() {
        return(
            <div>
                <Tabs
                    tabItemContainerStyle={{
                        backgroundColor:'orange', 
                        zindex:100
                    }}
                >
                    <Tab
                        label="我的简介"
                    >
                    <MyInfo doctorid={this.props.doctorid} />
                    </Tab>

                    <Tab
                        label="经典病例"
                    >
                    <TypicalCase doctorid={this.props.doctorid} />
                    </Tab>

                    <Tab
                        label="语音解答"
                    >
                    </Tab>

                    <Tab
                        label="处方模板"
                    >
                    <MedTemplate doctorid={this.props.doctorid} />
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
export default DoctorInfo;
