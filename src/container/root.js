import React, { Component } from 'react';
import RouterComponent from '../router';
import {Helmet} from "react-helmet";

class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="Root">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>My Title</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <RouterComponent />
            </div>
        );
    }
}
 
export default Root ;