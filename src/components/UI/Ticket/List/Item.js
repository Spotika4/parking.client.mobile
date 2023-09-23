import React from 'react';

import { Car, Necessitate } from "../../../UI";


export class Item extends React.Component {


	constructor(props){
		super(props);

		this.handleItemClick = this.handleItemClick.bind(this);
	}

	handleItemClick = async () => {
		await this.props.context.sider({
			child: () => (
				this.props.context.state.user.object.ROLES?.SELLER ? (

					<Car.Item.Full
						screen={`tickets`}
						context={this.props.context}
						id={this.props.item.CAR.ID}
						item={{
							...this.props.item,
							ID: this.props.item.CAR.ID
						}}
					/>

				) : (

					<Car.Item.Full
						context={this.props.context}
						id={this.props.item.CAR.ID}
						item={{
							...this.props.item,
							ID: this.props.item.CAR.ID
						}}
					/>
				)
			)
		});
	};

	handleNecessitatesClick = async () => {
		this.props.context.dialog({
			header: 'Выберите потребности для закрытия',
			buttons: [{
				text: 'Да',
				onClick: () => null
			}],
			child: () => <Necessitate.List.Checklist
				car_id={this.props.item.CAR.ID}
				context={this.props.context}
				callback={() => {
					this.props.callback();
					this.componentDidMount()
				}}
			/>,
		});
	};

	render() {

		return (
			<div className={`d-block col position-relative rounded p-3 shadow mb-4 border-0`}>
				<div onClick={this.handleItemClick}>
					<div className="d-flex">
						<h5 className="text-body mb-0 name">{this.props.item.CAR.CAR_NAME}</h5>
					</div>
					<div className={"text-muted mt-1 small"}>{this.props.item.CAR.G_NUMBER_FORMAT}</div>
					<div className={"text-muted mt-1 small"}>{this.props.item.CAR.VIN_FORMAT}</div>
				</div>

				<div className="d-flex justify-content-between mt-2">
					<div className="position-relative">
						{this.props.item.NECESSITATES?.length && this.props.item.NECESSITATES.length > 0 ? ( this.props.item.NECESSITATES.map((necessitate, i) => (
							<div key={i} className={"col col-12 notice danger"}>
								<div className="marker text-body position-relative danger">{necessitate.NAME}</div>
							</div>
						))) : null}
					</div>

					{(this.props.context.state.user.object.ROLES?.SELLER) ? null : (
						<div className="position-relative pt-6">
							<button className="btn btn-primary necessitate-end-btn" onClick={this.handleNecessitatesClick}>
								<span>Завершить</span>
							</button>
						</div>
					)}
				</div>
			</div>
		);
	}
}
