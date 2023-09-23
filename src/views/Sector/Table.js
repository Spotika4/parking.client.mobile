import React from 'react';

import { Header, Place } from "../../components/UI";
import * as Object from "../../components/App/Object";
import { Context } from "../../components/App/Context";


export class Table extends React.Component {

	static contextType = Context;


	constructor(props){
		super(props);
		this.state = {
			visibility: false
		};

		this.handleVisibilityHeader = this.handleVisibilityHeader.bind(this);
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

	handleVisibilityHeader = async (e) => {
		e.persist();
		this.setState((prevState) => ({
			...prevState,
			visibility: !this.state.visibility
		}));
	};

	handleSearch = async (e) => {
		e.persist();

		this.context.dialog({
			header: 'Закрытие потребности',
			footer: false,
			child: () => <Place.Search context={this.context} />
		});
	};

    render() {

	    let SECTOR = new Object.Sector({});
	    SECTOR.import(this.props.match.params.id).then(r => r);

        return (
            <>
	            <Header
		            title={SECTOR.object.NAME}
		            onBackClick={() => this.props.history.push(`/`)}
		            right={
			            <div>
				            <i className={(this.state.visibility === false) ? "icon icon-visibility_off d-inline-block mr-3 mt-3 fs-1" : "icon icon-visibility d-inline-block mr-3 mt-3 fs-1"} onClick={this.handleVisibilityHeader} />
				            <i className="icon icon-search d-inline-block ms-3 mt-3 fs-1" onClick={this.handleSearch} />
			            </div>
		            }
	            />

	            <main>
                    <Place.Table
	                    onClick={null}
	                    context={this.context}
	                    place_id={this.props.match.params?.place}
						sector_id={this.props.match.params.id}
	                    visibility={this.state.visibility}
                    />
                </main>
            </>
        );
    }
}
