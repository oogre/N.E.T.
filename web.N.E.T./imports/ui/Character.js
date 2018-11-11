/*----------------------------------------*\
  chatScreen - Character.js
  @author Evrard Vincent (vincent@ogre.be)
  @Date:   2018-09-12 18:25:51
  @Last Modified time: 2018-09-17 12:31:59
\*----------------------------------------*/

import Segment from "./Segment.js";

export default class Character{
	constructor(id, p){
		let w = 400;
		let h = 30;
		let scale = 0.9;
		this.p = p;
		this.id = id;
		
		this.segments = [
			new Segment(p, () => {//0 : topLeft
				this.p.translate(-w>>2, -w);
				this.p.scale(scale);
				this.p.rect(0, 0, w>>1, h);
			}),
			new Segment(p, () => {//1 : topCenter
				this.p.translate(0, -w>>1);
				this.p.scale(scale);
				this.p.rect(0, 0, h, w);
			}),
			new Segment(p, () => {//2 : topRight
				this.p.translate(w>>2, -w);
				this.p.scale(scale);
				this.p.rect(0, 0, w>>1, h);
			}),
			new Segment(p, () => {//3 : dTopRight
				this.p.translate(w>>2, -w>>1);
				this.p.rotate(-0.15 + 2.121320343559643);
				this.p.scale(scale);
				this.p.rect(0, 0, w, h);
			}),
			new Segment(p, () => {//4 : topRight
				this.p.translate(w>>1, -w>>1);
				this.p.scale(scale);
				this.p.rect(0, 0, h, w);
			}),
			new Segment(p, () => {//5 : centerRight
				this.p.translate(w>>2, 0);
				this.p.scale(scale);
				this.p.rect(0, 0, w>>1, h);
			}),
			new Segment(p, () => {//6 : bottomRight
				this.p.translate(w>>1, w>>1);
				this.p.scale(scale);
				this.p.rect(0, 0, h, w);
			}),
			new Segment(p, () => {//7 : dBottomRight
				this.p.translate(w>>2, w>>1);
				this.p.rotate(0.15 - 2.121320343559643);
				this.p.scale(scale);
				this.p.rect(0, 0, w, h);
			}),
			new Segment(p, () => {//8 : bottomRight
				this.p.translate(w>>2, w);
				this.p.scale(scale);
				this.p.rect(0, 0, w>>1, h);
			}),
			new Segment(p, () => {//9 : bottomCenter
				this.p.translate(0, w>>1);
				this.p.scale(scale);
				this.p.rect(0, 0, h, w);
			}),
			new Segment(p, () => {//A : bottomLeft
				this.p.translate(-w>>2, w);
				this.p.scale(scale);
				this.p.rect(0, 0, w>>1, h);
			}),
			new Segment(p, () => {//B : dBottomLeft
				this.p.translate(-w>>2, w>>1);
				this.p.rotate(-0.15 + 2.121320343559643);
				this.p.scale(scale);
				this.p.rect(0, 0, w, h);
			}),
			new Segment(p, () => {//C : bottomLeft
				this.p.translate(-w>>1, w>>1);
				this.p.scale(scale);
				this.p.rect(0, 0, h, w);
			}),
			new Segment(p, () => {//D : centerLeft
				this.p.translate(-w>>2, 0);
				this.p.scale(scale);
				this.p.rect(0, 0, w>>1, h);
			}),
			new Segment(p, () => {//E : topLeft
				this.p.translate(-w>>1, -w>>1);
				this.p.scale(scale);
				this.p.rect(0, 0, h, w);
			}),
			new Segment(p, () => {//F : dTopLeft
				this.p.translate(-w>>2, -w>>1);
				this.p.rotate(0.15 - 2.121320343559643);
				this.p.scale(scale);
				this.p.rect(0, 0, w, h);
			})
		];
	}
	debug(){
		// ALPHABET
		this.segments.map((segment, key)=>{
			segment.render((Character.DICTIONARY_B[this.id] & 1 << (15-key)) != 0)
		});	
	}
	render(letter){
		this.segments.map((segment, key)=>{
			segment.render((Character.DICTIONARY[letter] & 1 << (15-key)) != 0)
		});	
	}
}

Character.DICTIONARY = {
	  //  0123456789ABCDEF
	A : 0b1010111000001110,
    a : 0b0000000011101100,
	B : 0b1110111011100000,
	b : 0b0000000001101110,
	C : 0b1010000010101010,
	c : 0b0000000000101100,
	D : 0b1110101011100000,
	d : 0b0000111011000000,
	E : 0b1010000010101110,
	e : 0b0000000000111100,
	F : 0b1010000000001110,
	f : 0b0111010001000000,
	G : 0b1010011010101010,
	g : 0b1100000001110001,
	H : 0b0000111000001110,
	h : 0b0000000001001110,
	I : 0b1110000011100000,
	i : 0b0000000001000000,
	J : 0b0010101010100000,
	j : 0b0100000001110000,
	K : 0b0001000100001110,
	k : 0b0111000101000000,
	L : 0b0000000010101010,
	l : 0b0111000001000000,
	M : 0b0001101000001011,
	m : 0b0000011001001100,
	N : 0b0000101100001011,
	n : 0b0000000001001100,
	O : 0b1010101010101010,
	o : 0b0000000001101100,
	P : 0b1010110000001110,
	p : 0b0111000001000000,
	Q : 0b1010101110101010,
	q : 0b1100000001000001,
	R : 0b1010110100001110,
	r : 0b0000000000001100,
	S : 0b1010011010100001,
	s : 0b0000010110000000,
	T : 0b1110000001000000,
	t : 0b0000000000101110,
	U : 0b0000101010101010,
	u : 0b0000000001101000,
	V : 0b0001000000011010,
	v : 0b0000000000011000,
	W : 0b0000101011101010,
	w : 0b0000001011101000,
	X : 0b0001000100010001,
	x : 0b0000010011100100,
	Y : 0b0001000001000001,
	y : 0b0100111010000000,
	Z : 0b1011000010110000,
	z : 0b0000000000110100,
	0 : 0b1011101010111010,
	1 : 0b1100000011100000,
	2 : 0b1010110010101100,
	3 : 0b1010111010100100,
	4 : 0b0000111000000110,
	5 : 0b1010011010100110,
	6 : 0b1010011010101110,
	7 : 0b1010101000000000,
	8 : 0b1010111010101110,
	9 : 0b1010111010100110,
  " " : 0b0000000000000000,
  "+" : 0b0100010001000100,
  "-" : 0b0000010000000100,
  "/" : 0b0001000000010000,
  "*" : 0b0101010101010101,
  "=" : 0b0000010010100100,
 "\"" : 0b0100000000000010,
  "'" : 0b0001000000000000,
  "_" : 0b0000000010100000,
  "<" : 0b0001000100000000,
  ">" : 0b0000000000010001,
  "(" : 0b0001000100000000,
  ")" : 0b0000000000010001,
  "," : 0b0000000000010000
};

Character.DICTIONARY_B = Object.values(Character.DICTIONARY);