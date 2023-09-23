import React from 'react';

import { Header, Scroller, Spinner } from "../../../UI";
import { Object } from "../../../App";

import { Form } from "./Form";


export class Screen extends React.Component {

	model = new Object.Car();


	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			message: null,
			exists: null,
			id: props.id,
			form: null,
			barcode: null,
		};

		this.model.object.ID = props.id;
	}

	componentDidMount = async () => {

		this.setState((prevState) => ({
			...prevState
		}));

		await this.handleStatus();
	};

	handleStatus = async () => {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		const controller = new AbortController();
		await this.setState((prevState) => ({
			...prevState,
			loading: true,
			controller: controller
		}));

		this.model.statusReserve(false, controller).then(async result => {
			if(result !== false){

				if(result.STATUS === true){
					// todo: автомобиль уже в тест драйве
					await this.setState((prevState) => ({
						...prevState,
						form: true
					}));
					return await this.handleBarcode();
				}

				if(result.STATUS === false){
					// todo: автомобиль занят, либо конкретный юзер не может взять в тест драйв
					await this.setState((prevState) => ({
						...prevState,
						form: false,
						exists: (result?.EXISTS?.ID) ? result?.EXISTS : null,
						message: (result?.EXISTS?.ID) ? `У Вас уже иммется один автомобиль в блокирующем статусе` : `Автомобиль уже зарезервирован`,
					}));
				}

				if(result.STATUS === null){
					// todo: автомобиль свободен
				}
			}

			this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
			}));
		});

	};

	handleReserve = async (form) => {

		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		const controller = new AbortController();
		await this.setState((prevState) => ({
			...prevState,
			form: form,
			loading: true,
			controller: controller,
		}));

		this.model.addReserve({ Name: `${form?.fname} ${form?.name} ${form?.lname}`, License: form?.drive, Phone: form?.phone }, controller).then(async result => {
			if(result !== false){
				if(result.STATUS === true){
					return await this.handlePrintable().then(async () => {
						return await this.handleBarcode();
					})
				}

				if(result.STATUS === false){
					await this.setState((prevState) => ({
						...prevState,
						message: result.ORIGINAL.Result,
						controller: null,
					}));
				}
			}

			await this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
			}));
		});
	};

	handleFree = async (form) => {

		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		const controller = new AbortController();
		await this.setState((prevState) => ({
			...prevState,
			loading: true,
			controller: controller,
		}));

		this.model.freeReserve(false, controller).then(async result => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
			}));

			await this.props.handleScreen('car');
		});
	};

	handleBarcode = async () => {

		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		const controller = new AbortController();
		await this.setState((prevState) => ({
			...prevState,
			loading: true,
			controller: controller,
		}));

		this.model.barcodeReserve(false, controller).then(async result => {
			if(result !== false){

				await this.setState((prevState) => ({
					...prevState,
					message: `Данный штрихкод понадобится для въезда/выезда через проходную`,
					barcode: `data:image/jpeg;base64,${result?.barcode}`
				}));
			}

			this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null
			}));
		});
	};

	handlePrintable = async (form) => {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		const controller = new AbortController();
		await this.setState((prevState) => ({
			...prevState,
			form: form,
			loading: true,
			controller: controller,
		}));

		this.model.saveReserve(false, controller).then(async result => {
			if(result?.STATUS === false){
				await this.setState((prevState) => ({
					...prevState,
					message: `Не удалось зарезервировать автомобиль`
				}));
			}

			this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
			}));
		});
	};

	handleBack = async () => {
		if(this.state.form && this.state.barcode === null){
			await this.setState((prevState) => ({
				...prevState,
				message: null,
				form: null
			}));
		}else{
			await this.props.handleScreen('car');
		}
	};

	render() {
		return (
			<>
				<Header
					title={`Тест-драйв`}
					onBackClick={this.handleBack}
				/>

				<Scroller>
					{this.state.loading === true ? ( <Spinner /> ) : (
						<>
							{this.state.message === null ? null : (
								<div className={'alert alert-warning'}>{this.state.message}</div>
							)}

							{this.state.form === null ? (
								<Form
									onSubmit={ async (data) => await this.handleReserve(data)}
								/>
							) : (
								this.state.form === false ? null : (
									this.state.barcode === null ? ( <Spinner /> ) : (
										<>
											<img src={`${this.state.barcode}`} alt={""} className={'w-100 mb-4'}/>

											<button className={'btn btn-danger text-white w-100 text-center mb-2'}>Припарковать</button>
											<button className={'btn btn-outline-info w-100 text-center'}>Повторная печать</button>
										</>
									)
								)
							)}
						</>
					)}
				</Scroller>
			</>
		)
	}
}
