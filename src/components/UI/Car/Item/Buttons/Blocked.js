import React from 'react';

import { Spinner } from "../../../Spinner";


export class Blocked extends React.Component {


	constructor(props){
		super(props);

		this.state = {
			loading: false
		};
	}

	handleClick = async () => {

		this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		return this.props.handleUnblock().then(() => {
			return this.setState((prevState) => ({
				...prevState,
				loading: false
			}));
		})
	};

	render(){

		return (
			this.props.blocked === false ? this.props.children : (
				<>
					{this.props?.disclaimer === false ? null : (
						<div className={`flex-fill alert alert-info align-items-center`}>
							<i className="fa-solid fa-triangle-exclamation fs-1 me-4 ms-2" />
							<div>
								Для доступа к данной информации необходимо разблокировать карточку автомобиля
							</div>
						</div>
					)}

					<button className={`position-relative flex-fill btn btn-primary text-white loading shadow pt-4 pb-4`} onClick={this.handleClick}>
						{this.state.loading === true ? ( <Spinner /> ) : (
							<i className="fa-solid fa-lock fs-3" />
						)}
						<span className={`d-block mt-2`}>Разблокировать</span>
					</button>
				</>
			)
		)
	}
}
