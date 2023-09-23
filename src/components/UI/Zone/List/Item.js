import React from 'react';


export class Item extends React.Component {


	render() {

		return (
			<div
				onClick={!this.props?.onClick ? null : () => this.props.onClick(this.props)}
				className={`d-block col position-relative rounded p-3 shadow mb-4 border border-5 border-top-0 border-end-0 border-bottom-0 border-${this.props.CAR_NECESSITATE_STATE}`}
			>
				<div className="d-flex">
					<h5 className="text-body mb-0 name">{this.props.NAME}</h5>
				</div>

				<div className="text-muted mt-1 mb-2 small filled" />

				<div className="d-flex flex-row justify-content-between small fw-bold">
					{this.props.CAR_TOTAL <= 0 ? null : (
						<div>
							<span className="text-muted me-2">Авто</span>
							<span className="text-body">{this.props.CAR_TOTAL}</span>
						</div>
					)}

					{this.props.CAR_NECESSITATE_TOTAL <= 0 ? null : (
						<div className={'count'}>
							<span className="text-muted me-2">Из них с потребностями</span>
							<span className="text-body">{this.props.CAR_NECESSITATE_TOTAL}</span>
						</div>
					)}
				</div>
			</div>
		);
	}
}
