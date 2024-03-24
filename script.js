

let SIZE =	64;
let SCALEZOOM = 1.12;
let TICK=0;

let tab;
let tabN;
let tabTransition;

let INFO_BOOL=false;

const color="#28aaa2";

function INITTABS() {
	console.log("INIT!");

	
	tab=new Array(SIZE);
	for (var i = tab.length - 1; i >= 0; i--) {
		tab[i]=new Array(SIZE);
		tab[i].fill(0);
	}
	tabN=new Array(SIZE);
	for (var i = tabN.length - 1; i >= 0; i--) {
		tabN[i]=new Array(SIZE);
		tabN[i].fill(0);
	}
	tabTransition=new Array(SIZE);
	for (var i = tab.length - 1; i >= 0; i--) {
		tabTransition[i]=new Array(SIZE);
		tabTransition[i].fill(0);
	}


}

tab=0;

function changeSize(_size){

	SIZE=_size;
	INITTABS();
	canvasResize();



}


function drawnoloop(){
		ctx.fillStyle=color;
		for (var x = 0; x <SIZE; x++) {
				for (var y = 0; y <SIZE; y++) {
					
					cell=tab[y][x];
					if(cell){
						ctx.fillRect(x,y,1,1);
					}
		}}
}


function canvasResize(e) {


	let x=canvas.parentElement.clientWidth;
	let y=canvas.parentElement.clientHeight;

	let newscale=1;


	let devicesizeRatio=y/x;
	console.log(devicesizeRatio);

	if(devicesizeRatio<=1){
		newscale=y/SIZE/SCALEZOOM;
	}
	else{
		newscale=x/SIZE/SCALEZOOM;
	}
		// canvas.style.transform="scale("+newscale+")"}

	canvas.style.width=(SIZE*newscale)+"px";
	canvas.style.height=(SIZE*newscale)+"px";
	

	canvas.width=SIZE;
	canvas.height=SIZE;
	
	if(tab){
		drawnoloop()	

	}


}

window.onresize=canvasResize;
window.onload=canvasResize;

canvas=document.getElementById('canvas');
	canvas.style.width=SIZE+"px";
	canvas.style.height=SIZE+"px";
	canvas.width=SIZE;
	canvas.height=SIZE;	
let ctx=canvas.getContext("2d");

function clickMouse(e,type){

	let Mx=Math.floor(e.offsetX/canvas.clientWidth*SIZE);
	let My=Math.floor(e.offsetY/canvas.clientHeight*SIZE);

	console.log(Mx,My);

	if(Mx>=SIZE || My>=SIZE || Mx<0 || My<0){return}

	if(tab==0){
	INITTABS();
	}

	if( tab[My][Mx]==0  || type==="drag"){
	ctx.fillStyle=color;
	tab[My][Mx]=1;
	}
	else{
	ctx.fillStyle="black";
	tab[My][Mx]=0;

	}


	ctx.fillRect(Mx,My,1,1);


	// drawnoloop();		
}




canvas.onclick=function(e){clickMouse(e,"click")};
canvas.ondrag=function(e){e.dataTransfer.dropEffect = 'grab';clickMouse(e,"drag")};
canvas.addEventListener("dragstart", function( event ) {
    var img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=';
    event.dataTransfer.setDragImage(img, 0, 0);
}, false);



function loop(){
	TICK++
	if(tab==0){

		INITTABS();
	}

		ctx.fillStyle="black";
		ctx.fillRect(0,0,SIZE,SIZE);

		ctx.fillStyle=color;

	for (var x = 0; x <SIZE; x++) {
		for (var y = 0; y <SIZE; y++) {
			
			cell=tab[y][x];
			
			neighbours=0;
	
	// LOOKING FOR NEIGHBOURS:
	//   1
	// 1 1
	//  11 

			minX=x-1;
			minY=y-1;
			maxX=x+2;
			maxY=y+2;
			if(minX<0){minX=0}
			if(minY<0){minY=0}
			if(maxX>SIZE){maxX=SIZE}
			if(maxY>SIZE){maxY=SIZE}


			chk=0;
			for (var XN = minX; XN < maxX; XN++) {
				for (var YN = minY; YN < maxY; YN++) {
					cellN=tab[YN][XN];

					if(cellN && (XN!=x || YN!=y) || '' ){
						neighbours++
						// console.log(x!=XN)
					}

				chk++	
				}
			}

			tabN[y][x]=neighbours;


			if(neighbours>3 || neighbours<2){
				tabTransition[y][x]=0;
			}
			else if(neighbours==3){tabTransition[y][x]=1}
			else if(neighbours==2 && cell){tabTransition[y][x]=1}


	

		}
	}


	for (var y = tabTransition.length - 1; y >= 0; y--) {
		for (var x = tabTransition.length - 1; x >= 0; x--) {
			tab[y][x]=tabTransition[y][x];

		}
	}


	requestAnimationFrame(drawnoloop);


}


let run=document.getElementById("run");
let random=document.getElementById("rand");
let clr=document.getElementById("clr");
let sizer=document.getElementById("sizer");
let filler=document.getElementById("fill");






let PLAYING=false;
let TIMEOUTTICKS=0;



pausePict=new Image();
pausePict.src="icons/2pause.png";

playPict=new Image();
playPict.src="icons/play.png";




run.onclick=function(){

	if(!PLAYING){

		interval=window.setInterval(loop,30);


		PLAYING=true;
		this.innerHTML="<img src='icons/2pause.png' class='button-image'/>Pause";
		canvas.title="running";
	}
	else{
		clearInterval(interval);
		PLAYING=false;
		this.innerHTML="<img src='icons/play.png' class='button-image'/>Run";
		canvas.title="paused";

	}



}
clr.onclick=function(){
		INITTABS();
		loop();

		}


rand.onclick=function(){
	INITTABS();

	for (var y = tab.length - 1; y >= 0; y--) {
		for (var x = tab.length - 1; x >= 0; x--) {
			tab[y][x]=Math.floor(Math.random()*2);
		}
	}
	ctx.clearRect(0,0,SIZE,SIZE);
	drawnoloop();
}

// window.onmousewheel=function(e){
// 	let scale=e.deltaY;
// 	if(scale>0.5){SCALEZOOM*=1.05}
// 	else if(scale<0.5){SCALEZOOM/=1.05}
// 	if(SCALEZOOM<.1){SCALEZOOM=.1;}
// 	canvasResize();
// }


sizer.onclick=function(e){

	let new_size=0;

	while(new_size<8 || new_size>512){
		let ask=prompt("Size of the new array (Between 8 and 512):");
		if(ask===null){return;}

		let n=Math.floor(ask);

		if(typeof n=="number"){
			new_size=n;
		}

	}

	changeSize(new_size);

}


filler.onclick=function(e){



	if(tab==0){
		INITTABS();
	}


		INITTABS();

	for (var y = tab.length - 1; y >= 0; y--) {
		for (var x = tab.length - 1; x >= 0; x--) {
			tab[y][x]=1;
		}
	}

	drawnoloop();

	drawnoloop();



}


