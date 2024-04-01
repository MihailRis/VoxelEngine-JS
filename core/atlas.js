function Atlas(res, textures){
	let sqrt = Math.ceil(Math.sqrt(textures.length));
	sqrt = 16;
	let size = sqrt * res;

	this.size = size;
	this.sqrt = sqrt;
	this.res = res;
	var data = new Uint8Array(size*size*4);
	for (let i = 0; i < textures.length; i++){
		let sub = textures[i];
		let x = i % sqrt;
		let y = Math.floor(i / sqrt);
		x *= res;
		y *= res;
		for (let y0 = 0; y0 < res; y0++){
			for (let x0 = 0; x0 < res; x0++){
				data[((y + y0) * size + (x + x0)) * 4 + 0] = sub[(y0*res+x0) * 4 + 0];
				data[((y + y0) * size + (x + x0)) * 4 + 1] = sub[(y0*res+x0) * 4 + 1];
				data[((y + y0) * size + (x + x0)) * 4 + 2] = sub[(y0*res+x0) * 4 + 2];
				data[((y + y0) * size + (x + x0)) * 4 + 3] = sub[(y0*res+x0) * 4 + 3];
			}
		}
	}
	this.texture = new Texture(data, size,size, gl.RGBA);
}