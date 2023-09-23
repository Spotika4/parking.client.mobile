import React from 'react';

import { Tabs, Home, Sector, Service, Zone } from "../../components/UI";
import { Storage } from "../../components/App";

import { Context } from "../../components/App/Context";


export class Parking extends React.Component {

    static contextType = Context;


    render(){

        return (
            <Home.Search
	            context={this.context}
            >

                <Tabs tabs={[
	                { name: 'Сектора', children: (
		                <Sector.List filter={{MAP_ID: Number(this.context.state.user.object.UF_LOCATION)}} />
	                ) },
	                { name: 'Сервисы', children: (
		                <Service.List filter={{MAP_ID: Number(this.context.state.user.object.UF_LOCATION)}}  />
	                ) },
	                { name: 'Зоны', children: (
		                <Zone.List filter={{MAP_ID: Number(this.context.state.user.object.UF_LOCATION)}}  />
	                ) }
                ]} />

            </Home.Search>
        );
    }
}
