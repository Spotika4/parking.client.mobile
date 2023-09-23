import React from 'react';

import { Scroller, Spinner } from "../../../UI";
import { Object } from "../../../App";

import { Item } from "./Item";


export class List extends React.Component {

	model = new Object.User();

	constructor(props){
		super(props);
		this.state = {
			loading: true,
			nav: this.model.nav,
			items: this.model.objects
		};
		this.handleLoadItems = this.handleLoadItems.bind(this);
	}

	componentDidMount = async () => {
		this.setState((prevState) => ({
			...prevState,
		}));
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

	render() {
		return (
			this.state.loading === true ? ( <Spinner /> ) : (
				<Scroller
					onNext={this.onScroll}
					nav={!!this.state.nav.NEXT_PAGE}
					onSwipe={this.handleLoadItems}
				>
					{this.state.items.length > 0 ? (
						<>
							{this.state.items.map((item, index) => (
								<Item
									key={index}
									item={item}
									context={this.props.context}
								/>
							))}

							{!!this.state.nav.NEXT_PAGE ? (
								<Spinner />
							) : null }
						</>
					) : (
						<>
							<div className={"alert alert-info"}>Ничего не найдено</div>
						</>
					)}
				</Scroller>
			)
		);
	}
}
