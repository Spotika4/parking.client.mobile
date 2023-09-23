import React from 'react';


export class Block extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			open: true
		};
	}

	componentDidMount(){
		this.setState((prevState) => ({
			...prevState,
		}));
	}

	handleClick = async () => {
		await this.setState((prevState) => ({
			...prevState,
			open: !this.state.open
		}))
	};

	render() {
		return (
			<div className={`card item position-relative rounded shadow mb-3 border border-5 border-top-0 border-end-0 border-bottom-0 border-${this.props.status === 'ok' ? 'success' : 'danger'} cursor-pointer`}>

				<div className="card-header bg-body border-0 rounded-top" onClick={this.handleClick}>
					<div className="fs-5 fw-bold pt-2">
						{this.props.name}
					</div>
				</div>

				<div className={this.state.open === true ? `collapse show` : `collapse`}>
					<div className="card-body pt-2 pb-3">
						{this.props.description && (typeof this.props.description === "function") ? this.props.description() : this.props.description}
					</div>
				</div>

			</div>
		);
	}
}
