import React from 'react';

import { Car } from "../../components/UI";
import { Context } from "../../components/App/Context";


export class Item extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
	}

	render() {

		return (
			<Car.Item.Full
				id={this.props.match.params.id}
				context={this.context}
			/>
		);
	}
}
