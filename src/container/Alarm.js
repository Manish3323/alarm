import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import helper from '../helpers/commonfunctions';
class Alarm extends Component {
    render() { 
        const { id,mins,hrs,optedForSnooze,setForDays,isActive,alarmPassedForToday } =  this.props.data
        return ( 
            <Grid>
                <Row>
                    <Col xs={4} style={{border:'1px solid black', borderRadius: '0.5'}}>
                        <div className={alarmPassedForToday ? 'red-background' : ''} style={{color:'black',paddingTop:'20px',paddingBottom:'20px'}}> 
                            <div>
                                <input style={{paddingRight:'5px'}} type="checkbox" onChange={(event)=>this.props.setActiveFlag(id,event.target.checked)} defaultChecked={isActive}/>
                                <h2>{helper.appendZero(hrs)} : {helper.appendZero(mins)}</h2>
                                { alarmPassedForToday && <div className="pull-right"><h6>Passed for today</h6></div>}
                            </div>
                            <div className="card-body"> 
                                <div>snooze {optedForSnooze ? 'active' : 'inactive' }</div> 
                                <div>repeats on :
                                    {setForDays && setForDays.length > 0 && 
                                        setForDays.map((each,index) => <h6 style={{display:'inline-block',paddingLeft: '5px',paddingRight:'5px'}} key={index}> {each.charAt(0)}</h6> )
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
 
export default Alarm;