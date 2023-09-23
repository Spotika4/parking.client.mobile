import React from 'react';


export class Right extends React.Component {


	render(){
		return (
			<div className={`screen vw-100 shadow ${this.props.show ? 'active' : this.props.show}`} >
				{ this.props.child && this.props.child() }
			</div>
		);
	}
}
