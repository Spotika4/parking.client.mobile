import React from 'react';

import { Car, Ticket } from "../../../UI";


export class Item extends React.Component {


	constructor(props){
		super(props);

		this.state = {
			active: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount = () => {
		this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount(){

		this.setState = (state, callback) => {
			return false;
		};
	}

	handleClick = async () => {

		this.setState((prevState) => ({
			...prevState,
			active: !this.state.active
		}));
	};

	render() {

		return (
			this.props.item.NECESSITATES.map((necessitate, i) =>
				<div className={`d-block col position-relative rounded p-4 shadow mb-4 border-0`} onClick={this.handleClick} key={i}>
					<div className="d-flex justify-content-between">
						<div className="rounded-pill text-center ps-3 pt-2 pe-3 pb-2 alert alert-info mb-0 border-0">
							{necessitate.NAME}
						</div>
						<div className="mb-0 text-muted">
							<i className="fas fa-angle-right" />
						</div>
					</div>

					<div className={`mt-3`}>
						<div className="d-flex justify-content-between">
							<div className="mb-0 rounded text-start">

								<i className="fas fa-plus text-primary me-3" />
								{necessitate.AUTHOR_LAST_NAME} {necessitate.AUTHOR_NAME}
							</div>
							<div className="mb-0 rounded text-end">
								<div className="d-block text-muted">
									<span className="d-inline-block me-2">
			                            <i className="icon icon-event_note mr-1" /> {necessitate.DATE_CREATE_FORMAT.toLocaleDateString("ru-RU")}
			                        </span>
			                        <span className="d-inline-block">
			                            <i className="icon icon-access_time mr-1" /> {necessitate.DATE_CREATE_FORMAT.toLocaleTimeString("ru-RU")}
			                        </span>
								</div>
							</div>
						</div>

						<div className="d-flex text-muted mt-1 mb-3">
							<div className="mb-0">{necessitate.DESCRIPTION}</div>
						</div>

						<div className={`d-flex justify-content-between ${this.state.active === false ? 'd-none' : ``}`}>
							{this.state.active === false ? null :
								<Ticket.Log
									filter={{
										CAR_ID: this.props.item.CAR?.ID,
										LOG_CAR_NECESSITATE_ID: necessitate?.ID
									}}
								/>
							}
						</div>

						{(necessitate.PERFORMER_ID > 0) ? (
							<>
								<div className="d-flex justify-content-between">
									<div className="mb-0 rounded text-start">

										<i className="fas fa-check text-primary me-3" />
										{necessitate.PERFORMER_LAST_NAME} {necessitate.PERFORMER_NAME}
									</div>
									<div className="mb-0 rounded text-end">
										<div className="d-block text-muted">
											<span className="d-inline-block me-2">
					                            <i className="icon icon-event_note mr-1" /> {necessitate.DATE_END_FORMAT.toLocaleDateString("ru-RU")}
					                        </span>
											<span className="d-inline-block">
					                            <i className="icon icon-access_time mr-1" /> {necessitate.DATE_END_FORMAT.toLocaleTimeString("ru-RU")}
					                        </span>
										</div>
									</div>
								</div>

								<div className="d-flex text-muted mt-1">
									<div className="mb-0">{necessitate?.COMMENT}</div>
								</div>
							</>
						) : null}
					</div>
				</div>
			)
		);
	}
}
