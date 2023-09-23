import React from 'react';

import { Spinner } from "../../../UI";


export class Form extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			errors: null,
			loading: false,
			data: {
				name: '',
				fname: '',
				lname: '',
				phone: '',
				drive: ''
			}
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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

	handleSubmit = async (e) => {
		e.persist();

		await this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		if(this.state.data.name === '' || this.state.data.fname === '' || this.state.data.lname === '' || this.state.data.phone === '' || this.state.data.drive === ''){

			await this.setState((prevState) => ({
				...prevState,
				errors: true
			}));
		}else{
			await this.setState((prevState) => ({
				...prevState,
				errors: false
			}));
			await this.props.onSubmit(this.state.data);
		}

		await this.setState((prevState) => ({
			...prevState,
			loading: false
		}));
	};

	render() {
		return (
			<>
				{this.state.loading === true ? (
					<Spinner />
				) : (
					<>

						{this.state.errors === null ? (
							<div className={'alert alert-warning'} >Заполните форму для тест-драйва</div>
						) : (
							<div className={'alert alert-danger'} >Все поля обязательны для заполнения</div>
						)}

						<div className={'input-group'}>
							<input
								name={`fname`}
								onChange={this.handleChange}
								className={"form-control mb-3 border-secondary"}
								autoComplete={`off`} value={this.state.data.fname}
								placeholder={"Фамилия"}
							/>
						</div>
						<div className={'input-group'}>
							<input
								name={`name`}
								onChange={this.handleChange}
								className={"form-control mb-3 border-secondary"}
								autoComplete={`off`}
								value={this.state.data.name}
								placeholder={"Имя"}
							/>
						</div>
						<div className={'input-group'}>
							<input
								name={`lname`}
								onChange={this.handleChange}
								className={"form-control mb-3 border-secondary"}
								autoComplete={`off`}
								value={this.state.data.lname}
								placeholder={"Отчество"}
							/>
						</div>
						<div className={'input-group'}>
							<input
								name={`phone`}
								onChange={this.handleChange}
								className={"form-control mb-3 border-secondary"}
								autoComplete={`off`}
								value={this.state.data.phone}
								placeholder={"Номер телефона"}
							/>
						</div>
						<div className={'input-group'}>
							<input
								name={`drive`}
								onChange={this.handleChange}
								className={"form-control mb-3 border-secondary"}
								autoComplete={`off`}
								value={this.state.data.drive}
								placeholder={"Водительское удостоверение"}
							/>
						</div>

						<button className="btn btn-primary w-100" onClick={this.handleSubmit}>Далее</button>
					</>
				)}
			</>
		);
	}
}
