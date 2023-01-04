import React, { useContext } from 'react';
import { Route as ReactRoute, Redirect } from 'react-router-dom';

import { Context } from "../Context";


export const Default = ({ component: Component, ...rest }) => {

    const { isAuth } = useContext(Context);

    return (
    	<ReactRoute
		    {...rest}
		    render={ props => (
		        (!isAuth()) ? (
			        <Redirect to={{
				        pathname: '/auth',
				        state: { from: props.location }
			        }} />
		        ) : (
                    (props.path === '/auth') ? (
                        <Redirect to={{
                            pathname: '/',
                            state: { from: props.location }
                        }} />
                    ) : (
                        <Component {...rest} {...props} />
                    )
		        )
	        )
	    } />
    )
};
