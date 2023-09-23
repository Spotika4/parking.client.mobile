import React from 'react';


export class Search extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			loading: false,
			message: false,
		};

		this.handleSearch = this.handleSearch.bind(this);
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

	handleSearch = async () => {
		this.setState((prevState) => ({
			...prevState,
			loading: true
		}));

		const search = document.querySelector(`#SEARCH_INNER_ID`).value;
		if(search === ''){
			await this.setState((prevState) => ({
				...prevState,
				message: 'Необходимо указать номер парковочного места',
				loading: false
			}));
		}

		let all = document.querySelectorAll(`.inner_id-${search}`);
		if(all.length === 0){
			await this.setState((prevState) => ({
				...prevState,
				message: 'Указанное парковочное место не найдено',
				loading: false
			}));
			return true;
		}

		return new Promise((resolve, reject) => {
			document.querySelector(`.inner_id.active`)?.classList.remove('active');
			document.querySelector(`.inner_id-${search}`).classList.add('active');

			setTimeout(() => {
				document.querySelector(`.inner_id-${search}`).scrollIntoViewIfNeeded();

				setTimeout(() => {

					this.setState((prevState) => ({
						...prevState,
						message: false,
						loading: false
					}), () => this.props.context.dialog(false));

				}, 300);
			}, 100);
		});
	};

	render() {
		return (
			<>
				{this.state.loading === true ? (
					<div className={"spinner"} />
				) : (
					<>
						{this.state.message !== false ? (
							<>{this.state.message}</>
						) : (
							<>Укажите номер парковочного места</>
						)}
						<div className={'input-group'}>
							<input className={"form-control mt-3 border-primary"} id={"SEARCH_INNER_ID"} autoComplete={`off`} type={`number`}/>
						</div>
						<div className={"mt-2 d-flex justify-content-around"}>
							<div className={`d-block w-100 btn btn-primary ml-0 mb-0 me-2 pt-2 pb-2`} onClick={async () => await this.handleSearch()}>Искать</div>
							<div className={`d-block w-100 btn btn-secondary mr-0 mb-0 ms-2 pt-2 pb-2`} onClick={() => this.props.context.dialog(false)}>Отмена</div>
						</div>
					</>
				)}
			</>
		);
	}
}
