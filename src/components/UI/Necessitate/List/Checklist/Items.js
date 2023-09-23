import React from 'react';

import { Spinner } from "../../../../UI";
import { Object } from "../../../../App";


export class Items extends React.Component {


	constructor(props){
		super(props);

		this.state = {
			loading: false,
			car_id: props.car_id,
			necessitates: [],
		};
	}

	componentDidMount = async () => {

		if(this.state.necessitates.length === 0){
			await this.setState((prevState) => ({
				...prevState,
				loading: true,
			}));
		}

		await this.collection().then(collection => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				necessitates: collection,
			}))
		});
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		};
	}

	collection = () => {

		const options = {
			collection: true,
			order: this.props.order,
			rows: this.props.rows,
			onlyActive: this.props.onlyActive
		};

		return (new Object.Car()).necessitatesList(this.state.car_id, options);
	};

	handleClick = async (item) => {

	};

	render(){
		return (
			this.state.loading === true ? ( <Spinner /> ) : (
				<div className={`p-0 mt-3`}>
					<div className={`row`}>
						{this.state.necessitates.map((necessitate, n) =>
							<div className={`col-12`} key={n}>
								{necessitate.NECESSITATE_NAME}
							</div>
						)}
					</div>
				</div>
			)
		);
	}
}
