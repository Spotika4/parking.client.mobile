import React from 'react';

import { Header } from "../../components/UI";


export class About extends React.Component {


    render(){

        return (
	        <>
		        <Header
			        title={`О приложении`}
			        onBackClick={() => {
				        this.props.history.push('/')
			        }}
		        />

		        <main>
			        <div className="w-100 h-100">
				        <div className="about-wrapper">
					        <div className="w-25 m-auto mt-5 mb-3">
						        <img src={"img/logotype.png"} className="w-100" />
					        </div>

					        <div className="slogan w-100 text-center">
						        <h4 className={`mb-1 fw-bold`}>{process.env.REACT_APP_NAME}</h4>
						        <div className={`mb-3`}>{process.env.REACT_APP_DESCRIPTION}</div>
					        </div>

					        <div className="version w-100 text-center text-muted">
						        <div>
							        Версия: {process.env.REACT_APP_VERSION} ({process.env.REACT_APP_VERSION_TYPE})
						        </div>
						        <div>
							        Автор: <a href={process.env.REACT_APP_AUTHOR_HREF} target={`_blank`}>{process.env.REACT_APP_AUTHOR}</a>
						        </div>
					        </div>
				        </div>
			        </div>
		        </main>
	        </>
        );
    }
}
