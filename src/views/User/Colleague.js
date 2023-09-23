import React from 'react';

import { Header, User } from "../../components/UI";

import { Context } from "../../components/App/Context";


export class Colleague extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
	}

	render(){

		return (
			<>
				<Header
					title={`Коллеги`}
					onBackClick={() => this.props.history.push('/')}
				/>

				<main>

					<User.List
						context={this.context}
					/>

				</main>
			</>
		);
	}
}
