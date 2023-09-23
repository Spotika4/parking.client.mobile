import React from 'react';


export class Spinner extends React.Component {


	render() {

		return (
			<i {...{className: 'fa-solid fa-circle-notch fa-spin fs-4', ...this.props}} />
		);
	}
}
