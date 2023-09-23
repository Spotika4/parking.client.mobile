import React from 'react';

import { Spinner } from "../../../Spinner";


export class Accumulator extends React.Component {


	constructor(props){
		super(props);

		this.state = {
			loading: false
		};
	}

	handleClick = async () => {

		return this.setState((prevState) => ({
			...prevState,
			loading: true
		}), () => this.props.handleAccumulator().then(() => {
			return this.setState((prevState) => ({
				...prevState,
				loading: false
			}));
		}));
	};

	render(){

		return (
			<button
				onClick={this.handleClick}
				disabled={this.props.user.ROLES?.SELLER}
				className={`position-relative flex-fill btn btn text-white loading shadow ${this.props?.accumulator === 1 ? `btn-danger` : `btn-success`} ${this.props.className}`}
			>
				{this.state.loading === true ? ( <Spinner /> ) : ( <i className={'fa-solid fa-car-battery fs-1'} /> )}
			</button>
		)
	}
}
