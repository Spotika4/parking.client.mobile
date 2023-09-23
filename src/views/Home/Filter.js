import React from 'react';

import { Home, Car } from "../../components/UI";

import { Context } from "../../components/App/Context";


export class Filter extends React.Component {

    static contextType = Context;


    render(){

        return (
	        <Home.Search
		        context={this.context}
	        >

		        <Car.Filter
		            context={this.context}
		        />

	        </Home.Search>
        );
    }
}
