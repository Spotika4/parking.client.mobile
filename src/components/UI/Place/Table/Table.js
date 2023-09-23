import React from 'react';

import { Spinner} from "../../../UI";
import { Object } from "../../../App";

import { Cell } from "./Cell";


export class Table extends React.Component {

	SECTOR = {};


	constructor(props){
		super(props);
		this.state = {
			render: null,
			controller: null
		};

		this.SECTOR = new Object.Sector({});

		this.onScroll = this.onScroll.bind(this);
		this.handleTab = this.handleTab.bind(this);
	}

	componentDidMount = async () => {
		if(this.SECTOR.controller?.abort){
			this.SECTOR.controller.abort();
		}

		await this.SECTOR.import(this.props.sector_id, true);
		return this.SECTOR.render().then((result) => {
			return this.setState((prevState) => ({
				...prevState,
				render: result
			}));
		});
	};

	componentWillUnmount() {
		if(this.SECTOR.controller?.abort){
			this.SECTOR.controller.abort();
		}

		this.setState = (state, callback) => {
			return false;
		}
	}

	handleTab = (e) => {
		let tab = e.target.getAttribute(`data-i`);
		let cell = (tab * 10) - 1;
		if(cell < 10) cell = 1;
		document.querySelector(`.screen.active .sector-table .x-${cell}`)?.scrollIntoViewIfNeeded();

		let active = document.querySelector(`.screen.active .nav.nav-tabs .nav-item.active`);
		active?.classList.remove('border-bottom');
		active?.classList.remove('border-primary');
		active?.classList.remove('border-3');
		active?.classList.remove('active');

		e.target.classList.add('border-bottom');
		e.target.classList.add('border-primary');
		e.target.classList.add('border-3');
		e.target.classList.add('active');
	};

	onScroll = (e) => {
		let cell = Math.floor(e.target.scrollLeft / 58);
		let tab = Math.floor(cell / 10) + 1;

		let newTab = false;
		if(document.querySelector(`.screen.active .nav.nav-tabs .nav-item.tab-${tab}`)){
			let oldTab = document.querySelector(`.screen.active .nav.nav-tabs .nav-item.active`);
			oldTab?.classList.remove('active');
			oldTab?.classList.remove('border-3');
			oldTab?.classList.remove('border-bottom');
			oldTab?.classList.remove('border-primary');

			let newTab = document.querySelector(`.screen.active .nav.nav-tabs .nav-item.tab-${tab}`);
			newTab.classList.add('active');
			newTab.classList.add('border-3');
			newTab.classList.add('border-bottom');
			newTab.classList.add('border-primary');
		}
	};

	render() {

		let tabs = [];
		if(this.state.render && this.state.render.length){
			for (let i = 0; i < Math.floor(this.state.render[0].length / 10); i++) {
				tabs.push({
					name: `${this.SECTOR.object.NAME} - ${i + 1}`
				});
			}
		}

		if(this.props?.place_id){

			document.querySelector(`.place-cell.active`)?.classList.remove('active');

			setTimeout(() => {
				document.querySelector(`.inner_id-${this.props.place_id}`).scrollIntoViewIfNeeded();
				document.querySelector(`.inner_id-${this.props.place_id}`).classList.add('active');
			}, 250);
		}

		return (
			this.state.render === null ? (
				<Spinner />
			) : (
				<>

					<ul className="nav nav-tabs flex-nowrap w-100 text-center shadow position-fixed bg-body p-0 border-0 z-index-15">
						{tabs.map((tab, ti) => (
							ti === 0 ? (
								<li className={`nav-item pt-3 pb-3 ps-4 pe-4 border-0 border-bottom border-primary border-3 tab-${ti + 1} active`} data-i={ti + 1} key={ti} onClick={this.handleTab}>
									<h6 className={`border-0 m-0 text-start fw-500 position-relative z-index--15`} data-i={ti + 1}>{tab.name}</h6>
								</li>
							) : (
								<li className={`nav-item pt-3 pb-3 ps-4 pe-4 border-0 tab-${ti + 1}`} data-i={ti + 1} key={ti} onClick={this.handleTab}>
									<h6 className={`border-0 m-0 text-start fw-500 position-relative z-index--15`} data-i={ti + 1}>{tab.name}</h6>
								</li>
							)
						))}
					</ul>

					<div className={this.props.visibility !== true ? "sector-table" : "sector-table visibility_on"} onScroll={this.onScroll}>
						{this.state.render.map((row, ri) => (
							<div className={`sector-row row-${ri + 1}`} data-row={ri + 1} key={ri}>
								{row.map((cell, ci) => (
									<div key={ci} data-cell={(ci % 10 === 0) ? (ci / 10) + 1 : false}>
										<Cell
											item={cell}
											onClick={this.props.onClick}
											context={this.props.context}
										/>
									</div>
								))}
							</div>
						))}
					</div>
				</>
			)
		);
	}
}
