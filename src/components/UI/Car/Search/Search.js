import React from 'react';

import { Header, Car } from "../../../UI";


export class Search extends React.Component {


	constructor(props) {
		super(props);

		this.state = {
			query: '',
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount = async () => {
		await this.setState((prevState) => ({
			...prevState,
		}));

		this.handleChange = this.handleChange.bind(this);
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		};
	}

	handleChange = async (e) => {
		e.persist();
		await this.setState((prevState) => ({
			...prevState,
			query: e.target.value,
		}));
	};

    render() {

	    return (
		    <>
			    <Header {...{...this.props.header}} className={'with-search'}>
				    <form method={"GET"} id="SEARCH-FORM" className="search-form d-block d-flex mt-2">
					    <div className={'form-group w-100 mb-0'}>
						    <div className="group-inner-left-icon">
							    <i className="icon icon-search" />
						    </div>
						    <input
							    min={1}
							    type="text"
							    autoComplete="off"
							    className="form-control shadow"
							    placeholder="Поиск автомобиля"
							    value={this.state.query}
							    onChange={this.handleChange}
						    />
					    </div>
				    </form>
			    </Header>

			    <main className={this.state.query === '' ? '' : 'd-none'}>
				    {this.props.children}
			    </main>

			    <main className={this.state.query !== '' ? '' : 'd-none'}>
				    {this.state.query === '' ? (null) : (
					    <Car.List
						    context={this.props.context}
						    filter={{
							    REF_KEY: this.state.query,
							    VIN: this.state.query,
							    VIN2: this.state.query,
							    G_NUMBER: this.state.query
						    }}
					    />
				    )}
			    </main>
		    </>
	    );
    }
}
