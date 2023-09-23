import React from 'react';

import { Scroller, Spinner } from "../../UI";


export class Base extends React.Component {

	model = {};

	constructor(props){
		super(props);
		this.state = {
			loading: true,
			nav: this.model.nav,
			items: this.model.objects
		};

		this.getItem = this.getItem.bind(this);
		this.handleLoadItems = this.handleLoadItems.bind(this);
	}

	componentDidMount = async () => {
		this.setState((prevState) => ({
			...prevState,
		}));

		this.getItem = this.getItem.bind(this);

		await this.handleLoadItems();
	};

	componentWillUnmount(){
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		this.setState = (state, callback) => {
			return false;
		};
	}

	componentDidUpdate = async (nextProps, nextState, nextContext) => {
		if(this.props?.filter && nextProps?.filter){
			for(let key in nextProps.filter){
				if(!this.props.filter[key] || this.props.filter[key] !== nextProps.filter[key]){
					return await this.handleLoadItems();
				}
			}
		}
	};

	onScroll = async (e) => {
		if(this.state.controller?.abort){
			return false;
		}

		const controller = new AbortController();

		this.setState((prevState) => ({
			...prevState,
			controller: controller
		}), () => this.model.list(this.props.filter, this.state.nav.NEXT_PAGE, controller).then(result => {

			this.setState((prevState) => ({
				...prevState,
				controller: null,
				nav: this.model.nav,
				items: this.state.items.concat(this.model.objects)
			}));

		}));
	};

	handleLoadItems = async () => {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		const controller = new AbortController();

		await this.setState((prevState) => ({
			...prevState,
			items: [],
			loading: true,
			controller: controller
		}), () => this.model.list(this.props.filter, 1, controller).then(result => {
			return this.setState((prevState) => ({
				...prevState,
				loading: false,
				controller: null,
				nav: this.model.nav,
				items: this.state.items.concat(this.model.objects)
			}));
		}));
	};

	getItem(item, index){
		return (
			<div
				{...item}
				key={index}
				onClick={this.props.hasOwnProperty('onClick') ? this.props.onClick : false}
			/>
		)
	}

	render() {
		return (
			this.state.loading === true ? ( <Spinner /> ) : (
				<Scroller
					className={this.props?.className}
					onNext={this.onScroll}
					onSwipe={this.handleLoadItems}
					nav={!!this.state.nav?.NEXT_PAGE}
				>
					{this.state.items.length > 0 ? (
						<>
							{this.state.items.map(this.getItem)}

							{!!this.state.nav?.NEXT_PAGE ? (
								<Spinner />
							) : null }
						</>
					) : (
						<div className={"alert alert-info"}>Ничего не найдено</div>
					)}
				</Scroller>
			)
		);
	}
}
