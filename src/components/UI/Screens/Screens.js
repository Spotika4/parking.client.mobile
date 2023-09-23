import React from 'react';


export class Screens extends React.Component {


	constructor(props){
		super(props);

		let max = -1;
		this.props.screens.map((tab, i) => max = max + 1);

		this.state = {
			max: max,
			active: this.props?.active ? this.props.active : 0,
		};
	}

	render() {

		return (
			this.props.screens.map((screen, i) => (
				<div key={i} className={`screen vw-100 ${i === this.state.active ? 'active' : ''}`}>
					{screen.children}
				</div>
			))
		);
	}
}
