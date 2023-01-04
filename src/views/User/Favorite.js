import React from 'react';

import { Header } from "../../components/UI";


export class Favorite extends React.Component {


    render(){

        return (
            <>
                <Header
                    title={"Избранное"}
                    onBackClick={() => {
                        this.props.history.push('/')
                    }}
                />

                <main />
            </>
        );
    }
}
