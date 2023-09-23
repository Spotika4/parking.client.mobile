import React from 'react';

import { Spinner } from "../../../UI";


export class Form extends React.Component {


	constructor(props) {
		super(props);

		this.state = {
			controller: null,
			loading: true,
			items: [],
			picked: [],
			display: '',
			search: '',
			params: null
		};

		if(props?.params){
			this.state.params = props.params;
		}

		if(props.picked){
			this.state.picked = props.picked;
		}

		if(props.display){
			this.state.value = props.display;
		}

		this.ref = React.createRef();
		this.handlePick = this.handlePick.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleLoadItems = this.handleLoadItems.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	componentDidMount = async () => {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		await this.handleLoadItems();
	};

	componentWillUnmount() {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		this.setState = (state, callback) => {
			return false;
		}
	}

	handleChange = async (e) => {
		e.persist();
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		const controller = new AbortController();
		let params = this.state.params;
		params.NAME = e.target.value;

		await this.setState((prevState) => ({
			...prevState,
			items: [],
			loading: true,
			search: e.target.value,
			controller: controller
		}), () => this.props.model.list(params, 'all', controller).then(result => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
				nav: this.props.model.nav,
				items: this.state.items.concat(this.props.model.objects)
			}));
		}));
	};

	handleLoadItems = async () => {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		this.setState((prevState) => ({
			...prevState,
			nav: false,
		}));

		const controller = new AbortController();

		await this.setState((prevState) => ({
			...prevState,
			items: [],
			loading: true,
			controller: controller
		}), () => this.props.model.list(this.state.params, 'all', controller).then(result => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
				nav: this.props.model.nav,
				items: this.state.items.concat(this.props.model.objects)
			}));
		}));
	};

	handlePick = async (e) => {
		let picked = [];
		let display = [];
		let el = e.target;
		let id = Number(el.getAttribute('data-id'));

		if(!this.props.hasOwnProperty('onlyOne') || this.props?.onlyOne !== true){
			picked = this.state.picked;
			display = (this.state.display?.length) ? this.state.display.split(', ') : [];
		}

		if(el.classList.contains('active')){
			el.classList.remove('active');
		}else{
			// если допускается только один активный элемент, то сначала снимаем со всех активность
			if(this.props.hasOwnProperty('onlyOne') && this.props.onlyOne === true){
				let elements = this.ref.current.querySelectorAll(".active");
				[].forEach.call(elements, function(el) {
					el.classList.remove("life-active");
				});
			}
			el.classList.add('life-active');
		}

		if(picked.includes(id)){
			picked.splice(picked.indexOf(id), 1);

			// заполняем заново массив с текстовым видом выбранных элементов
			display = [];
			let elements = this.ref.current.querySelectorAll(".active");
			[].forEach.call(elements, function(q) {
				display.push(q.innerText);
			});
		}else{
			picked.push(id);
			display.push(el.innerText);
		}

		await this.setState((prevState) => ({
			...prevState,
			display: display.join(', '),
			picked: picked
		}), async () => {
			if(this.props.hasOwnProperty('onPick')){
				this.props.onPick({data: this.state.picked, display: this.state.display}).then(result => {
					if(this.props.hasOwnProperty('onlyOne') && this.props.onlyOne === true){
						this.handleClose(e);
					}
				});
			}
		});
	};

	handleClear = async (e) => {
		await this.setState((prevState) => ({
			...prevState,
			picked: [],
			value: ''
		}));

		if(this.props.onClear){
			await this.props?.onClear(e);
		}

		this.handleClose(e);
	};

	handleClose =  async (e) => {
		await this.props.context.widget(false)
	};

	render() {
		return (
			<>

				<header className="shadow h-auto">
					<div className="container-fluid d-flex justify-content-between align-items-center">
						<div className={`h2 mb-3 mt-3`} onClick={this.handleClose}>
							<i className="icon icon-chevron_left d-inline-block mt-1 me-1" />
						</div>

						<h2 className={`d-flex align-items-center mb-3 mt-3`}>
							{this.props.header}
						</h2>

						<div onClick={this.handleClear} className={'link-primary'}>
							Очистить
						</div>
					</div>
				</header>

				<main>
					<div className={`d-flex flex-column overflow-y-scroll w-100 h-100 pb-3`} ref={this.ref}>

						<form method={"GET"} className="d-block d-flex m-2 mb-3 mt-3 position-static">
							<div className={'input-group w-100 mb-0'}>
								<div className="input-group-text">
									<i className="icon icon-search" />
								</div>
								<input
									min={1}
									type="text"
									name="search"
									autoComplete="off"
									placeholder="Поиск"
									className="form-control shadow"
									value={this.state.search || ''}
									onChange={this.handleChange}
								/>
							</div>
						</form>

						{this.state.loading === true ? ( <Spinner /> ) : (
							this.state.items.length > 0 ? (
								<div className={`container-fluid`}>
									{this.state.items.map((item, index) => (
										<div
											key={index}
											data-id={item.ID}
											onClick={this.handlePick}
											className={`rounded-icon h5 mb-4 d-flex justify-content-between ${this.state.picked.includes(item.ID) ? 'active' : ''}`}
										>
											<span className={`z-index--10 position-relative`}>{item.NAME}</span>
											<i className={`icon icon-done fw-bold primary text-white ${this.state.picked.includes(item.ID) ? '' : `d-none`}`} />
										</div>
									))}
								</div>
							) : (
								<div className={"alert alert-info alert alert-info"}>Ничего не найдено</div>
							)
						)}

					</div>
				</main>
			</>
		);
	}
}
