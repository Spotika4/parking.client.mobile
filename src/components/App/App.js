import React, { Component } from "react";
import { HashRouter, Switch } from "react-router-dom";

import Notification from "./Push/Notification";
import * as Route from "./Route";
import * as View from "../../views";

import { Provider } from "./Context";

import "./App.css";


export class App extends Component {


    render() {
        return (
        	<>
	            <HashRouter>
	                <Provider>
	                    <Switch>

		                       <Route.Default exact path="/" component={View.Home.Default} />

		                       <Route.Default exact path="/home" component={View.Home.Default} />
		                       <Route.Default exact path="/map" component={View.Map.Image} />

		                       <Route.Default exact path="/home/parking" component={View.Home.Parking} />
		                       <Route.Default exact path="/home/filter" component={View.Home.Filter} />

			                   <Route.Default exact path="/home/sector/:id" component={View.Sector.Table} />
			                   <Route.Default exact path="/home/sector/:id/:place" component={View.Sector.Table} />

			                   <Route.Default exact path="/home/service/:id" component={View.Service.List} />
			                   <Route.Default exact path="/home/service/:id/:car" component={View.Service.List} />

			                   <Route.Default exact path="/home/zone/:id" component={View.Zone.List} />
			                   <Route.Default exact path="/home/zone/:id/:car" component={View.Zone.List} />

			                   <Route.Default exact path="/home/car/:id" component={View.Car.Item} />

			                   <Route.Default exact path="/tickets" component={View.Ticket.List} />

			                   <Route.Default exact path="/colleague" component={View.User.Colleague} />

		                       <Route.Default exact path="/user/favorite" component={View.User.Favorite} />
			                   <Route.Default exact path="/user/location" component={View.User.Location} />

		                       <Route.Default exact path="/settings/options" component={View.Settings.Options} />
		                       <Route.Default exact path="/settings/info" component={View.Settings.Info} />
		                       <Route.Default exact path="/settings/home" component={View.Settings.Home} />

			                   <Route.Default exact path="/more/about" component={View.More.About} />

			                   <Route.Auth exact path="/auth" component={View.User.Auth} />

		                       <Route.Default exact path="*" component={View.Errors.NotFound} />
	                    </Switch>
	                </Provider>
	            </HashRouter>
            </>
        );
    }
}
