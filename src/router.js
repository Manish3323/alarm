import React, { Component } from 'react';
import {Fade} from 'react-bootstrap';
import { StaticRouter, Switch, Route } from 'react-router-dom'
import Home from './container/Home';
import NotFound from './container/NotFound'
class RouterComponent extends Component {
    render() { 
        return ( 
            <Fade in={true}> 
                <StaticRouter location={{ pathname: "/" }} context={{}}>
                    <Switch>
                        {/* there will only ever be one child here */}
                        <Route exact path="/" component={Home}/>
                        <Route component={NotFound}/>
                    </Switch>
                </StaticRouter>
            </Fade>
         );
    }
}
 
export default RouterComponent;