import React from 'react';

import { Tabs, Sector, Service, Zone, Place, Header } from "../../../UI";


export class Screen extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			STATUS_ID: 2,
			SECTOR_ID: false,
			SERVICE_ID: false,
			ZONE_ID: false,
			PLACE_ID: false,
		};

		this.handleSector = this.handleSector.bind(this);
		this.handleService = this.handleService.bind(this);
		this.handleZone = this.handleZone.bind(this);
		this.handlePlace = this.handlePlace.bind(this);
		this.handleStatus = this.handleStatus.bind(this);
	}

	componentDidMount = async () => {
		this.setState((prevState) => ({
			...prevState
		}));
	};

	componentWillUnmount(){
		this.setState = (state, callback) => {
			return false;
		};
	}

	handleSector = async (item) => {
		await this.setState((prevState) => ({
			...prevState,
			STATUS_ID: 2,
			SECTOR_ID: item.ID,
			SERVICE_ID: false,
			ZONE_ID: false,
			PLACE_ID: false,
		}));
	};

	handleService = async (item) => {
		await this.setState((prevState) => ({
			...prevState,
			STATUS_ID: 5,
			SECTOR_ID: false,
			SERVICE_ID: item.ID,
			ZONE_ID: false,
			PLACE_ID: false,
		}));

		let quest = `Вы уверены, что хотите переместить ${this.props.car.CAR_NAME} (${this.props.car.G_NUMBER_FORMAT}) из "${this.props.car.LOCATION.title}" в сервис "${item.NAME}"`;

		return this.props.dialog({
			type: `confirm`,
			header: `Перемещение`,
			content: quest,
			accept: await this.handleStatus
		});
	};

	handleZone = async (item) => {
		await this.setState((prevState) => ({
			...prevState,
			STATUS_ID: 12,
			ZONE_ID: item.ID,
			SERVICE_ID: false,
			PLACE_ID: false,
			SECTOR_ID: false,
		}));

		let quest = `Вы уверены, что хотите переместить ${this.props.car.CAR_NAME} (${this.props.car.G_NUMBER_FORMAT}) из "${this.props.car.LOCATION.title}" на территорию "${item.NAME}"`;

		return this.props.dialog({
			type: `confirm`,
			header: `Перемещение`,
			content: quest,
			accept: await this.handleStatus
		});
	};

	handlePlace = async (item) => {
		if(!item?.place?.ID) return;

		await this.setState((prevState) => ({
			...prevState,
			STATUS_ID: 2,
			PLACE_ID: item.place.ID,
			INNER_ID: item.place.INNER_ID,
			SERVICE_ID: false,
			ZONE_ID: false,
		}));

		let quest = `Вы уверены, что хотите переместить ${this.props.car.CAR_NAME} (${this.props.car.G_NUMBER_FORMAT}) из "${this.props.car.LOCATION.title}" в "${item.place.LOCATION.title}"`;

		if(item.place.CAR !== false){
			quest = `Вы уверены, что хотите поменять местами автомобили ${this.props.car.CAR_NAME} (${this.props.car.G_NUMBER_FORMAT}, ${this.props.car.LOCATION.title}) и ${item.place.CAR.CAR_NAME} (${item.place.CAR.G_NUMBER_FORMAT}, ${item.place.LOCATION.title})?`;
		}

		return this.props.dialog({
			type: `confirm`,
			header: `Перемещение`,
			content: quest,
			accept: await this.handleStatus
		});
	};

	handleStatus = async () => {
		return this.props.handleStatus(this.state).then((result) => {
			if(result?.success === true){
				this.props.handleScreen('car');
			}

			return result;
		});
	};

	handleBack = async () => {
		if(this.state.SECTOR_ID === false){
			await this.props.handleScreen('car');
		}else{
			await this.setState((prevState) => ({
				...prevState,
				SECTOR_ID: false
			}));
		}
	};

	render(){

		return (
			<>
				<Header
					title={this.props.car.CAR_NAME}
					onBackClick={this.handleBack}
				/>
				{this.state.SECTOR_ID === false ? (
					<Tabs tabs={[
						{ name: 'Сектора', children: (
							<Sector.List
								onClick={this.handleSector}
							/>
						) },
						{ name: 'Сервисы', children: (
							<Service.List
								onClick={this.handleService}
							/>
						) },
						{ name: 'Зоны', children: (
							<Zone.List
								onClick={this.handleZone}
							/>
						) }
					]} />
				) : (
					<Place.Table
						context={this.context}
						visibility={this.state.visibility}
						onClick={this.handlePlace}
						sector_id={this.state.SECTOR_ID}
					/>
				)}
			</>
		);
	}
}
