import React from 'react';

import { Swipe } from "./Swipe";


export class Tabs extends React.Component {


	constructor(props){
		super(props);

		let max = -1;
        this.props.tabs.map((tab, i) => max = max + 1);

		this.state = {
            max: max,
			active: this.props?.active ? this.props.active : 0,
		};

		this.ref = React.createRef();
		this.handleSwipe = this.handleSwipe.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState,
		}));

		Swipe(this.ref.current);
		if(this.props?.noSwipe && this.props?.noSwipe === true){

		}else{

			this.ref.current.addEventListener("swipe-left", this.handleSwipe, true);
			this.ref.current.addEventListener("swipe-right", this.handleSwipe, true);
		}
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		};

		Swipe(this.ref.current, {}, true);
		this.ref.current.removeEventListener("swipe-left", this.handleSwipe);
		this.ref.current.removeEventListener("swipe-right", this.handleSwipe);
	}

	handleSwipe = async (e) => {
		if(e.detail.dir === 'left'){
			if(this.state.active < this.state.max){
                await this.setState((prevState) => ({
                    ...prevState,
                    active: this.state.active + 1
                }));
			}
		}else if(this.state.active > 0){
            await this.setState((prevState) => ({
                ...prevState,
                active: this.state.active - 1
            }));
		}
	};

	handleClick = async (e) => {
		e.persist();
        await this.setState((prevState) => ({
            ...prevState,
            active: Number(e._targetInst.key)
        }));
	};

	render() {

		return (
			<div ref={this.ref} className={`d-flex flex-column container-fluid p-0 vw-100 ${this.props?.className}`}>
				<ul className={"nav nav-tabs border-bottom-0 m-3 mb-0"}>
					{this.props.tabs.map((tab, i) => (
						<li className={`nav-item me-4 border-0 pb-1 ${i === this.state.active ? 'border-bottom border-primary border-3' : ''} cursor-pointer`} key={i}>
                            <h6 className={`border-0 m-0 text-start fw-500 ${i === this.state.active ? 'text-body' : 'text-muted'}`} onClick={this.handleClick} key={i}>
	                            {tab.name}
                            </h6>
						</li>
					))}
				</ul>

				<div className="tab-content wh-100 h-100 d-flex overflow-hidden">
					{this.props.tabs.map((tab, i) => (
						<div key={i} className={`tab-pane d-block w-100 h-100 overflow-hidden fade show ${i === this.state.active ? 'active' : ''}`}>
                            {tab.children}
						</div>
					))}
				</div>
			</div>
		);
	}
}
