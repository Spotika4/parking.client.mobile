import React from 'react';
import { Redirect } from "react-router";

import { Context } from "../../components/App/Context";


export class Default extends React.Component {

	static contextType = Context;


    render(){
        return ( <Redirect to={( '/home/' + this.context.state.user.object.UF_HOME + '/').toLowerCase()} /> );
    }
}
