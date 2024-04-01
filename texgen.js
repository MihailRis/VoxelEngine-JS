function create_test_texture(w,h){
	var data = new Uint8Array(w*h*4);
	for (let y = 0; y < h; y++){
		for (let x = 0; x < w; x++){
			let r = 200;
			let g = 200;
			let b = 200;
			
			if ((x == 0 || y == 0 || x == w-1 || y == h-1) && (x+y) % 2 == 0){
				r = 255;
				g = 255;
				b = 255;
			}

			data[(y*w+x)*4] = r;
			data[(y*w+x)*4+1] = g;
			data[(y*w+x)*4+2] = b;
			data[(y*w+x)*4+3] = 255;
		}
	}
	return data;
}

function create_border_texture(w,h){
	var data = new Uint8Array(w*h*4);
	for (let y = 0; y < h; y++){
		for (let x = 0; x < w; x++){
			let r = 0;
			let g = 0;
			let b = 0;
			let a = 0;
			
			if ((x == 0 || y == 0 || x == w-1 || y == h-1)){
				r = 255;
				g = 255;
				b = 255;
				a = 255;
			}

			data[(y*w+x)*4] = r;
			data[(y*w+x)*4+1] = g;
			data[(y*w+x)*4+2] = b;
			data[(y*w+x)*4+3] = a;
		}
	}
	return data;
}

function tex_grass(w,h){
	var heights = [3,2,7,4,8,12,7,11,13,8,10,7,5,8,1,3];
	var data = new Uint8Array(w*h*4);
	for (let x = 0; x < w; x++){
		let height = heights[x];//(Math.random()*Math.random()) * h * 1.5;
		let n = Math.random() * 0.4 + 0.8;
		
		for (let y = 0; y < Math.min(height, h); y++){
			data[(y*w+x)*4] = 80 * n;
			data[(y*w+x)*4+1] = 200 * n;
			data[(y*w+x)*4+2] = 70 * n;
			data[(y*w+x)*4+3] = 255;
		}
	}
	return data;
}

function tex_noise_rgb(w,h,colorize,intencity){
	var data = new Uint8Array(w*h*4);
	for (let y = 0; y < h; y++){
		for (let x = 0; x < w; x++){
			let r = 255-Math.random()*255*intencity;
			let g = 255-Math.random()*255*intencity;
			let b = 255-Math.random()*255*intencity;

			let m = (r+g+b)/3;
			data[(y*w+x)*4] = r * colorize + m * (1.0-colorize);
			data[(y*w+x)*4+1] = g * colorize + m * (1.0-colorize);
			data[(y*w+x)*4+2] = b * colorize + m * (1.0-colorize);
			data[(y*w+x)*4+3] = 255;
		}
	}
	return data;
}

function create_leaves_texture(w,h,colorize,intencity, alpha){
	var data = new Uint8Array(w*h*4);
	for (let y = 0; y < h; y++){
		for (let x = 0; x < w; x++){
			let r = 255-Math.random()*255*intencity;
			let g = 255-Math.random()*255*intencity;
			let b = 255-Math.random()*255*intencity;

			let m = (r+g+b)/3;
			data[(y*w+x)*4] = r * colorize + m * (1.0-colorize);
			data[(y*w+x)*4+1] = g * colorize + m * (1.0-colorize);
			data[(y*w+x)*4+2] = b * colorize + m * (1.0-colorize);
			data[(y*w+x)*4+3] = (Math.random() < alpha) ? 0 : 255;
		}
	}
	return data;
}
