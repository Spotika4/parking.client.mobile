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
			<div className="card item position-relative border-0 rounded shadow mb-3">
				<div className="card-header bg-body border-0 rounded-top" onClick={this.handleClick}>
					<div className="fs-5 fw-bold pt-2">
						{this.props.name}
					</div>
				</div>

				<div className={this.state.open === true ? `collapse show` : `collapse`}>
					<div className="card-body pt-4 pb-1">
						{this.props.item?.map((answers, i) =>
							<div key={i} className={'d-flex flex-row justify-content-evenly alert alert-info mb-3'}>
								<div className={"fw-bold pe-2 text-start w-50"}>{answers.name}</div>
								<div className={"text-start ps-2 w-50"}>{answers['answerValueList'].join(', ')}</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
