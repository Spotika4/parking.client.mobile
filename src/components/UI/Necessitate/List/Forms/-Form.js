import React from 'react';
import {Spinner} from "../../../Spinner";


export class Form extends React.Component {


	constructor(props){
		super(props);
	}

	componentDidMount = async () => {
		await this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		};
	}

	render(){
		return (
			<button
				onClick={this.props.onClick}
				disabled={this.props.disabled}
				className={`d-block text-center btn btn-primary pt-4 pb-4 ps-3 pe-3 me-3 position-relative ${this.props.loading === false ? `` : `loading`}`}
			>
				{this.props.loading === true ? ( <Spinner /> ) : (
					<span>{this.props.children}</span>
				)}
			</button>
		);
	}
}
