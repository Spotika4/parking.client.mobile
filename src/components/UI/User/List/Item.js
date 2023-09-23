import React from 'react';

import { User } from "../../../UI";


export class Item extends React.Component {


	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = async () => {
		await this.props.context.sider({
			child: () => (
				<User.Profile
					context={this.props.context}
					{...this.props.item}
					exit={false}
				/>
			)
		});
	};

	render() {
		let date  = null;
		let time  = null;
		let date_string  = null;
		let last_activity  = null;
		if(this.props.item.LAST_ACTIVITY_DATE !== null){
			date  = new Date(this.props.item.LAST_ACTIVITY_DATE.replace(/-/g, "/"));

			last_activity = Number(((new Date()).valueOf() - date.valueOf()) / 1000);
			date_string = date.toLocaleDateString("ru-RU", {
				year: 'numeric',
				month: 'numeric',
				day: 'numeric'
			});
			time = date.toLocaleTimeString("ru-RU");
		}

		return (
			<div onClick={this.handleClick}>
				<div className={`d-block col position-relative rounded p-3 shadow mb-4 border border-5 border-top-0 border-end-0 border-bottom-0 ${Number(last_activity) > 0 && Number(last_activity) < 900 ? ` border-success` : ''} cursor-pointer`}>
					<div className="d-flex">
						<div className={'me-4'}>
							<div className="thumb d-inline-block">
								{!this.props.item.PERSONAL_PHOTO ? (<i className={'icon icon-account_circle mr-1'} />) : (
									<img src={this.props?.item?.PERSONAL_PHOTO} alt={"Фотография пользователя"} className={'rounded-circle'} />
								)}
							</div>
						</div>
						<div className={'w-100 mt-1'}>
							<div className="d-flex justify-content-between ">
								<h5 className="text-body mb-0">
									{this.props.item.NAME === '' || this.props.item.NAME === null ? (
										<div className={'h5'}>{this.props.item.EMAIL === '' || this.props.item.EMAIL === null ? (this.props.item.LOGIN) : (this.props.item.EMAIL)}</div>
									) : (
										<div>
											<div>{this.props.item.LAST_NAME}</div>
											<div>{this.props.item.NAME}</div>
										</div>
									)}
								</h5>
								{last_activity === null ? null : (
									<div className="text-muted small text-right">
										<div className="strong"><i className={'icon icon-access_time mr-1'} /> {time}</div>
										<div className="strong"><i className={'icon icon-event_note mr-1'} /> {date_string}</div>
									</div>
								)}
							</div>

							<div className="text-muted small mt-2">
								{this.props.item.ROLE?.join(" / ")}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
