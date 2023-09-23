import React from 'react';

import {Header, Spinner, Tabs, User} from "../../../UI";
import { Object } from "../../../../components/App";


export class Profile extends React.Component {


	constructor(props){
		super(props);

		this.state = {
			controller: null,
			loading: true,
			data: {}
		};

		this.handleBack = this.handleBack.bind(this);
		this.handleExit = this.handleExit.bind(this);
	}

	componentDidMount = async () => {
		this.setState((prevState) => ({
			...prevState,
		}));

		await this.handleLoad();
	};

	componentWillUnmount(){
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		this.setState = (state, callback) => {
			return false;
		};
	}

	handleLoad = async (e) => {
		await this.setState((prevState) => ({
			...prevState,
			loading: true,
			data: this.props
		}));

		let model = new Object.User();
		return await model.load(this.props.ID).then(async (result) => {
			await this.setState((prevState) => ({
				...prevState,
				loading: false,
				data: model.object
			}));

		});
	};

	handleExit = async (e) => {


		let dialog = {
			type: `confirm`,
			header: `Профиль`,
			content: `Вы уверены, что хотите выйти из приложения?`,
			accept: () => {
				return this.props.context.logout();
			},
		};

		return this.props.context.dialog(dialog);
	};

	handleBack = async (e) => {
		await this.props.context.sider(false);
	};

	render(){

		return (
			<>
				<Header
					title={this.state?.loading ? 'Профиль пользователя' : `${this.state?.data?.LAST_NAME} ${this.state?.data?.NAME}`}
					onBackClick={this.handleBack}
				/>

				{this.state?.loading ? ( <Spinner className={`spinner`} /> ) : (
					<main>
						<div className="d-flex flex-column overflow-hidden h-100 mt-2">
							<div className="d-flex flex-row p-3 shadow ms-3 me-3 mt-3 rounded">
								<div className="d-flex profile-thumb">
									{!this.state?.data?.PERSONAL_PHOTO || this.state?.loading ? ( <div className={`profile-thumb`} /> ) : (
										<img className="rounded-circle" src={this.state?.data?.PERSONAL_PHOTO} alt={"Фотография пользователя"} />
									)}
								</div>

								<div className="ms-3">
									<div className="d-block fs-5 mb-1">
										<strong className={`d-block`}>
											{this.state?.data?.LAST_NAME}
										</strong>
										<strong className={`d-block`}>
											{this.state?.data?.NAME}
										</strong>
									</div>

									{!this.state?.data?.ROLE ? null :
										( <div className={`text-muted small`}>{this.state?.data?.ROLE ? this.state?.data?.ROLE.join(" / ") : false}</div> )
									}

									{!this.props?.exit ? null :
										(
											<div className="link-info mt-4" onClick={this.handleExit}>Выйти</div>
										)
									}
								</div>
							</div>

							<div className="d-flex flex-row overflow-hidden mt-1">

								<Tabs tabs={[
									{ name: 'Профиль', children: (
										this.state?.loading ? (
											<Spinner />
										) : (
											<User.Detail.List {...this.state?.data} />
										)
									) },
									{ name: 'История', children: (
										this.state?.loading ? (
											<Spinner />
										) : (
											<User.History.List {...this.state?.data} />
										)
									) },
									{ name: 'Статистика', children: (
										this.state?.loading ? (
											<Spinner />
										) : (
											<User.Stats.List {...this.state?.data} />
										)
									) }
								]} />

							</div>

						</div>
					</main>
				)}
			</>
		);
	}
}
