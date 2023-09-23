import React from 'react';
import { Swipe } from "./Swipe";


export class Scroller extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			scrollTop: 0,
			scrollHeight: 0
		};

		this.ref = React.createRef();
		this.handleSwipe = this.handleSwipe.bind(this);
	}

	componentDidMount = () => {
		this.setState((prevState) => ({
			...prevState,
		}));

		Swipe(this.ref.current);
		this.ref.current.addEventListener("swipe-down", this.handleSwipe, true);
	};

	componentWillUnmount(){
		this.element = false;
		this.setState = (state, callback) => {
			return false;
		};

		Swipe(this.ref.current, {}, true);
		this.ref.current.removeEventListener("swipe-down", this.handleSwipe, true);
	}

	handleScroll = async (e) => {
		e.persist();

		if(e.target.scrollTop !== this.state.scrollTop){

			if(this.state.scrollTop > 50){
				this.props?.onStartScroll && this.props.onStartScroll(e);
			}

			if(this.state.scrollTop < 50){
				this.props?.onEndScroll && this.props.onEndScroll(e);
			}
		}


		await this.setState((prevState) => ({
			...prevState,
			scrollTop: e.target.scrollTop,
		}));

		if(this.props?.nav && this.props.nav === true && e.target.scrollTop > (e.target.scrollHeight / 4)){
			this.props?.onNext && this.props.onNext(e);
		}
	};

	handleSwipe(e){
		if(this.state.scrollTop === 0 || this.state.scrollTop < 0){
			this.props?.onSwipe && this.props.onSwipe();
		}
	}

    render() {

        return (
	        <div ref={this.ref} className={`scroller overflow-y-scroll vw-100 h-100 ${this.props?.className}`} onScroll={this.handleScroll}>
		        <div className="container-fluid pt-3 pb-3">
		            {this.props.children}
	            </div>
	        </div>
        );
    }
}
