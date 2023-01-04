import React, { Component } from 'react';
import { HashRouter, Switch, Route as ReactRoute } from "react-router-dom"

import { Provider } from "./Context";
import * as Route from "./Route";
import * as View from "../../views";

import "./App.css";

export class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {

        return this.setState((prevState) => ({
            ...prevState
        }));
    };

    componentWillUnmount = () => {

        this.setState = (state, callback) => {
            return false;
        }
    };

    render() {

        return (
           <HashRouter>
               <Provider>
                   <Switch>

                       <Route.Default exact path="/" component={View.Default} />
                       <Route.Default exact path="/profile.html" component={View.User.Profile} />
                       <Route.Auth exact path="/auth" component={View.User.Auth} />

                       <Route.Default exact path="*" component={View.Errors.NotFound} />
                   </Switch>
               </Provider>
           </HashRouter>
        );
    }
}