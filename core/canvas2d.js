var canvas2d = document.querySelector("#text");
var ctx2d = canvas2d.getContext("2d");

function clear2d(){
	ctx2d.clearRect(0,0, canvas2d.width, canvas2d.height);
	ctx2d.fillStyle = 'white';
	ctx2d.font = '16px Calibri';
	ctx2d.fillText(""+(timer), 10,20);
}

function draw_progress(progress_message){
	ctx2d.fillStyle = 'black';
	ctx2d.clearRect(0,0, canvas2d.width, canvas2d.height);
	ctx2d.fillRect(0,0, canvas2d.width, canvas2d.height);
	ctx2d.font = '16px Calibri';
	ctx2d.fillStyle = 'white';
	ctx2d.textAlign = "center"
	ctx2d.fillText(progress_message, canvas2d.width/2,canvas2d.height/2 + 10);
	ctx2d.fillStyle = 'rgb(50,100,50)';
	ctx2d.font = 'bold 16px Calibri';
	ctx2d.fillText("created by MihailRis", canvas2d.width/2,canvas2d.height/2 - 10);
	ctx2d.textAlign = "left"
}

draw_progress('loading..')

function printText(message, x,y, color, font){
	ctx2d.fillStyle = color;
	ctx2d.font = font;
	ctx2d.fillText(message, x,y);
}