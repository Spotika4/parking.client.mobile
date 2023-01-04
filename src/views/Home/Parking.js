import React from 'react';

import { Header } from "../../components/UI";

import { Context } from "../../components/App/Context";


export class Parking extends React.Component {

    static contextType = Context;


    render(){

        return (
            <>
                <Header
                    title={this.context.state.user.NAME}
                    onClick={() => this.props.history.push('/user/profile.html')}
                />

                <main />
            </>
        );
    }
}
