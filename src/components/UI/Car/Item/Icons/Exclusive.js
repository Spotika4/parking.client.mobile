import React from 'react';


export class Exclusive extends React.Component {


	constructor(props){
		super(props);
	}

	render(){

		return (
			this.props.exclusive === true ? (
				<i className={`fs-1 text-center fa fa-solid fa-clover text-primary me-3`} />
			) : null
		)
	}
}
