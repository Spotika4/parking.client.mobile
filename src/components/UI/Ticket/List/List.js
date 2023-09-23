import React from 'react';

import {Scroller, Spinner, Tabs} from "../../../UI";
import { Object } from "../../../App";

import { Item } from "./Item";


export class List extends React.Component {

	model = new Object.Ticket();

	constructor(props){
		super(props);
		this.state = {
			loading: true,
			nav: this.model.nav,
			items: this.model.objects
		};
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
					onSwipe={this.handleLoadItems}
				>
					{this.state.items.length > 0 ? (
						<>
							{this.state.items.map((item, index) => (
								<div key={index} className={'text-decoration-none'}>
									<Item
										item={item}
										context={this.props.context}
									/>
								</div>
							))}
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
