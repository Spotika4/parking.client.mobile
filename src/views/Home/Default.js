import React from 'react';

import { Context } from "../../components/App/Context";
import { Header } from "../../components/UI/Header";


export class Default extends React.Component {

    static contextType = Context;


    render(){

        return (
            <>
                <Header
                    title={this.context.state.user.NAME}
                    onClick={() => this.props.history.push('/profile.html')}
                />

                <main />
            </>
        );
    }
}
