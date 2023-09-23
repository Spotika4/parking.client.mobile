import React from 'react';
import {Spinner} from "../../../Spinner";


export class Item extends React.Component {


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
				className={`btn`}
			>
				{this.props.loading === true ? ( <Spinner /> ) : (
					this.props.children
				)}
			</button>
		);
	}
}
