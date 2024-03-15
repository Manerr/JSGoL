

let SIZE =	32;
let SCALEZOOM = 1.12;
let TICK=0;

let INFO_BOOL=false;


function changeSize(_size){

	SIZE=_size;
	INITTABS();
	canvasResize();



}


function drawnoloop(){
		ctx.fillStyle="turquoise";
		for (var x = 0; x <SIZE; x++) {
				for (var y = 0; y <SIZE; y++) {
					
					cell=tab[y][x];
					if(cell){
						// console.log(x,y)
						ctx.fillRect(x,y,1,1);
					}
		}}
}


function canvasResize(e) {
	console.log(window.innerWidth,window.innerHeight);
	let y=window.innerHeight;
	let x=window.innerWidth;




	let devicesizeRatio=y/x;
	console.log(devicesizeRatio);

	if(devicesizeRatio<=1){canvas.style.transform="scale("+y/SIZE/SCALEZOOM+")"}
	else{canvas.style.transform="scale("+x/SIZE/SCALEZOOM+")"}

	canvas.style.width=SIZE+"px";
	canvas.style.height=SIZE+"px";
	

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

function clickMouse(e){
	let Mx=e.offsetX;
	let My=e.offsetY;

	if(tab==0){
	INITTABS();
	}


	if( tab[My][Mx]==0){
	ctx.fillStyle="turquoise";
	ctx.fillRect(Mx,My,1,1);
	tab[My][Mx]=1;
	}
	else{
	ctx.fillStyle="black";
	ctx.fillRect(Mx,My,1,1);
	tab[My][Mx]=0;

	}




	drawnoloop();		
}




canvas.onclick=clickMouse;
// canvas.onmousemove=dispMouse;


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


	// tab[32][31]=1;
	// tab[32][32]=1;
	// tab[32][33]=1;

	// tab[32][31]=1;
	// tab[32][32]=1;
	// tab[33][31]=1;
	// tab[33][32]=1;

}

tab=0;


function trueloop(){

}



function loop(){
	// console.log("TICK",TICK);
	TICK++
	if(tab==0){

		INITTABS();
	}

		ctx.fillStyle="black";
		ctx.fillRect(0,0,SIZE,SIZE);

		ctx.fillStyle="turquoise";

	for (var x = 0; x <SIZE; x++) {
		for (var y = 0; y <SIZE; y++) {
			
			cell=tab[y][x];
			// if(cell){
			// 	// console.log(x,y)
			// 	ctx.fillRect(x,y,1,1);
			// }
			neighbours=0;
	
	// LOOKING FOR NEIGHBOURS: 

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
			// console.log(y,x,chk);

			tabN[y][x]=neighbours;


			if(neighbours>3 || neighbours<2){
				tabTransition[y][x]=0;
			}
			else if(neighbours==3){tabTransition[y][x]=1}
			else if(neighbours==2 && cell){tabTransition[y][x]=1}

			// tab[y][x]=tabTransition[x][y];

	

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
let showinfo=document.getElementById("info");

let infobox=document.getElementById('infobox');
let infoboxbutton=document.getElementById('closeb');





let PLAYING=false;
let TIMEOUTTICKS=0;


// function loopreminder() {



run.onclick=function(){

	if(!PLAYING){

		interval=window.setInterval(loop,30);



		// setTimeout(loopreminder,1000);
		PLAYING=true;
		this.innerHTML="<img src='2pause.png' class='button-image'>Pause";
		canvas.title="running";
	}
	else{
		clearInterval(interval);
		PLAYING=false;
		this.innerHTML="<img src='play.png' class='button-image'>Run";
		canvas.title="paused";

	}



}
clr.onclick=function(){
		INITTABS();
		loop();

		// window.clearInterval(interval);

		}


rand.onclick=function(){
	INITTABS();

	for (var y = tab.length - 1; y >= 0; y--) {
		for (var x = tab.length - 1; x >= 0; x--) {
			tab[y][x]=Math.floor(Math.random()*2);
		}
	}

	drawnoloop();
}

// window.onmousewheel=function(e){
// 	let scale=e.deltaY;
// 	if(scale>0.5){SCALEZOOM*=1.05}
// 	else if(scale<0.5){SCALEZOOM/=1.05}
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


function FSHOWINFO(e){

	if(INFO_BOOL){
		INFO_BOOL=false;
		infobox.style.opacity="0";

		setTimeout(function(){infobox.style.display="none";},800);
		return;

	}
	else{
		INFO_BOOL=true;
		infobox.style.display="flex";

		setTimeout(function(){infobox.style.opacity=".9";},100);

		return;

	}

}


showinfo.onclick=FSHOWINFO;
infoboxbutton.onclick=FSHOWINFO;



