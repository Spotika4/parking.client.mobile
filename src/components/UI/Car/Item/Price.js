import React from 'react';


export class Price extends React.Component {


	render(){

		return (
			<div className={`d-flex flex-fill flex-row alert alert-info justify-content-evenly mb-0`}>
				<div className={`d-flex align-items-center pe-3 text-center`}>
					<i className="fa-solid fa-ruble-sign fs-1" />
				</div>
				<div className={`d-flex flex-column align-items-end`}>
					<span className={`d-block fs-5 blocked-hidden`}>
						{this.props?.price}
					</span>
					<s className={`text-danger fs-5 blocked-hidden`}>
						{this.props?.price}
					</s>
				</div>
			</div>
	)
	}
}
