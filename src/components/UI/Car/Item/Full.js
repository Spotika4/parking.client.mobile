import React from 'react';

import { Header, Scroller, Spinner, Car, History, Necessitate, Tabs, Ticket } from "../../../UI";
import { Object } from "../../../App";


export class Full extends React.Component {

	model = new Object.Car();
	necessitate = new Object.Necessitate();


	constructor(props){
		super(props);

		this.state = {
			id: props.id,
			item: (props?.item) ? props?.item : false,
			necessitates: {
				all: [],
				added: [],
				blocked: [],
				collection: [],
			},
			screen: (props?.screen) ? props?.screen : `car`,
			loading: (!props?.item),
			scrolled: false
		};

		this.handleScreen = this.handleScreen.bind(this);
		this.handleParking = this.handleParking.bind(this);
		this.handleUnblock = this.handleUnblock.bind(this);
		this.handleFavorite = this.handleFavorite.bind(this);
		this.handleIgnition = this.handleIgnition.bind(this);
		this.handleAccumulator = this.handleAccumulator.bind(this);
		this.handleNecessitates = this.handleNecessitates.bind(this);

		this.model.necessitates(this.props.id).then(collection => {
			return this.setState((prevState) => ({
				...prevState,
				necessitates: collection
			}));
		});
	}

	componentDidMount = async () => {

		if(this.state.item === false){

			this.setState((prevState) => ({
				...prevState,
				loading: true
			}));
		}

		this.model.get(this.state.id).then(async success => {

			await this.setState((prevState) => ({
				...prevState,
				loading: false,
				item: this.model.object
			}));
		});
	};

	componentWillUnmount() {

		this.setState = (state, callback) => {
			return false;
		}
	}

	handleScreen = async (key) => {
		await this.setState((prevState) => ({
			...prevState,
			screen: key
		}));
	};

	handleUnblock = async (e) => {

		let dialog = {
			type: `confirm`,
			header: `Демонстрация`,
			content: `Вы уверены, что хотите начать демонстрацию?`,
			accept: () => {
				return this.model.demo(this.props.id).then((result) => {
					this.setState((prevState) => ({
						...prevState,
						item: {
							...prevState.item,
							BLOCKED: !result.success
						}
					}));

					return result;
				});
			}
		};

		return this.props.context.dialog(dialog);
	};

	handleIgnition = async (e) => {

		let dialog = {
			type: `confirm`,
			header: `Управление ключами`,
			content: `Вы уверены?`
		};

		const seller = (dialog) => {

			let ignition = this.props.context.state.user.object.ID;
			if(this.state.item.IGNITION_KEY === null){
				dialog.content = `Вы уверены, что хотите "забрать" ключи под свою ответственность?`;
			}else if(this.state.item.IGNITION_KEY === 0){
				dialog.content = `Вы уверены, что хотите "забрать" ключи из "ключницы" под свою ответственность?`;
			}else if(this.state.item.IGNITION_KEY === this.props.context.state.user.object.ID){
				ignition = null;
				dialog.content = `Вы уверены, что хотите "вернуть" ключи в салон автомобиля?`;
			}else{
				dialog.content = `Вы уверены, что хотите "забрать" ключи у ${this.state.item.IGNITION_LAST_NAME} ${this.state.item.IGNITION_NAME} под свою ответственность?`;
			}

			if(ignition !== false){
				dialog.accept = () => {

					return this.model.ignition(this.props.id, ignition).then((result) => {
						this.setState((prevState) => ({
							...prevState,
							item: result.data
						}));

						return result;
					});
				};
			}

			return dialog;
		};

		const tech = (dialog) => {

			let ignition = null;
			if(this.state.item.IGNITION_KEY === null){
				ignition = 0;
				dialog.content = `Вы уверены, что хотите "забрать" коючи в "ключницу"?`;
			}else if(this.state.item.IGNITION_KEY === 0){
				dialog.content = `Вы уверены, что хотите "вернуть" ключи из "ключницы"?`;
			}else if(this.state.item.IGNITION_KEY === this.props.context.state.user.object.ID){
				ignition = null;
				dialog.content = `Вы уверены, что хотите "вернуть" ключи в салон автомобиля?`;
			}else{
				ignition = 0;
				dialog.content = `Вы уверены, что хотите "забрать" ключи у ${this.state.item.IGNITION_LAST_NAME} ${this.state.item.IGNITION_NAME} в "ключницу"?`;
			}

			if(ignition !== false) {
				dialog.accept = () => {
					return this.model.ignition(this.props.id, this.state.item.IGNITION_KEY === null ? {IGNITION_KEY: 0} : false).then((result) => {
						this.setState((prevState) => ({
							...prevState,
							item: result.data
						}));

						return result;
					});
				};
			}

			return dialog;
		};

		return this.props.context.dialog(this.props.context.state.user.object.ROLES?.SELLER ? seller(dialog) : tech(dialog));
	};

	handleAccumulator = async (e) => {

		let dialog = {
			type: `confirm`,
			header: `Управление аккумулятором`,
			content: this.state.item.ACCUMULATOR === null ? `Вы уверены, что хотите "забрать" аккумулятор?` : `Вы уверены, что хотите "вернуть" аккумулятор?`,
			accept: () => {
				return this.model.accumulator(this.props.id).then((result) => {
					this.setState((prevState) => ({
						...prevState,
						item: {
							...prevState.item,
							ACCUMULATOR: this.state.item.ACCUMULATOR === null ? 1 : null
						}
					}));

					return result;
				});
			},
		};

		return this.props.context.dialog(dialog);
	};

	handleFavorite = async (e) => {

		await this.props.context.favorite(this.state.id).then(() => {
			this.setState((prevState) => ({
				...prevState,
				item: {
					...prevState.item,
					IS_FAVORITE: !this.state.item?.IS_FAVORITE
				}
			}));
		});
	};

	handleParking = async (e) => {

		return this.props.context.dialog({
			type: `confirm`,
			header: `Перемещение`,
			content: `Вы уверены, что хотите сменить парковочно место автомобиля?`,
			accept: async () => {
				return new Promise((resolve, reject) => {
					this.handleScreen(`parking`);
					return resolve({ success: true });
				});
			}
		});
	};

	handleTestDrive = async (e) => {

		return this.props.context.dialog({
			type: `confirm`,
			header: `Перемещение`,
			content: `Вы уверены, что хотите начать процедуру регистрации тест-драйва?`,
			accept: async () => {
				return new Promise((resolve, reject) => {
					this.handleScreen(`tdrive`);
					return resolve({ success: true });
				});
			}
		});
	};

	handleStatus = async (status) => {

		return this.model.setStatus(this.props.id, status).then((result) => {

			this.setState((prevState) => ({
				...prevState,
				item: {
					...prevState.item,
					LOCATION: this.model.location(status)
				}
			}));

			return result;
		});
	};

	handleNecessitates = async (e) => {

		return this.model.necessitates(this.props.id);
	};

	handleBack = async () => {
		if(this.state.screen === `car` || this.state.screen === `tickets`){
			await this.props.context.sider();
		}
		await this.setState((prevState) => ({
			...prevState,
			screen: `car`
		}));
	};

	handleStartScroll = async (e) => {
		await this.setState((prevState) => ({
			...prevState,
			scrolled: true
		}));
	};

	handleEndScroll = async (e) => {
		await this.setState((prevState) => ({
			...prevState,
			scrolled: false
		}));
	};

	render() {

		return (this.state.loading === true ? ( <Spinner /> ) : (
			<>

				<main className={`collection vw-100 pb-0 bg-body`}>

					{/* Карточка автомобиля */}
					<main className={this.state.screen === 'car' ? `active` : `disabled`}>

						{this.state.screen === 'tickets' ? null : (
							<>
								<Header
									title={this.state.item.CAR_NAME}
									onBackClick={this.handleBack}
								/>

								<div className={`d-flex flex-column overflow-hidden h-100 vw-100 ${this.state.scrolled === true ? `scrolled` : ``} ${this.state.item.BLOCKED === false ? `unblocked` : `blocked`}`}>

									<Car.Item.Meta
										item={this.state.item}
										handleFavorite={this.handleFavorite}
									/>

									<div className="d-flex flex-row overflow-hidden mt-1">

										<Tabs noSwipe={true} tabs={[
											{ name: 'Основная', children: (
												<Scroller
													className={`pb-9`}
													onStartScroll={this.handleStartScroll}
													onEndScroll={this.handleEndScroll}
												>
													<div className={`row mb-3`}>

														{/* цена */}
														<div className={`col-6 d-flex flex-fill`}>

															<Car.Item.Price
																price={this.state.item?.PRICE_FORMAT}
															/>

														</div>

														<div className={`col-6 d-flex`}>

															<div className={`col-6 d-flex flex-fill`}>

																{/* ключи */}
																<Car.Item.Buttons.Ignition
																	className={`me-2`}
																	handleIgnition={this.handleIgnition}
																	user={this.props.context.state.user.object}
																	car={this.state.item}
																/>

															</div>

															<div className={`col-6 d-flex flex-fill`}>

																{/* аккумулятор */}
																<Car.Item.Buttons.Accumulator
																	className={`ms-2`}
																	handleAccumulator={this.handleAccumulator}
																	user={this.props.context.state.user.object}
																	accumulator={this.state.item?.ACCUMULATOR}
																/>

															</div>
														</div>

													</div>

													<div className={`row`}>

														{this.props.context.state.user.object.ROLES?.SELLER ? (
															<>

																<div className={`col-6 d-flex flex-fill`}>
																	{this.state.item.BLOCKED === true ? (
																		<Car.Item.Buttons.Parking
																			title={`Припарковать`}
																			handleParking={this.handleParking}
																		/>
																	) : (
																		<Car.Item.Buttons.Baloon
																			car={this.state.item}
																			sider={this.props.context.sider}
																			dialog={this.props.context.dialog}
																			title={!this.state.item?.LOCATION.title ? this.state.item?.STATUS_NAME : this.state.item?.LOCATION.title}
																		/>
																	)}
																</div>

																<div className={`col-6 d-flex flex-fill`}>
																	<Car.Item.Buttons.Blocked
																		handleUnblock={this.handleUnblock}
																		blocked={this.state.item.BLOCKED}
																		disclaimer={false}
																	>
																		<Car.Item.Buttons.Tdrive
																			title={`Тест-драйв`}
																			handleTestDrive={this.handleTestDrive}
																		/>

																	</Car.Item.Buttons.Blocked>
																</div>

															</>
														) : null}

													</div>

													{this.state.item.NECESSITATE_TOTAL === 0 ? null : (

														<Necessitate.List.Forms
															rows={1}
															order={`SORT`}
															onlyActive={true}
															car_id={this.state.item.ID}
															context={this.props.context}
															callback={this.componentDidMount}
															user={this.props.context.state.user.object}
															necessitates={this.state.necessitates?.added}
															hasClosed={!this.props.context.state.user.object.ROLES?.SELLER}
														/>
													)}

													{/* характеристики */}
													{this.state.item.BLOCKED === true ? null : (
														<>
															<Car.Item.Characteristic {...this.state.item} />

															<div className={`row`}>
																<div className={`col-6 d-flex flex-fill`}>
																	<Car.Item.Buttons.Parking
																		title={`Припарковать`}
																		handleParking={this.handleParking}
																	/>
																</div>

																<div className={`col-6 d-flex flex-fill`}>
																	<button className="flex-fill position-relative btn btn-primary text-center w-100 pt-4 pb-4 loading" disabled={true}>
																		<i className="fa-solid fa-check-double fs-3" />
																		<span className="d-block mt-2">Выдача</span>
																	</button>
																</div>
															</div>
														</>
													)}

													{/* добавление потребностей */}
													<Necessitate.List.Buttons
														rows={3}
														order={`SORT`}
														onlyActive={true}
														car_id={this.state.item.ID}
														context={this.props.context}
														callback={this.componentDidMount}
														necessitates={this.state.necessitates?.collection}
														hasClosed={!this.props.context.state.user.object.ROLES?.SELLER}
													/>
												</Scroller>
											) },
											{ name: 'Диагностика', children: (
												<Car.Dcard.Item
													className={`pb-9`}
													id={this.state.item.ID}
													handleScreen={this.handleScreen}
												/>
											) },
											{ name: 'Автотека', children: (
												<Car.Autoteca.Item
													className={`pb-9`}
													id={this.state.item.ID}
													handleScreen={this.handleScreen}
												/>
											) },
											{ name: 'История', children: (
												<History.List
													className={`pb-9`}
													filter={{
														CAR_ID: this.state.item.ID
													}}
													handleScreen={this.handleScreen}
												/>
											) }
										]} />

									</div>

								</div>
							</>
						)}

					</main>

					{/* История тикетов */}
					<main className={this.state.screen === 'tickets' ? `active` : `disabled`}>

						{this.state.screen !== 'tickets' ? null : (
							<>
								<Header
									title={this.state.item.CAR_NAME}
									onBackClick={this.handleBack}
								/>

								<div className={`d-flex flex-column overflow-hidden h-100 vw-100 ${this.state.scrolled === true ? `scrolled` : ``} ${this.state.item.BLOCKED === true ? `blocked` : `unblocked`}`}>

									<Car.Item.Meta
										item={this.state.item}
										handleFavorite={this.handleFavorite}
									/>

									<div className="d-flex flex-row overflow-hidden mt-1 pb-9">

										<Tabs tabs={[
											{
												name: `Активные`,
												children: (

													<Ticket.History
														filter={{ ACTIVE: `Y`, ID: this.state.item.ID }}
														context={ this.props.context }
													/>
												)
											},
											{
												name: `Завершенные`,
												children: (

													<Ticket.History
														filter={{ ACTIVE: `N`, ID: this.state.item.ID }}
														context={ this.props.context }
													/>
												)
											}
										]} />

									</div>

								</div>
							</>
						)}

					</main>

					{/* Парковка автомобиля */}
					<main className={this.state.screen === 'parking' ? `active` : `disabled`}>

						{this.state.screen !== 'parking' ? null : (
							<Car.Parking.Screen
								car={this.state.item}
								handleScreen={this.handleScreen}
								handleStatus={this.handleStatus}
								dialog={this.props.context.dialog}
							/>
						)}

					</main>

					{/* Тест-драйв автомобиля */}
					<main className={this.state.screen === 'tdrive' ? `active` : `disabled`}>

						{this.state.screen !== 'tdrive' ? null : (

							<Car.Tdrive.Screen
								id={this.state.item.ID}
								title={this.state.item.CAR_NAME}
								handleScreen={this.handleScreen}
								context={this.props.context}
							/>

						)}
					</main>
				</main>

			</>
		));
	}
}
