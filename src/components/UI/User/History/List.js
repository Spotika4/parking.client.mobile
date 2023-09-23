import React from 'react';

import { Scroller, Spinner } from "../../../UI";
import { Object } from "../../../App";

import { Item } from "./Item";


export class List extends React.Component {

	model = new Object.Event();


	constructor(props){
		super(props);
		this.state = {
			controller: null,
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

	onScroll = async (e) => {
		if(this.state.controller?.abort){
			return false;
		}

		const controller = new AbortController();

		this.setState((prevState) => ({
			...prevState,
			controller: controller
		}), () => this.model.byUser(this.props.ID, this.state.nav.NEXT_PAGE, controller).then(result => {

			this.setState((prevState) => ({
				...prevState,
				loading: false,
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
		}), () => this.model.byUser(this.props.ID, 1, controller).then(result => {
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

        return (this.state.loading === true ? ( <Spinner /> ) : (
	        <Scroller
		        onNext={this.onScroll}
		        onSwipe={this.handleLoadItems}
		        nav={!!this.state.nav.NEXT_PAGE}
	        >
		        {this.state.items.length > 0 ? (
			        <>

				        {this.state.items.map((item, index) => (
					        <Item key={index} {...item} />
				        ))}

				        {!!this.state.nav.NEXT_PAGE ? (
					        <Spinner />
				        ) : null }

			        </>
		        ) : (
			        <div className={"alert alert-info alert alert-info m-3"}>Ничего не найдено</div>
		        )}
	        </Scroller>
        ));
    }
}
