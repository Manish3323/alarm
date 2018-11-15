import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Grid, Col, Row } from 'react-bootstrap';
import Alarm from './Alarm';
import helper from '../helpers/commonfunctions';
import "isomorphic-fetch"
const defaultAlarmObject = {
    id:Math.round(Math.random(10).toFixed()),
    hrs: 0,
    mins: 0,
    repeatOn: 'AllDays',
    setForDays: [],
    optedForSnooze: true,
    snoozeDelay: '',
    isActive:true
}
class Home extends Component {
    state = {
        data: null,
        disableSave: false,
        currentTime: new Date(),
        showAlarmsFlag: false,
        addItemToAlarmList: defaultAlarmObject
    }
    componentDidMount(){
        if(!this.state.data){
            this.loadAlarms();
        }
        setInterval(() => this.setState({ currentTime: new Date() }), 1000);
    }

    loadAlarms() {
        fetch('http://localhost:3000/getAlarms')
        .then(response => response.json()
        ).then(
            json => {
                if(json) {
                    this.setState({data: json})
                }
            }
        ).catch(err => {
            console.log(err)
        })
    }
    
    showAlarms = () =>{
        this.setState({showAlarmsFlag:true})
    }
    renderTime() {
        return(
            <div>
                {
                   helper.formattedTime(this.state.currentTime)
                }
            </div>
        )
    }
    listAlarms = () =>{
        if(this.state.data && this.state.data.alarms.length > 0){
            return this.state.data.alarms.map(alarm =>{
               return <Alarm key={alarm.id} setActiveFlag={this.setActiveFlag} data={alarm} />
            })
        }else{  
            return null
        }
    }
  
    setProp = (event,prop) => {
        var addItemToAlarmList = {...this.state.addItemToAlarmList}
        addItemToAlarmList[prop] = event.target.value;
        this.setState({addItemToAlarmList})
    }
    handleAddAlarm = (event) => {
        var data = this.state.data
        var addItemToAlarmList = {...this.state.addItemToAlarmList}
        const snoozeEle = ReactDOM.findDOMNode(this.refs.snooze).getElementsByClassName('snooze')
        addItemToAlarmList['optedForSnooze'] = snoozeEle ? snoozeEle[0].checked : false
        if(this.state.addItemToAlarmList.repeatOn !== 'Specific'){
            addItemToAlarmList['setForDays'] = daysEnums[this.state.addItemToAlarmList.repeatOn]
        }else{
            const elements = ReactDOM.findDOMNode(this.refs.specificdays).getElementsByClassName('checkbox2')
            addItemToAlarmList['setForDays'] = []
            for(let i=0;i<elements.length;i++) {
                if(elements[i].checked){
                    addItemToAlarmList['setForDays'].push(elements[i].value)
                }
            }
        }
        data.alarms.push(addItemToAlarmList)
        this.setState({data,disableSave:true})
    }
    setActiveFlag = (id,value) => {
        var data = this.state.data;
        data.alarms.forEach((alarm) =>{
            if(alarm.id === id){
                alarm.isActive = value
            }
        })
        this.setState({data})
    }
    addAlarmToList = () => {
        return (
            <Grid frameBorder="true">
                <Row>
                    <Col xs={3}>
                        Alarm Time
                        hours: <select value={this.state.addItemToAlarmList.hrs}  onChange={(event) => this.setProp(event,'hrs')}>{[...Array(24).keys()].map((x,y) => <option key={y}>{x}</option>)}</select>
                        minutes : <select value={this.state.addItemToAlarmList.mins} onChange={(event) => this.setProp(event,'mins')}>{[...Array(60).keys()].map((x,y) => <option key={y}>{x}</option>)}</select>
                    </Col>
                </Row>
                <Row>
                    <Col ref="snooze" xs={3}>
                       snooze : <input className="snooze" value={this.state.addItemToAlarmList.optedForSnooze} type="checkbox" onChange={(event) => this.setProp(event,'optedForSnooze')}/>
                    </Col>
                    <Col xs={3}>
                       repeat on :<select value={this.state.addItemToAlarmList.repeatOn} onChange={(event) => this.setProp(event,'repeatOn')}>{Object.keys(daysEnums).map((x) => <option key={x}>{x}</option>)}</select>
                    </Col>
                </Row>
                <Row ref="specificdays">
                    <Col xs={3}>
                        {
                            days.map((day,index)=>{
                                const alarmDays = daysEnums[this.state.addItemToAlarmList.repeatOn] || 'AllDays';
                                if( this.state.addItemToAlarmList.repeatOn !== 'Specific'){
                                    return <div key={index}><input type="checkbox" value={day} checked={ alarmDays.includes(day)} disabled={true}/> {day} </div>
                                }else{
                                    return <div key={index}><input type="checkbox" className={"checkbox2"}/> {day} </div>
                                }
                            })
                        }
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                        <input value={"Save"} disabled={this.state.disableSave} type="submit" onClick={(event) => this.handleAddAlarm(event)}/>
                    </Col>
                </Row>
            </Grid>
        ) 
    }
    render() { 
        return (
            <Grid>
                <Row>
                    <Col >
                        <Col>
                            <h1>
                                {
                                    this.renderTime()
                                }
                            </h1>
                        </Col>
                        <Col>
                            <button className={this.state.showAlarmsFlag ? 'active btn btn-raised' : 'btn btn-raised'} onClick={() => this.showAlarms()}> Show Alarms </button>
                            <button className={!this.state.showAlarmsFlag ? 'active btn btn-raised' : 'btn btn-raised'} onClick={() => this.setState({showAlarmsFlag: false,addItemToAlarmList: defaultAlarmObject,disableSave:false})}> Set Alarm </button>
                        </Col>
                        {this.state.showAlarmsFlag &&
                        <Col>
                            {this.listAlarms()}     
                        </Col>
                        }
                        {!this.state.showAlarmsFlag &&
                        <Col >
                            {this.addAlarmToList()}
                        </Col>
                        }
                    </Col>
                </Row>
            </Grid>
        );
    }
}
const days =  ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const daysEnums = {
    WeekDays: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
    WeekEnds: ['Saturday','Sunday'],
    AllDays: days,
    Specific: [],
}


export default Home;