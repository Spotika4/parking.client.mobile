import React from 'react';

import { Spinner } from "../../../Spinner";


export class Ignition extends React.Component {


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
		}), () => this.props.handleIgnition().then(() => {
			return this.setState((prevState) => ({
				...prevState,
				loading: false
			}));
		}));
	};

	render(){

		return (
			this.props?.car.IGNITION_KEY === null ? (
				<button
					onClick={this.handleClick}
					className={`position-relative flex-fill btn btn text-white loading shadow btn-success ${this.props.className}`}
				>
					{this.state.loading === true ? ( <Spinner /> ) : ( <i className={'fa-solid fa-key fs-1'} /> )}
				</button>
			) : (
				this.props.car.IGNITION_KEY === 0 ? (
					<button
						onClick={this.handleClick}
						className={`position-relative flex-fill btn btn text-white loading shadow btn-danger ${this.props.className}`}
					>
						{this.state.loading === true ? ( <Spinner /> ) : (
							<>
								<i className={'fa-solid fa-key fs-3'} />
								<span className={`d-block mt-2 small`}>В ключнице</span>
							</>
						)}
					</button>
				) : (
					<button
						onClick={this.handleClick}
						className={`position-relative flex-fill btn btn text-white loading shadow ${this.props.car.IGNITION_KEY !== this.props.user.ID ? `btn-danger` : `btn-success`} ${this.props.className}`}
					>
						{this.state.loading === true ? ( <Spinner /> ) : (
							<>
								<i className={'fa-solid fa-key fs-3'} />
								<span className={`d-block mt-2 small`}>{this.props.car.IGNITION_LAST_NAME}. {this.props.car?.IGNITION_NAME[0]}.</span>
							</>
						)}
					</button>
				)
			)
		)
	}
}
