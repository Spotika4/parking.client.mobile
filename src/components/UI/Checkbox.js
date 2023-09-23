import React from 'react';


export class Checkbox extends React.Component {


	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick = async (e) => {
		e.persist();
		this.props.onClick(this.props.id);
	};

	render() {
		return (
			<div className={`card shadow mb-3 d-flex flex-row justify-content-between align-items-center border-0`} onClick={this.handleClick}>
				<h5 className="p-3 fw-normal mb-0">
					<span className="fw-bold">
						{this.props.header}
					</span>
					{!this.props.description ? null : (
						<div className="text-muted mt-2 font-weight-normal small">
							{this.props.description}
						</div>
					)}
				</h5>
				<div className="form-check form-switch me-3">
					<input type="checkbox" className="form-check-input" checked={this.props.active} onChange={this.handleClick} />
				</div>
			</div>
		);
	}
}
