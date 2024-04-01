function Mesh(vertices){
	this.glbuffer = gl.createBuffer();
	this.size = Math.floor(vertices.length / VERTEX_SIZE);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.glbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

Mesh.prototype.free = function(){
	gl.deleteBuffer(this.glbuffer);
}

Mesh.prototype.render = function(shaderProgram) {
	gl.bindBuffer(gl.ARRAY_BUFFER, this.glbuffer);

	var coord = gl.getAttribLocation(shaderProgram.glprogram, "coords");
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, VERTEX_SIZE*4, 0);
	gl.enableVertexAttribArray(coord);

	var tex = gl.getAttribLocation(shaderProgram.glprogram, "texCoord");
	gl.vertexAttribPointer(tex, 4, gl.FLOAT, false, VERTEX_SIZE*4, 3*4);
	gl.enableVertexAttribArray(tex);

	var color = gl.getAttribLocation(shaderProgram.glprogram, "color");
	gl.vertexAttribPointer(color, 4, gl.FLOAT, false, VERTEX_SIZE*4, 7*4);
	gl.enableVertexAttribArray(color);
 
	gl.drawArrays(gl.TRIANGLES, 0, this.size);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}
