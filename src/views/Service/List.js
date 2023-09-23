import React from 'react';

import { Header, Car } from "../../components/UI";
import { Object } from "../../components/App";

import { Context } from "../../components/App/Context";


export class List extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
	}

	render() {

		let SERVICE = new Object.Service();
		SERVICE.import(this.props.match.params.id).then(r => r);

		return (
			<>
				<Header
					title={SERVICE.object.NAME}
					onBackClick={() => this.props.history.push(`/`)}
				/>

				<main>
					<Car.List
						context={this.context}
						filter={{
							STATUS_ID: 5,
							SERVICE_ID: this.props.match.params.id,
							FAVORITE: this.context.state.favorite
						}}
					/>
				</main>
			</>
		);
	}
}
