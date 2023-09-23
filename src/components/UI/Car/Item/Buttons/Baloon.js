import React from 'react';

import { Spinner } from "../../../Spinner";
import {NavLink} from "react-router-dom";


export class Baloon extends React.Component {


	constructor(props){
		super(props);

		this.state = {
			loading: false,
			url: ``
		};
	}

	componentDidMount = async () => {
		let url = `/`;
		if(this.props.car.SECTOR_ID !== null ) url = `/home/sector/${this.props.car.SECTOR_ID}/${this.props.car.INNER_ID}`;
		if(this.props.car.SERVICE_ID !== null ) url = `/home/service/${this.props.car.SERVICE_ID}`;
		if(this.props.car.ZONE_ID !== null ) url = `/home/zone/${this.props.car.ZONE_ID}`;

		this.setState((prevState) => ({
			...prevState,
			url: url
		}));

	};

	render(){

		return (
			<NavLink activeclassname={'active'} to={this.state.url} className={`flex-fill position-relative btn btn-primary text-center w-100 pt-4 pb-4 loading`} onClick={() => this.props.sider(false)}>
				{this.state.loading === true ? ( <Spinner /> ) : (
					<i className="fa-solid fa-location-dot fs-3" />
				)}
				<span className={`d-block mt-2`}>
					{this.props.title}
				</span>
			</NavLink>
		)
	}
}
