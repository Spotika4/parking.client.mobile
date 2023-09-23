import React from 'react';

import { Search, Scroller, Car } from "../../../UI";
import { Object } from "../../../App";


export class Filter extends React.Component {


	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			display: {
				MIN_PRICE: '',
				MAX_PRICE: '',
				MIN_YEAR: '',
				MAX_YEAR: '',
				BRAND: '',
				MODEL: '',
				BODY: '',
				TRANSMISSION: ''
			},
			filter: {
				MIN_PRICE: null,
				MAX_PRICE: null,
				MIN_YEAR: null,
				MAX_YEAR: null,
				BRAND: [],
				MODEL: [],
				BODY: [],
				TRANSMISSION: []
			},
		};
	}

	componentDidMount = async () => {
		await this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	render() {

		return (
			<>
				{this.state.loading === false ? (
					<Scroller>
						<div className="filter">

							<div className="item">
								<Search.Life.Input
									onlyOne={true}
									title={"Марка"}
									placeholder={"Марка"}
									context={this.props.context}
									value={this.state.display.BRAND || ''}

									disabled={false}
									readOnly={false}

									picked={this.state.filter.BRAND}
									onPick={async (picked) => {
										await this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												BRAND: picked.data,
												MODEL: []
											},
											display: {
												...prevState.display,
												BRAND: picked.display,
												MODEL: '',
											}
										}));
									}}

									model={(new Object.Brand())}
									params={{
										LOGIC: 'SEARCH',
										BODY_ID: this.state.filter.BODY,
										TRANSMISSION_ID: this.state.filter.TRANSMISSION,
									}}

									onClear={async () => {
										await this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												BRAND: [],
												MODEL: []
											},
											display: {
												...prevState.display,
												BRAND: '',
												MODEL: ''
											}
										}));
									}}
								/>
								<i className="icon icon-chevron_right" />
							</div>
							<div className="item">
								<Search.Life.Input
									onlyOne={false}
									title={"Марка"}
									value={this.state.display.MODEL || ''}
									context={this.props.context}
									placeholder={(this.state.filter.BRAND?.length <= 0) ? 'Выберите марку' : 'Модель'}

									disabled={(this.state.filter.BRAND?.length > 0) ? 0 : 1}
									readOnly={(this.state.filter.BRAND?.length > 0) ? 0 : 1}

									picked={this.state.filter.MODEL}
									onPick={async (picked) => {
										await this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												MODEL: picked.data
											},
											display: {
												...prevState.display,
												MODEL: picked.display
											}
										}))
									}}

									model={(new Object.Model())}
									params={{
										LOGIC: 'SEARCH',
										BRAND_ID: (this.state.filter.BRAND.length > 0) ? this.state.filter.BRAND[0] : [],
										TRANSMISSION_ID: this.state.filter.TRANSMISSION,
										BODY_ID: this.state.filter.BODY
									}}

									onClear={() => {
										return this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												MODEL: []
											},
											display: {
												...prevState.display,
												MODEL: ''
											}
										}));
									}}
								/>
								<i className="icon icon-chevron_right" />
							</div>

							<div className="item">
								<input
									type="number"
									name="MIN_YEAR"
									value={this.state.filter.MIN_YEAR || ''}
									placeholder="Год выпуска, от"
									onChange={(e) => {
										e.persist();
										this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												MIN_YEAR: e.target.value
											}
										}))
									}}
									className={'form-control'}
								/>
							</div>
							<div className="item">
								<input
									value={this.state.filter.MAX_YEAR || ''}
									type="number"
									name="MAX_YEAR"
									placeholder="Год выпуска, до"
									onChange={(e) => {
										e.persist();
										this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												MAX_YEAR: e.target.value
											}
										}))
									}}
									className={'form-control'}
								/>
							</div>

							<div className="item">
								<input
									value={this.state.filter.MIN_PRICE || ''}
									type="number"
									name="MIN_PRICE"
									placeholder="Цена, от"
									onChange={(e) => {
										e.persist();
										this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												MIN_PRICE: e.target.value
											}
										}))
									}}
									className={'form-control'}
								/>
							</div>
							<div className="item">
								<input
									value={this.state.filter.MAX_PRICE || ''}
									type="number"
									name="MAX_PRICE"
									placeholder="Цена, до"
									onChange={(e) => {
										e.persist();
										this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												MAX_PRICE: e.target.value
											}
										}))
									}}
									className={'form-control'}
								/>
							</div>

							<div className="item">
								<Search.Life.Input
									onlyOne={false}
									title={"Тип кузова"}
									placeholder={"Тип кузова"}
									context={this.props.context}
									value={this.state.display.BODY || ''}

									disabled={false}
									readOnly={false}

									picked={this.state.filter.BODY}
									onPick={async (picked) => {
										await this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												BODY: picked.data
											},
											display: {
												...prevState.display,
												BODY: picked.display
											}
										}));
									}}

									model={(new Object.Body())}
									params={{
										LOGIC: 'SEARCH',
										BRAND_ID: this.state.filter.BRAND,
										MODEL_ID: this.state.filter.MODEL,
										TRANSMISSION_ID: this.state.filter.TRANSMISSION,
									}}

									onClear={async () => {
										await this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												BODY: []
											},
											display: {
												...prevState.display,
												BODY: ''
											}
										}));
									}}
								/>
								<i className="icon icon-chevron_right" />
							</div>
							<div className="item">
								<Search.Life.Input
									onlyOne={false}
									title={"Коробка передач"}
									placeholder={"Коробка передач"}
									context={this.props.context}
									value={this.state.display.TRANSMISSION || ''}

									disabled={false}
									readOnly={false}

									picked={this.state.filter.TRANSMISSION}
									onPick={async (picked) => {
										await this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												TRANSMISSION: picked.data
											},
											display: {
												...prevState.display,
												TRANSMISSION: picked.display
											}
										}));
									}}

									model={(new Object.Transmission())}
									params={{
										LOGIC: 'SEARCH',
										BRAND_ID: this.state.filter.BRAND,
										MODEL_ID: this.state.filter.MODEL,
										BODY_ID: this.state.filter.BODY,
									}}

									onClear={async () => {
										await this.setState((prevState) => ({
											...prevState,
											filter: {
												...prevState.filter,
												TRANSMISSION: []
											},
											display: {
												...prevState.display,
												TRANSMISSION: ''
											}
										}));
									}}
								/>
								<i className="icon icon-chevron_right" />
							</div>

							<div className={`d-block input-group position-absolute left-0 bottom-14 ps-3 pe-3`}>
								<button className={'btn btn-primary w-100'} onClick={() => this.setState((prevState) => ({ ...prevState, loading: true }))}>
									Искать
								</button>
							</div>
						</div>
					</Scroller>
				) : (
					<div className={`overflow-hidden h-100 pb-5`}>
						<Car.List
							context={this.props.context}
							filter={{
								LOGIC: 'SEARCH',
								BRAND_ID: this.state.filter.BRAND,
								MODEL_ID: this.state.filter.MODEL.join(','),
								BODY_ID: this.state.filter.BODY.join(','),
								TRANSMISSION_ID: this.state.filter.TRANSMISSION.join(','),
								MIN_PRICE: this.state.filter.MIN_PRICE,
								MAX_PRICE: this.state.filter.MAX_PRICE,
								MIN_YEAR: this.state.filter.MIN_YEAR,
								MAX_YEAR: this.state.filter.MAX_YEAR
							}}
						/>

						<div className={`d-block input-group position-absolute left-0 bottom-14 ps-3 pe-3`}>
							<button className={'btn btn-primary d-block w-100'} onClick={() => this.setState((prevState) => ({ ...prevState, loading: false }))}>
								Изменить параметры поиска
							</button>
						</div>
					</div>
				)}
			</>
		);
	}
}
