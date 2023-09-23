import React from 'react';


export class Widget extends React.Component {


	render(){
		return (
			<div className={`widget screen vw-100 shadow ${this.props.show ? 'active' : this.props.show}`}>

				<div className={this.props.show ? `modal-backdrop fade show active` : `widget vw-100 fade`} onClick={() => this.props.handleWidget(false)} />

				<main className="p-0 bg-light z-index-10 rounded">
					{ this.props.child && this.props.child() }
				</main>

			</div>
		);
	}
}
