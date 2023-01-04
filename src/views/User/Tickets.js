import React from 'react';

import { Header } from "../../components/UI";


export class Tickets extends React.Component {


    render(){

        return (
            <>
                <Header
                    title={"Заявки"}
                    onBackClick={() => {
                        this.props.history.push('/')
                    }}
                />

                <main />
            </>
        );
    }
}
