import React from 'react';

import {Header, Car, User} from "../../../components/UI";


export class Search extends React.Component {


	constructor(props) {
		super(props);

		this.state = {
			query: '',
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount = async () => {
		await this.setState((prevState) => ({
			...prevState,
		}));

		this.handleChange = this.handleChange.bind(this);
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		};
	}

	handleChange = async (e) => {
		e.persist();
		await this.setState((prevState) => ({
			...prevState,
			query: e.target.value,
		}));
	};

	render(){

		return (
			<>
				<Header {...{
					title: this.props.context.state.user.object.NAME,
					onClick: () => this.props.context.sider({
						child: () => (
							<User.Profile
								context={this.props.context}
								ID={this.props.context.state.user.object.ID}
								exit={true}
							/>
						)
					})
				}}>

					<form method={"GET"} className="d-block d-flex mb-3">
						<div className={'input-group w-100 mb-0'}>
							<div className="input-group-text">
								<i className="icon icon-search" />
							</div>
							<input
								min={1}
								type="text"
								autoComplete="off"
								className="form-control shadow"
								placeholder="Поиск автомобиля"
								value={this.state.query || ''}
								onChange={this.handleChange}
							/>
						</div>
					</form>

				</Header>

				<main>
					{this.state.query === '' ? (
						this.props.children
					) : (
						<Car.List
							filter={{
								LOGIC: 'SEARCH',
								REF_KEY: this.state.query,
								VIN: this.state.query,
								VIN2: this.state.query,
								G_NUMBER: this.state.query
							}}
							context={this.props.context}
						/>
					)}
				</main>
			</>
		);
	}
}
