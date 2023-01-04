import React, { useContext } from 'react';
import { Route as ReactRoute, Redirect } from 'react-router-dom';

import { Context } from "../Context";


export const Auth = ({ component: Component, ...rest }) => {

    const { isAuth } = useContext(Context);

    return (
    	<ReactRoute
		    {...rest}
		    render={ props => (
		        (isAuth()) ? (
			        <Redirect to={{
				        pathname: '/',
				        state: { from: props.location }
			        }} />
		        ) : (
                    <Component {...rest} {...props} />
		        )
	        )
	    } />
    )
};
