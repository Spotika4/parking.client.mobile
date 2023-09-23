import React from 'react';


export class Event extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			location: ''
		};
	}

	componentDidMount = () => {
		this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount(){
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		this.setState = (state, callback) => {
			return false;
		};
	}

	render() {

		return (
			<div className="d-flex flex-column mb-3 mt-1 w-100">

				<div className="d-flex justify-content-between align-items-center mt-2 mb-1">
                    <span className="badge rounded-pill text-bg-secondary text-center">
                        {this.props.BADGE}
                    </span>
					<div className="d-block text-muted">
                        <span className="d-inline-block me-2">
                            <i className="icon icon-access_time mr-1" /> {this.props.DATE_CREATE_FORMAT.toLocaleTimeString("ru-RU")}
                        </span>
						<span>
                            <i className="icon icon-event_note mr-1" /> {this.props.DATE_CREATE_FORMAT.toLocaleDateString("ru-RU")}
                        </span>
					</div>
				</div>

				<div className="d-flex justify-content-between align-items-center">
					{!this.props.LOCATION?.icon || !this.props.LOCATION?.title ? null : (
						<div className="strong">
							<i className={`icon icon-${this.props.LOCATION.icon} mr-1`} /> {this.props.LOCATION.title}
						</div>
					)}
				</div>

				<div className="d-block text-muted">
					{this.props.DESCRIPTION}
				</div>
			</div>
		);
	}
}
