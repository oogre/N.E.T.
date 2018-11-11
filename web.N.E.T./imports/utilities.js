/*----------------------------------------*\
  chatScreen - utilities.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-11 20:32:28
  @Last Modified time: 2018-09-26 13:06:31
\*----------------------------------------*/
const puppeteer = require('puppeteer');

export function cleanThread4Chan(inputString){
	return inputString.replace(/(<([^>]+)>)|(&([^>]+);)|\d{9,10}|https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig, "");
}

export function log(content){
	console.log(new Date(), content);
}

export const get4ChanContent = function(cb){
	let result = {};
	HTTP.call("GET", "https://a.4cdn.org/b/catalog.json", {
		followRedirects : true, 
	}, (err, res) => {
		if(err) return cb(err, null);
		let page = res.data[0];
		for(let thread of page.threads){
			let tCom = cleanThread4Chan(thread.com);
			if(tCom.length > 0 && thread.replies > 0){
				result.source = {
					name : "4chan",
					id : thread.no,
					url : "https://boards.4chan.org/b/thread/"+thread.no
				};
				result.posts = [];
				Meteor.setTimeout(()=>{
					HTTP.call("GET", "https://a.4cdn.org/b/thread/"+thread.no+".json", {
						followRedirects : true, 
					}, (err, res) => {
						if(err) return cb(err, null);
						res.data.posts.map(post => {
							if(post.com){
								let pCom = cleanThread4Chan(post.com);
								if(pCom.length > 0){
									result.posts.push(pCom);
								}
							}
						});
						cb(null, result);
					});
				}, 1000)
				break;
			}
		};
	});
}
export class Chan4{
	constructor(){
		this.browser = null;
		this.page = null;
	}
	async init(){
		this.browser = await puppeteer.launch({
			headless: false,
			devtools : true
		})
		log("puppeteer.launched");
		this.page = await this.browser.newPage()
		log("browser.newPage");
		this.page.exposeFunction("sendEventToProcessHandle", this.onEventToProcessHandle);
		return this;
	}

	async go(url){
		await this.page.goto(url);
		return this;
	}
	async inside(fnc){
		await this.page.evaluate(fnc);
		return this;
	}
	onEventToProcessHandle(event){
		console.log(event);
	}
	onChat(event){
		console.log(event);
	}
}
