/*----------------------------------------*\
  chatScreen - publications.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-12 21:32:20
  @Last Modified time: 2018-09-12 21:34:05
\*----------------------------------------*/
import { Meteor } from 'meteor/meteor';
import { Threads } from './thread.js';

if(Meteor.isServer){
	Meteor.publish('public.thread', function publicThreadPublication(){
		return Threads.find({});
	});
}