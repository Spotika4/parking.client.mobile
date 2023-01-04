import React from 'react';

import { Context } from "../../components/App/Context";
import { Header } from "../../components/UI/Header";


export class NotFound extends React.Component {

    static contextType = Context;

    render(){

        return (
            <>
                <Header
                    title={`Страница не найдена`}
                />

                <main>
                    <div className={`scroller`}>
                        <div className={`container-fluid mt-3`}>
                            <div className={`alert alert-info`}>
                                Указанная страница не найдена или была удалена
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}
