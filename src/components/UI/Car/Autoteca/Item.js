import React from 'react';

import {Scroller, Spinner} from "../../../UI";
import { Object } from "../../../App";

import { Block } from "./Block";


export class Item extends React.Component {

	model = new Object.Autoteca();


	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			id: props.id,
			report: (props?.report) ? props?.report : false
		};
	}

	componentDidMount = async () => {

		this.model.getByAvito(this.state.id).then(success => {

			this.setState((prevState) => ({
				...prevState,
				loading: false,
				report: (success === true) ? this.model.object : null
			}));
		});
	};

	render() {

		return (
			<Scroller className={`pb-9`}>
				{this.state.loading === true ? ( <Spinner /> ) : (
					this.state.report === null ? (
						<div className={`alert alert-info`}>Ничего не найдено</div>
					) : (
						<>
							<div className={`card item position-relative rounded shadow mb-3 cursor-pointer`}>

								<div className="card-header bg-body border-0 rounded-top">
									<div className="fs-5 fw-bold pt-2">
										{this.props.name}
									</div>
								</div>

								<div className={`collapse show`}>
									<div className="card-body pt-0 pb-3">
										<div className="d-flex align-items-center">
											<div className="w-50 text-center">
												<a href={`https://${this.state.report.pdfLink}`} className="fs-1 ps-1 fw-bold text-decoration-none text-dark w-100" target={'_blank'}>
													<i className="fa-solid fa-file-pdf" />
													<span className={`d-block fs-6`}>Скачать в формате PDF</span>
												</a>
											</div>
											<div className="w-50 text-center">
												<a href={`${this.state.report.webLink}`} className="fs-1 ps-1 fw-bold text-decoration-none text-dark w-100" target={'_blank'}>
													<i className="fa-solid fa-link" />
													<span className={`d-block fs-6`}>Открыть в источнике</span>
												</a>
											</div>
										</div>
									</div>
								</div>

							</div>

							<Block
								status={this.state.report.data.events?.pledge.type}
								name={this.state.report.data.events?.pledge.description}
								description={this.state.report.data.restrictions?.pledge.text}
							/>

							<Block
								status={this.state.report.data.restrictions?.registration.status}
								name={this.state.report.data.restrictions?.registration.text}
								description={this.state.report.data.restrictions?.registration.text}
							/>

							<Block
								status={this.state.report.data.restrictions?.stealing.status}
								name={this.state.report.data.restrictions?.stealing.text}
								description={this.state.report.data.restrictions?.stealing.text}
							/>

							<Block
								status={this.state.report.data.events.type}
								name={`${this.state.report.data.events.owners.description}`}
								description={`Описание в разработке`}
							/>

							<Block
								status={this.state.report.data.events.crashes.value === true ? 'danger' : 'ok'}
								name={`${this.state.report.data.events.crashes.description}`}
								description={`Описание в разработке`}
							/>

							<Block
								status={this.state.report.data.events.bodyRepair.value === true ? 'danger' : 'ok'}
								name={`Расчет стоимости ремонта`}
								description={this.state.report.data.events.bodyRepair.description === '' ? 'Не найдены расчёты стоимости ремонта' : this.state.report.data.events.bodyRepair.description}
							/>

							<Block
								status={this.state.report.data.insurancePayments === null ? 'ok' : 'danger'}
								name={`Страховые выплаты`}
								description={this.state.report.data.insurancePayments === null ? 'Не найдены сведения о страховых выплатах' : 'Были найдены сведения о страховых выплатах'}
							/>

						</>
					)
				)}
			</Scroller>
		)
	}
}
