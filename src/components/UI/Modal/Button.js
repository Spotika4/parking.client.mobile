import React from 'react';


export class Button extends React.Component {


    constructor(props){
        super(props);
    }

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState,
		}));
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	render(){
		return (
			<button className={`${this.props.className} loading`} onClick={this.props.onClick} type={`button`}>
				{this.props?.text}
			</button>
		)
	}
}
