import React from 'react';

import { Necessitate, Spinner } from "../../../../UI";

import { Button } from "../Buttons/Button";


export class Forms extends React.Component {


	constructor(props){
		super(props);
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		};
	}

	handleClick = async (item) => {
		this.props.context.dialog({
			header: 'Закрытие потребности',
			footer: false,
			child: () => <Necessitate.Form
				item={item}
				user={this.props.user}
				car_id={this.props.car_id}
				context={this.props.context}
				callback={() => {
					this.props.callback();
					this.componentDidMount()
				}}
				cancel={() => {
					item.loading = false;
				}}
			/>,
		});
	};

	render(){
		return (
			this.props?.necessitates?.length && this.props.necessitates?.length > 0 ? (
				<div className={`mt-3`}>
					<div className={`fs-3 fw-bold`}>Потребности</div>
					<div className={`row overflow-auto`}>
						<div className={`items-overflow overflow-auto pt-2 pb-3`}>
							{this.props.necessitates.map((necessitate, i) =>
								<div key={i} className={`d-block ${this.props.necessitates?.length === 1 ? `w-100` : `vw-75 me-5`}  position-relative rounded shadow mb-3 custom-gradient`}>
									<div className={`d-flex justify-content-between p-3`}>
										<div className={`d-inline-block rounded ps-3 pe-3 pt-1 pb-1 bg-primary h4`}>{necessitate.NAME}</div>
										<div className={`d-inline-block rounded ps-3 pe-3 pt-1 pb-1 h4`}>{necessitate?.DATE_CREATE_FORMAT.toLocaleTimeString("ru-RU")}</div>
									</div>
									<div className={`d-flex justify-content-between ps-3`}>
										<textarea
											className={`form-control bg-transparent border-0 p-0`}
											rows={2} disabled={true}
											defaultValue={`Комментарий: ${necessitate.COMMENT === null ? necessitate.DESCRIPTION : necessitate.COMMENT}`}
										 />
										<div className={`position-relative ${this.props?.hasClosed === true ? `` : `d-none1`}`}>
											<Button
												loading={(necessitate?.loading && necessitate?.loading) === true}
												onClick={() => this.handleClick(necessitate)}
												className={`btn btn-primary necessitate-edit-btn`}
												disabled={false}
											>
												<i className="fa-solid fa-pencil" />
											</Button>
										</div>
									</div>
									<div className={`d-flex justify-content-between mt-6 line-height-5 p-3`}>
										<div className={`d-flex mt-3 line-height-5`}>
											<i className={`fa-solid fa-wrench fs-3 top-1 position-relative me-2`} />
											<span>{necessitate.AUTHOR_LAST_NAME} {necessitate.AUTHOR_NAME[0]}.</span>
										</div>
										<div className={`position-relative ${this.props?.hasClosed === true ? `` : `d-none1`}`}>
											<Button
												loading={(necessitate?.loading && necessitate?.loading) === true}
												onClick={() => this.handleClick(necessitate)}
												className={`btn btn-primary necessitate-end-btn`}
												disabled={false}
											>
												Завершить
											</Button>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			): null
		);
	}
}
