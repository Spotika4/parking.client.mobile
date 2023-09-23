import React from 'react';
import {Spinner} from "../../../Spinner";


export class Button extends React.Component {


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
				className={this.props.className ? `${this.props.className}${this.props.loading === false ? `` : ` loading`}` : `d-block vw-35 me-3 flex-fill position-relative btn btn-primary pt-3 pb-3 text-center ${this.props.loading === false ? `` : `loading`}`}
			>
				{this.props.loading === true ? ( <Spinner /> ) : (
					<span>{this.props.children}</span>
				)}
			</button>
		);
	}
}
