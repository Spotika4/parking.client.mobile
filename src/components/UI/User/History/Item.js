import React from 'react';

import { Event } from "./Event";


export class Item extends React.Component {


	render() {

		return (
			<div className="d-block col position-relative rounded p-3 shadow mb-3">

				<div className="d-flex">
					<h4 className="text-body mb-0">{this.props.CAR.CAR_NAME}</h4>
				</div>

				<div className="text-muted mt-1 small">VIN {this.props.CAR.VIN}</div>

				{this.props.EVENTS.length > 0 ? (
					<>
						{this.props.EVENTS.map((event, i) => (
							<Event key={i} {...event}/>
						))}

						<div className="mt-4 text-center">
							<a href="#" className="text-decoration-none link-primary">Подробнее</a>
						</div>
					</>
				) : null}

			</div>
		);
	}
}
