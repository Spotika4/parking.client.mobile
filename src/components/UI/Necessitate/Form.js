import React from 'react';

import { Spinner } from "../../UI";
import { Object, Api } from "../../App";


export class Form extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			loading: false,
			message: false,
			data: {
				COMMENT: null,
				DESCRIPTION: (props.item.DESCRIPTION === null) ? props.item.DESCRIPTION : props.item.DESCRIPTION,
			},
			author_id: props.item.AUTHOR_ID,
			author: `${props.item.AUTHOR_LAST_NAME} ${props.item.AUTHOR_NAME}`,
		};

		if(this.state.author_id === false) this.state.description = '';

		this.handleAdd = this.handleAdd.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState,
		}));
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	handleChange = async (e) => {
		e.persist();
		await this.setState((prevState) => ({
			data: {
				...prevState.data,
				[e.target.name]: e.target.value
			}
		}));
	};

	handleAdd = async () => {
		let message = '';
		this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		Api.Necessitate.post(this.props.car_id, { NECESSITATE_ID: this.props.item.ID, DESCRIPTION: this.state.data.DESCRIPTION }).then(async result => {
			if(result.success === false) {
				message = result.message !== false ? result.message : 'Добавить потребность не удалось';
			}else{
				await this.props.callback();
				message = result.message !== false ? result.message : 'Потребность успешно добавлена';
			}

			this.setState((prevState) => ({
				...prevState,
				loading: false,
				message: message
			}));
		});
	};

	handleClose = async () => {
		let message = '';
		this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		Api.Necessitate.patch(this.props.car_id, { NECESSITATE_ID: this.props.item.NECESSITATE_ID, COMMENT: this.state.data.comment }).then(async result => {
			if(result.success === false) {
				message = result.message !== false ? result.message : 'Потребность закрыть не удалось';
			}else{
				await this.props.callback();
				message = result.message !== false ? result.message : 'Потребность успешно закрыта';
			}

			this.setState((prevState) => ({
				...prevState,
				loading: false,
				message: message
			}));
		});
	};

	handlePatch = async () => {
		let message = '';

		this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		Api.Necessitate.patch(this.props.car_id, this.state.data).then(async result => {

			this.setState((prevState) => ({
				...prevState,
				loading: false,
				message: message
			}));
		});
	};

	render() {
		return (
			<>
				{this.state.loading === true ? ( <Spinner /> ) : (
					this.state.message !== false ? (
						<>
							{this.state.message}

							<div className={"mt-4 d-flex justify-content-around"}>
								<div className={`d-block w-100 btn btn-secondary ms-2`} onClick={() => this.props.context.dialog(false)}>Хорошо</div>
							</div>
						</>
					) : (
						<>
							{this.state.author_id ? (
								<>
									<div className={`input-group`}>
										<input disabled onChange={this.handleChange} className={"form-control mb-3 border-secondary"} autoComplete={`off`} value={this.state?.author ?? ''} placeholder={"Постановщик"} />
									</div>
									<div className={'input-group'}>
										<textarea name={`DESCRIPTION`} disabled={this.state.author_id !== this.props.user.ID} onChange={this.handleChange} className={"form-control border-secondary"} autoComplete={`off`} value={this.state.data?.DESCRIPTION ?? ''} placeholder={"Описание"} />
									</div>
									<div className={'input-group'}>
										<textarea name={`COMMENT`} onChange={this.handleChange} className={"form-control border-secondary mt-3"} autoComplete={`off`} value={this.state.data?.COMMENT ?? ''} placeholder={"Комментарий"} />
									</div>
								</>
							) : (
								<div className={'input-group'}>
									<textarea name={`DESCRIPTION`} onChange={this.handleChange} className={"form-control border-secondary"} autoComplete={`off`} value={this.state.data.DESCRIPTION ?? ''} placeholder={"Описание"} />
								</div>
							)}

							<div className={"mt-4 d-flex"}>
								{this.state.data.author_id ? (
									<div className={`d-block w-100 btn btn-primary me-2`} onClick={this.handleClose}>Завершить</div>
								) : (
									<div className={`d-block w-100 btn btn-primary me-2`} onClick={this.handleAdd}>Назначить</div>
								)}

								<div className={`d-block w-100 btn btn-secondary ms-2`} onClick={() => {
									this.props.cancel();
									this.props.context.dialog(false)
								}}>Отмена</div>
							</div>
						</>
					)
				)}
			</>
		);
	}
}
