import React from 'react';


export class Item extends React.Component {


	constructor(props){
		super(props);

	}

	render() {

		return (
			<div className="d-flex flex-column mb-3 w-100">

				<div className="d-flex">
                    <span className="text-center me-2">
                        <i className={`icon icon-${this.props.item.LOCATION.icon} me-1`} />
                    </span>

					<div className="d-block">
						<span className="d-inline-block me-2">
                            <i className="icon icon-event_note me-1" /> {this.props.item.DATE_CREATE_FORMAT.toLocaleDateString("ru-RU")}
                        </span>
						<span className="d-inline-block">
                            <i className="icon icon-access_time me-1" /> {this.props.item.DATE_CREATE_FORMAT.toLocaleTimeString("ru-RU")}
                        </span>
					</div>
				</div>

				<div className="d-block text-muted pt-2 pb-2">
					{this.props.item.DESCRIPTION}
				</div>
			</div>
		);
	}
}
