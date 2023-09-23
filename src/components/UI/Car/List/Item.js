import React from 'react';

import { Car } from "../../../UI";


export class Item extends React.Component {


	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = async () => {
		await this.props.context.sider({
			child: () => (
				<Car.Item.Full
					context={this.props.context}
					id={this.props.item.ID}
					item={this.props.item}
				/>
			)
		});
	};

	render() {
		return (
			<div
				onClick={this.handleClick}
				className={'text-decoration-none cursor-pointer'}
			>
				<div data-id={this.props.item.ID} className={`d-block item col position-relative rounded p-3 shadow mb-3`}>
					<div className={`d-flex justify-content-between`}>

						<div className={`marker text-body small position-relative ${this.props.item.NOTICE.type}`}>
							{this.props.item.NOTICE.title}
						</div>

						<div className={`d-flex justify-content-between`}>

							{this.props.item.IGNITION_KEY === null ? null : (
								this.props.item.IGNITION_KEY === 0 ? (
									<i className={'icon icon-vpn_key ml-2 text-muted'} />
								) : (
									this.props.item.IGNITION_KEY !== this.props.context.state.user.object.ID && this.props.item.IGNITION_KEY !== 0 ? (
										<i className={'icon icon-vpn_key ml-2 text-danger'} />
									) : (
										<i className={'icon icon-vpn_key ml-2 text-success'} />
									)
								)
							)}

							{this.props.item.ACCUMULATOR === null ? null : (
								<i className={'icon icon-offline_bolt ml-2 text-danger'} />
							)}

							<i className={this.props.item.IS_FAVORITE === true ? `text-warning icon icon-star_purple500` : 'icon text-muted icon-star_outline ms-2'} />

						</div>
					</div>

					<div className="d-flex mt-1">
						<h5 className="text-body">
							{this.props.item.CAR_NAME}
						</h5>
					</div>

					{this.props.item?.LOCATION !== '' ? (
						<div className={"d-flex justify-content-between mb-0 mt-2 text-muted small"}>
							<div>
								<i className={`icon icon-${this.props.item?.LOCATION.icon} d-inline-block me-2`} />
								{this.props.item?.LOCATION.title}
							</div>
							<div>
								<i className={`icon icon-${this.props.item?.LOCATION.icon} d-inline-block me-2`} />
								{this.props.item?.G_NUMBER}
							</div>
						</div>
					) : null}

					{this.props.item?.LAST_STATUS_EVENT_LONG ? (
						<div className={"alert alert-info mb-0 mt-2 text-muted small d-flex justify-content-between"}>
							<div>
								<i className={`icon icon-timer d-inline-block me-2`} />
								{ this.props.item?.LAST_STATUS_EVENT_LONG }
							</div>
							<div>
								<i className={"icon icon-person"} /> {this.props.item.LAST_STATUS_EVENT_AUTHOR_NAME} {this.props.item.LAST_STATUS_EVENT_AUTHOR_LAST_NAME}
							</div>
						</div>
					) : null}
				</div>
			</div>
		)
	}
}
