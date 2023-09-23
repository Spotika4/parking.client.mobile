import React from 'react';

import { Spinner } from "../../../Spinner";


export class Favorite extends React.Component {


	constructor(props){
		super(props);

		this.state = {
			loading: false
		};
	}

	handleClick = async () => {

		return this.setState((prevState) => ({
			...prevState,
			loading: true
		}), () => this.props.handleFavorite().then(() => {
			return this.setState((prevState) => ({
				...prevState,
				loading: false
			}));
		}));
	};

	render(){

		return (
			<div className={'h1 position-absolute right-3 top-1 mt-4'} onClick={this.handleClick}>
				{this.state.loading === true ? ( <Spinner /> ) : (
					<i className={`icon ${this.props.isFavorite === true ? 'icon-local_fire_department text-danger' : 'icon-local_fire_department text-muted'}`} />
				)}
			</div>
		)
	}
}
