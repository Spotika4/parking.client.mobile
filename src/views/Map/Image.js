import React from 'react';

import { Header } from "../../components/UI";


export class Image extends React.Component {


	constructor(props){
		super(props);
	}

	render() {

		return (
			<>
				<Header
					title={`Схема локации`}
					onBackClick={() => this.props.history.push(`/`)}
				/>

				<main>
					<div className={`container-fluid pt-3`}>
						Схема локации
					</div>
				</main>
			</>
		);
	}
}
