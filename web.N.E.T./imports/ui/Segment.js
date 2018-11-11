/*----------------------------------------*\
  chatScreen - Segment.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-12 18:23:57
  @Last Modified time: 2018-09-12 20:44:20
\*----------------------------------------*/
export default class Segment{
	constructor(p, render){
		this.p = p;
		this.renderFnc = render;
	}
	render(flag){
		this.p.push();
		{
			if(!flag)this.p.fill(30);
			else this.p.fill(255);
			this.renderFnc();
		}
		this.p.pop();
	}
}