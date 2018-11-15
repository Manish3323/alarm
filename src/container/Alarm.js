import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import helper from '../helpers/commonfunctions';
class Alarm extends Component {
    render() { 
        const { mins,hrs,optedForSnooze,setForDays,isActive,setActiveFlag } =  this.props.data
        return ( 
            <Grid>
                <Row>
                    <Col xs={4}>
                        <div style={{color:'black',backgroundColor: isActive ? 'green': 'red',opacity:0.4}}> 
                            <h4> Alarm set for  {helper.appendZero(hrs)} : {helper.appendZero(mins)} </h4>
                            <div>snooze {optedForSnooze ? 'active' : 'not active' }</div> 
                            <div>repeats on :
                                {
                                    <div style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                        {setForDays && setForDays.length > 0 && 
                                            setForDays.map((each,index) => <h6 key={index}> {each}</h6> )
                                        }
                                    </div>
                                }
                            </div>
                            Set Alarm  : <input className="toggle" type="checkbox" checked={isActive}/>
                        </div> 
                    </Col>
                </Row>
            </Grid>
        );
    }
}
 
export default Alarm;