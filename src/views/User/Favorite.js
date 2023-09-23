import React from 'react';

import { Storage} from "../../components/App";

import { Car, Header } from "../../components/UI";
import { Context } from "../../components/App/Context";


export class Favorite extends React.Component {

	static contextType = Context;


	constructor(props) {
		super(props);
	}

    render(){

        return (
            <>
                <Header
                    title={"Избранное"}
                    onBackClick={() => {
                        this.props.history.push('/')
                    }}
                />

	            <main>
		            <Car.List
			            context={this.context}
			            filter={{
			            	LOGIC: 'SEARCH',
				            ID: (this.context.state.favorite.length === 0) ? -1 : this.context.state.favorite.join(',')
			            }}
		            />
	            </main>
            </>
        );
    }
}
