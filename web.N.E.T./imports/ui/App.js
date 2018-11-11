/*----------------------------------------*\
  chatScreen - App.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-12 17:16:45
  @Last Modified time: 2018-09-17 12:33:21
\*----------------------------------------*/
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import p5 from "p5/lib/p5.min.js";
import Screen from "./Screen.js";
import { Threads } from './../api/thread/thread.js';



// App component - represents the whole app
class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			sentence : [],
		};
	}
	newSentence(screen){
		if(this.props.isReady){
			let sentence = "";
			if(this.props.thread.length > 0){
				//while(!this.props.thread.posts || this.props.thread.posts.length == 0){
				//	this.props.thread.shift();
				//}
				sentence = this.props.thread[0].posts.shift();
			}else{
				console.log("finished");
			}
			sentence = sentence.toUpperCase();
			sentence = screen.initSentenceForThisScreen(sentence);
			sentence = sentence.split("");

			this.setState({
				sentence : sentence
			});
		}
	}

	componentDidMount(){
		let self = this;
		var myp5 = new p5(p => {
			let screenA = new Screen(p, 16);

			p.setup = function() {
				p.createCanvas(2400, 300)
			};

			p.draw = function() {
				p.background(0);
				screenA.render(self.state.sentence);
	    		if(p.frameCount % 7 == 0 ){
					self.state.sentence.shift();
				}
				if(self.state.sentence.length ==0){
					self.newSentence(screenA);
				}
			};
		}, "sketch1");

	}

  render() {
  	
    return (
      <div className="container " id="sketch1">
      </div>
    );
  }
}

export default withTracker(() => {
	let isReady = FlowRouter.subsReady("public.thread");
	let thread = {};
	return {
		isReady : isReady,
		thread : !isReady  ? [] : _.shuffle(Threads.find({}).fetch())
	};
})(App);
