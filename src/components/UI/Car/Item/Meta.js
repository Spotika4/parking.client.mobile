import React from 'react';

import { Icons, Buttons } from "../Item";


export class Meta extends React.Component {


	render(){

		return (
			<div className={`d-flex flex-row m-3 mb-0`}>
				<div className={`container-fluid shadow rounded p-0 bg-secondary road`}>

					<div className={`car-wrapper`}>
						<div className={`car-sprite car-sprite-${this.props.item?.BODY_ID}-${this.props.item?.COLOR_ID}`} />
					</div>

					<div className="row justify-content-end">
						<div className="col-9">
							<div className="alert alert-info position-relative rounded p-3 ps-8 mb-0 border-0">

								<div className={`rounded-icon position-absolute left-3 top-1 mt-4 `}>
									<i className={`text-center text-light rounded-circle p-2 bg-info icon-${(this.props.item?.NECESSITATE_TOTAL > 0) ? 'build bg-danger' : 'mood'}`} />
								</div>

								<span className='text-muted d-block mb-1'>Статус</span>
								<div className="text-body">
									{(this.props.item?.SALE_STATUS_NAME === null) ? this.props.item?.STATUS_NAME : this.props.item?.SALE_STATUS_NAME}
								</div>

								<Buttons.Favorite
									handleFavorite={this.props.handleFavorite}
									isFavorite={this.props.item?.IS_FAVORITE}
								/>

							</div>
						</div>
					</div>

					<div className="container-fluid h-auto mt-3 p-3">
						<div className="row justify-content-end mb-3">
							<div className="col-9 d-flex align-items-end flex-row justify-content-end">
								<div className="d-flex p-3 ps-4 pe-4 bg-body rounded border border-dark me-4">
									<span className="blocked-hidden">{this.props.item?.CATEGORY}</span>
								</div>
								<div className="d-flex p-3 bg-body rounded border border-dark">
									<span className="blocked-hidden">{this.props.item?.G_NUMBER_FORMAT}</span>
								</div>
							</div>
						</div>

						<div className="row justify-content-end mb-3">
							<div className="col-9 d-flex align-items-end flex-row justify-content-end">
								<div className="d-flex p-3 bg-body rounded border border-dark">
									<span>{this.props.item?.VIN_FORMAT}</span>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-12 d-flex align-items-end flex-row justify-content-between">
								<div className="d-flex">
									<Icons.Special special={this.props.item?.SPECIAL}/>
									<Icons.Exclusive exclusive={this.props.item?.EXCLUSIVE}/>
								</div>
								<div className="d-flex p-3 bg-body rounded border border-dark">
									{this.props.item?.MAP_NAME}
								</div>
							</div>
						</div>

					</div>

				</div>
			</div>
		)
	}
}
