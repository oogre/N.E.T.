import React from 'react';
import { render } from 'react-dom';


import App from '../imports/ui/App.js';


FlowRouter.route( '/', {
	name: 'home',
	action( params ) {
		if(!document.getElementById("render-target")){
			let renderTarget = document.createElement( 'div' );
			renderTarget.setAttribute("id", "render-target");
			document.getElementsByTagName('body')[0].appendChild( renderTarget );
			render(<App />, renderTarget);
		}
	},
	subscriptions: function(params, queryParams) {
		this.register('public.thread', Meteor.subscribe('public.thread'));
	}
});

