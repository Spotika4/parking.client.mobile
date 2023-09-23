import React from 'react';


export class Characteristic extends React.Component {


	render(){

		return (
			<div className={`flex flex-column`}>
				<h3 className={`mt-4 fw-bold`}>Дополнительно</h3>
				<div className={`row`}>
					<div className={`col`}>
						<div className={`alert alert-info`}>
							<div className={`text-muted mb-2`}>Общая информация</div>
							<div className={`text-body`}>
								<div className={`mb-2`}>
									<i className={'icon icon-add_road me-3 rounded-circle p-2 bg-primary small'} />
									{this.props?.MILEAGE_FORMAT === null ? null : (
										<>
											<span>{this.props.MILEAGE_FORMAT}</span>
											<span className={`text-muted`}> км</span>
										</>
									)}
								</div>
								<div className={`mt-3 mb-2`}>
									<i className={'fa-solid fa-gears me-3 rounded-circle p-2 bg-primary small'} />
									<>
										{this.props?.ENGINE_VOLUME === null ? null : (
											<>
												<span>{this.props.ENGINE_VOLUME}</span>
												<span className={`text-muted`}> л / </span>
											</>
										)}
										{this.props?.ENGINE_VOLUME === null ? null : (
											<>
												<span>{this.props.ENGINE_HORSE}</span>
												<span className={`text-muted`}> л.с</span>
											</>
										)}
									</>
								</div>
								<div className={`mt-3 mb-2`}>
									<i className={'fa-solid fa-gas-pump me-3 rounded-circle p-2 bg-primary small'} />
									{(this.props?.ENGINE_TYPE_NAME !== null) ? `${this.props?.ENGINE_TYPE_NAME}` : ' - '}
								</div>
								<div className={`mt-3 mb-2`}>
									<i className={'fa-solid fa-gauge me-3 rounded-circle p-2 bg-primary small'} />
									{(this.props?.TRANSMISSION_NAME !== null) ? this.props?.TRANSMISSION_NAME : ' - '}
								</div>
								<div className={`mt-3 mb-2`}>
									<i className={'icon icon-event_note me-3 rounded-circle p-2 bg-primary small'} />
									{this.props?.YEAR === null ? null : (
										<>
											<span>{this.props.YEAR}</span>
											<span className={`text-muted`}> год</span>
										</>
									)}
								</div>
							</div>
						</div>
					</div>
					<div className={`col`}>
						<div className={`alert alert-info text-body`}>
							<div className={`text-muted mb-2`}>Дополнительно</div>
							<div className={`mb-2`}>
								<i className={'fa-solid fa-car-side me-3 rounded-circle p-2 bg-primary small'} />
								{this.props?.BODY_NAME === null ? null : (
									<span>{this.props.BODY_NAME}</span>
								)}
							</div>
							<div className={`mt-3 mb-2`}>
								<i className={'fa-solid fa-palette me-3 rounded-circle p-2 bg-primary small'} />
								{this.props?.COLOR_NAME === null ? null : (
									<span>{this.props.COLOR_NAME}</span>
								)}
							</div>
							<div className={`mt-3 mb-2`}>
								<i className={`icon icon-group me-3 rounded-circle p-2 bg-primary small`} />
								{this.props?.OWNERS === null ? null : (
									<>
										<span>{this.props.OWNERS}</span>
										<span className={`text-muted`}> {this.props.OWNERS === 1 ? 'владелец' : (this.props.OWNERS > 4 ? `владельцев` : `владельца`)}</span>
									</>
								)}
							</div>
							<div className={`mt-3 mb-2`}>
								<i className={`fa-solid fa-key me-3 rounded-circle p-2 bg-primary small`} />
								{this.props?.OWNERS === null ? null : (
									<>
										<span>{this.props.OWNERS}</span>
										<span className={`text-muted`}> {this.props.OWNERS === 1 ? 'ключ' : (this.props.OWNERS > 4 ? `ключей` : `ключа`)}</span>
									</>
								)}
							</div>
							<div className={`mt-3 mb-2`}>
								<i className={'icon icon-assignment me-3 rounded-circle p-2 bg-primary small'} />
								{this.props?.PASSPORT_NAME === null ? null : (
									<>
										<span>{this.props.PASSPORT_NAME}</span>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
