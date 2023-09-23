import React from 'react';


export class Special extends React.Component {


	constructor(props){
		super(props);
	}

	render(){

		return (
			this.props.special === true ? (
				<i className={`fs-1 text-center fa fa-regular fa-gem text-primary me-3`} />
			) : null
		)
	}
}
