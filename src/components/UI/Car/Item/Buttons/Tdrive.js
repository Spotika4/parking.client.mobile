import React from 'react';

import { Spinner } from "../../../Spinner";


export class Tdrive extends React.Component {


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
		}), () => this.props.handleTestDrive().then(() => {
			return this.setState((prevState) => ({
				...prevState,
				loading: false
			}));
		}));
	};

	render(){

		return (
			<button className={`flex-fill position-relative btn btn-primary text-center w-100 pt-4 pb-4 loading`} onClick={this.handleClick}>
				{this.state.loading === true ? ( <Spinner /> ) : (
					<i className="fa-solid fa-road fs-3" />
				)}
				<span className={`d-block mt-2`}>
					{this.props.title}
				</span>
			</button>
		)
	}
}
