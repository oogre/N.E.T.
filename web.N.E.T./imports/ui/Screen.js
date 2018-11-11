/*----------------------------------------*\
  chatScreen - Screen.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-12 21:03:45
  @Last Modified time: 2018-09-17 12:34:02
\*----------------------------------------*/

import Character from "./Character.js";

export default class Screen{
	constructor(p, characterLen){
		this.p = p;
		this.chars = [];
		for(let i = 0 ; i < characterLen ; i ++){
			this.chars.push(new Character(i, p));
		}
	}
	initSentenceForThisScreen(sentence){
		for(let i = 0 ; i < this.chars.length * 1.5 ; i ++){
			sentence=" "+sentence;
		}	
		return sentence;
	}
	render(sentence){
		console.log();
		this.p.push();
		{
			this.p.rectMode(this.p.CENTER);
			this.p.translate(this.p.width>>1, this.p.height>>1);
			this.p.translate((this.chars.length>>1) * -200, 0);
			this.p.scale(0.3);
			this.chars.map((char, key)=>{
				this.p.translate(500, 0);
				char.render(sentence[key]);
			});
		}
		this.p.pop();
	}
}