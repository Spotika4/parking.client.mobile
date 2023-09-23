import React from 'react';

import { Car } from "../../../UI";


export class Cell extends React.Component {


	constructor(props){
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = async (e) => {
		if(this.props.onClick){
			return this.props.onClick(this.props.item);
		}

		if(this.props.item?.place?.CAR_ID > 0 || this.props.item?.place?.INNER_ID > 0) {
			document.querySelector(`.sector-cell.active`)?.classList.remove('active');
			e.target.classList.add('active');
		}

		if(this.props.item?.place?.CAR_ID > 0){
			e.target.classList.add('active');
			return await this.props.context.sider({
				child: () => (
					<Car.Item.Full
						id={this.props.item.place.CAR_ID}
						context={this.props.context}
					/>
				)
			});
		}
	};

	render() {

		return (
			<div className={this.props.item.className} onClick={this.handleClick}>
				<div className={`opacity`} />

				<div className={`g-number text-warning text-center`}>
					{this.props.item?.place?.CAR?.G_NUMBER_FORMAT?.slice(0, -3)}
				</div>

				<div className={`inner-id`}>
					{this.props.item.place?.INNER_ID}
				</div>

				<div className={`status ${this.props?.item.type}`}>
					<i className={`icon ${this.props?.item.icon}`} />
				</div>
			</div>
		);
	}
}
