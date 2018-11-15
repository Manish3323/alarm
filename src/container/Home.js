import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {default as UUID} from "uuid";
import {Grid, Col, Row, Modal, Button } from 'react-bootstrap';
import Alarm from './Alarm';
import helper from '../helpers/commonfunctions';
import "isomorphic-fetch"
const defaultAlarmObject = {
    id: null,
    hrs: 0,
    mins: 0,
    repeatOn: 'AllDays',
    setForDays: [],
    optedForSnooze: true,
    snoozeDelay: '',
    alarmPassedForToday:null,
    isActive:true
}
class Home extends Component {
    state = {
        data: null,
        disableSave: false,
        currentTime: new Date(),
        showAlarmsFlag: false,
        playsound: false,
        addItemToAlarmList: defaultAlarmObject,
        currentlyPlayingId:0
    }
    componentDidMount(){
        if(!this.state.data){
            this.loadAlarms();
        }
        this.audio = ReactDOM.findDOMNode(this.refs.audio);
        setInterval(() => this.checkAlarmAndUpdateClock(), 1000);
    }

    checkAlarmAndUpdateClock(){
        this.setState({ currentTime: new Date() });
        const currentDay = this.state.currentTime.getDay();
        const secs = this.state.currentTime.getSeconds();
        const hrs = this.state.currentTime.getHours();
        const mins = this.state.currentTime.getMinutes();
        this.state.data.alarms.forEach((alarm)=>{
            if(alarm.isActive && alarm.setForDays.indexOf(days[currentDay]) !== -1 && parseInt(alarm.hrs) === hrs && parseInt(alarm.mins) === mins && secs === 0){
                this.playAlarm(alarm.id);
            }
        })
    }
    playAlarm(id){
        this.audio.play();
        setTimeout(()=>{
            this.setState({playsound:false})
        },20000)
        this.setState({currentlyPlayingId:id,playsound: true})
    }
    stopAlarm(id){
        this.audio.pause();
        var data = this.state.data;
        data.alarms.forEach((alarm) =>{
            if(alarm.id === id){
                alarm.alarmPassedForToday = true
            }
        })
        this.setState({data,playsound: false})
    }
    snoozeSound(id){
        this.audio.pause();
        var data = this.state.data;
        data.alarms.forEach((alarm) =>{
            if(alarm.id === id){
                alarm.mins = parseInt(alarm.mins) + 1
                alarm.mins = alarm.mins % 60
            }
        })
        this.setState({data,playsound:false})
    }
    loadAlarms() {
        fetch('http://alarmapp-simulator.herokuapp.com/getAlarms')
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
            let arr = this.state.data.alarms
            let hrs = new Date().getHours();
            let mins = new Date().getMinutes();
            arr.sort(function(a,b) {return (b.mins - mins) - (a.mins-mins)});// sort by minutes descending
            arr.sort(function(a,b) {return (b.hrs - hrs) - (a.hrs-hrs)}); // sort by hours descending
            return arr.map(alarm =>{
               return (
                   <div key={alarm.id} style={{paddingTop:'10px',paddingBottom:'10px'}}>
                        <Alarm setActiveFlag={(id,value)=>this.setActiveFlag(id,value)} data={alarm} />
                   </div>
               )
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
        addItemToAlarmList['id'] = UUID.v4();
        data.alarms.push(addItemToAlarmList)
        this.setState({data,disableSave:true})
    }
    setActiveFlag = (id,value) => {
        console.log(id,value)
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
            <Grid frameBorder>
                <Row >
                    <Col xs={3} style={{paddingBottom:'20px'}}>
                        Alarm At : 
                        hour: <select value={this.state.addItemToAlarmList.hrs}  onChange={(event) => this.setProp(event,'hrs')}>{[...Array(24).keys()].map((x,y) => <option key={y}>{x}</option>)}</select>
                        mins: <select value={this.state.addItemToAlarmList.mins} onChange={(event) => this.setProp(event,'mins')}>{[...Array(60).keys()].map((x,y) => <option key={y}>{x}</option>)}</select>
                    </Col>
                </Row>
                <Row>
                    <Col xs={3}>
                       repeat on :<select value={this.state.addItemToAlarmList.repeatOn} onChange={(event) => this.setProp(event,'repeatOn')}>{Object.keys(daysEnums).map((x) => <option key={x}>{x}</option>)}</select>
                    </Col>
                    <Col ref="snooze" xs={3}>
                       snooze : <input className="snooze" value={this.state.addItemToAlarmList.optedForSnooze} type="checkbox" onChange={(event) => this.setProp(event,'optedForSnooze')}/>
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
        let runningAlarm = null;
        if(this.state.playsound){
            runningAlarm = this.state.data.alarms.find((item) => item.id === this.state.currentlyPlayingId)
        }
        return (
            <div>
                <audio hidden={true} ref="audio" src="../assets/alarm.mp3" type="audio/mp3" controls></audio>
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
                                <button style={{marginRight:'20px'}} className={this.state.showAlarmsFlag ? 'active btn btn-raised' : 'btn btn-raised'} onClick={() => this.showAlarms()}> Show Alarms </button>
                                <button className={!this.state.showAlarmsFlag ? 'active btn btn-raised' : 'btn btn-raised'} onClick={() => this.setState({showAlarmsFlag: false,addItemToAlarmList: defaultAlarmObject,disableSave:false})}> Set Alarm </button>
                            </Col>
                            {this.state.showAlarmsFlag &&
                            <Col style={{paddingTop:'20px'}} > 
                                {this.listAlarms()}     
                            </Col>
                            }
                            {!this.state.showAlarmsFlag &&
                            <Col style={{paddingTop:'20px'}}>
                                {this.addAlarmToList()}
                            </Col>
                            }
                        </Col>
                    </Row>
                </Grid>
                {runningAlarm &&
                <div className="static-modal" >
                    <Modal.Dialog show={this.state.playsound} onHide={()=> this.stopAlarm(runningAlarm.id)}>
                        <Modal.Header>
                            <Modal.Title>
                            {
                                runningAlarm.optedForSnooze &&
                                <Button bsStyle="primary" onClick={()=> this.snoozeSound(runningAlarm.id)}>Snooze for 5 minutes</Button>
                            }
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>utha utha...!! shalecha vel zala</Modal.Body>

                        <Modal.Footer>
                        <Button onClick={()=> this.stopAlarm(runningAlarm.id)}>Stop Alarm</Button>
                        <Button bsStyle="primary" onClick={()=> this.stopAlarm(runningAlarm.id)}>Close window changes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            }
            </div>
        );
    }
}
const days =  ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const daysEnums = {
    WeekDays: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
    WeekEnds: ['Saturday','Sunday'],
    AllDays: days,
    Specific: [],
}


export default Home;