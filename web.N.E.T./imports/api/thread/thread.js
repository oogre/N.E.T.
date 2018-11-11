/*----------------------------------------*\
  chatScreen - 4chan.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-11 19:29:38
  @Last Modified time: 2018-09-26 22:57:33
\*----------------------------------------*/
import { Mongo } from 'meteor/mongo';

import './publications.js';

import * as Utilities from './../../utilities.js';


let chan4 = new Utilities.Chan4();
chan4.init()
.then(self=>self.go("http://local.bcksp.es:8888"))
.then(self=>self.inside(()=>{
	if(null == document.querySelector(".stream2")){
		throw new Error(".stream2 is not found in the dom");
	}
}))
.then(self=>self.inside(()=>{
	window.MyMutationObserver = ({element, config, callback}) => {
		new MutationObserver(callback).observe( element, config);
	}
}))
.then(self=>self.inside(()=>{
	window.MyMutationObserver({
		element : document.querySelector(".stream2"),
		config : { 
			childList: true, 
			subtree: true 
		},
		callback : e=>{
			window.sendEventToProcessHandle("HELLO");
		}
	});	
}))
.then(self=>self.inside(() => {
	window.MyMutationObserver({
		element : document.querySelector("#chat_main"),
		config : { 
			childList: true, 
			subtree: true 
		},
		callback : e => {
			e.map(event => {
				for(let i = 0 ; i < event.addedNodes.length ; i ++){
					let node = event.addedNodes[i];
					let data = {
						broadcaster : document.querySelector("header").innerText,
			    		user:{
			    			name : $(node).attr("data-username"),
			    			role : $(node).hasClass("roomModerator") ? "roomModerator" : ($(node).hasClass("broadcaster") ? "broadcaster" : ""), 
			    		},
			    		type : $(node).hasClass("generalNotification") ? "action" : "message",
			    		timeStamp : +new Date()
			    	}
			    	if(data.type == "message"){
			    		data.content = $(node).find(".messageLine p:last-child").text();
			    	}
			    	if(data.type == "action"){
			    		data.content = node.innerText;
			    	}
					window.sendEventToProcessHandle(data);
				}
			});
		}
	});	
}))
.then(self=>self.inside(() => {
	window.MyMutationObserver({
		element :  document.querySelector("#firebaseReconnect"),
		config : { 
			attributeOldValue: true, 
			attributes: true 
		},
		callback : e => {
			e.map(event=>{
				if(event.type =="attributes" && event.attributeName == "style"){
					if(event.oldValue == "display: block;"){
						// broadcaster is back
					}
					if(event.oldValue == "display: none;" || event.oldValue ==  null){
						// broadcaster has left
					}
				}
			});
		}
	});	
}))
.then(self=>self.inside(() => {
	window.MyMutationObserver({
		element :  document.querySelector("#firebasePrivateShow"),
		config : { 
			attributeOldValue: true, 
			attributes: true 
		},
		callback : e => {
			e.map(event=>{
				if(event.type =="attributes" && event.attributeName == "style"){
					if(event.oldValue == "display: block;"){
						// broadcaster is back from privateShow
					}
					if(event.oldValue == "display: none;" || event.oldValue ==  null){
						// broadcaster is in a private show
					}
				}
			});
		}
	});	
}))
.then(self=>self.inside(() => {
	window.MyMutationObserver({
		element :  document.querySelector("#iosWrap"),
		config : { 
			childList: true
		},
		callback : e => {
			e.map(event=>{
				for(let i = 0 ; i < event.removedNodes.length ; i ++){
					let node = event.removedNodes[i];
					if(node.id == "containerFirebase"){
						// broadcast is over
					}
				}
			});
		}
	});	
}))
.catch(e=>{
	console.warn(e.message);
});



export const Threads = new Mongo.Collection('threads');

if(false && Meteor.isServer){
	Meteor.setInterval(() => {
		Utilities.get4ChanContent((err, res)=>{
			if(err)return console.log(err);
			if(!Threads.findOne({'source.name' : res.source.name, 'source.id' : res.source.id})){
				Threads.insert({
					source : {
						id : res.source.id,
						name : res.source.name,
						url : res.source.url
					}, 
					posts : res.posts,
					createdAt: new Date(),
				});
			}
		});
	}, 5000);
}
