import React from 'react';

import { Tabs, Ticket, Header } from "../../components/UI";
import { Context } from "../../components/App/Context";
import { Storage } from "../../components/App";


export class List extends React.Component {

	static contextType = Context;
	services = Storage.get('SERVICE_MAP');


	constructor(props){
		super(props);

		this.state = {
			tabs: []
		};
	}

	componentDidMount = async () => {

		this.setState((prevState) => ({
			...prevState,
			tabs: (this.context.state.user.object.ROLES?.SELLER) ? this.getAuthorTabs() : this.getServicesTabs()
		}));
	};

	getServicesTabs(){

		let tabs = [];
		for (let key in this.services) {
			tabs.push({
				name: this.services[key].NAME,
				children: (
					<Ticket.List
						filter={{SERVICE_ID: this.services[key].ID}}
						context={this.context}
					/>
				)
			});
		}

		return tabs;
	}

	getAuthorTabs(){

		let tabs = [];
		let filter = [
			{NAME: 'В работе', ACTIVE: 'Y'},
			{NAME: 'Выполненные', ACTIVE: 'N'}
		];
		for (let key in filter) {
			tabs.push({
				name: filter[key].NAME,
				children: (
					<Ticket.List
						filter={{ ACTIVE: filter[key].ACTIVE }}
						context={this.context}
					/>
				)
			});
		}

		return tabs;
	}

	render(){

		return (
			<>
				<Header
					title={'Заявки'}
					onBackClick={() => this.props.history.push(`/`)}
				/>

				<main>

					<Tabs tabs={this.state.tabs} />

				</main>
			</>
		);
	}
}
