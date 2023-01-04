import React, { Component } from 'react';
import { HashRouter, Switch } from "react-router-dom"

import { Provider } from "./Context";
import * as Route from "./Route";
import * as View from "../../views";

import "./App.css";

export class App extends Component {

    render() {

        return (
           <HashRouter>
               <Provider>
                   <Switch>

                       <Route.Default exact path="/" component={View.Home.Default} />
                       <Route.Default exact path="/home/parking.html" component={View.Home.Parking} />
                       <Route.Default exact path="/home/filter.html" component={View.Home.Filter} />
                       <Route.Default exact path="/user/profile.html" component={View.User.Profile} />
                       <Route.Default exact path="/user/favorite.html" component={View.User.Favorite} />
                       <Route.Default exact path="/user/tickets.html" component={View.User.Tickets} />
                       <Route.Auth exact path="/user/auth.html" component={View.User.Auth} />

                       <Route.Default exact path="*" component={View.Errors.NotFound} />
                   </Switch>
               </Provider>
           </HashRouter>
        );
    }
}