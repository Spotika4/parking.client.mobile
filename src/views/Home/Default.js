import React from 'react';
import { Redirect } from "react-router";

import * as Storage from "../../components/App/Storage";

export class Default extends React.Component {


    render(){
        let pathname =( '/home/' + Storage.get('DEFAULT_HOME', 'parking') + '.html').toLowerCase();
        return (
            <Redirect to={{ pathname }} />
        );
    }
}
