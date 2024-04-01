function Texture(pixels, w,h, format){
	this.gltexture = gl.createTexture();
	this.width = w;
	this.height = h;
	this.format = format;
	gl.bindTexture(gl.TEXTURE_2D, this.gltexture);
	gl.texImage2D(gl.TEXTURE_2D, 0, format, w,h, 0, format, gl.UNSIGNED_BYTE, pixels);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
}

Texture.prototype.setPixelization = function(flag){
	gl.bindTexture(gl.TEXTURE_2D, this.gltexture);
	if (flag){
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	} else {
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	}
}

Texture.prototype.reload = function(pixels, w,h){
	this.w = w;
	this.h = h;
	gl.bindTexture(gl.TEXTURE_2D, this.gltexture);
	gl.texImage2D(gl.TEXTURE_2D, 0, this.format, w,h, 0, this.format, gl.UNSIGNED_BYTE, pixels);
}
