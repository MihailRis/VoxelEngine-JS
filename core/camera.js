function Camera(coords){
	this.coords = coords;
	this.yrotation = 0.0;
	this.xrotation = 0.0;
	this.dir = new vec3(0.0, 0.0, -1.0);
	this.rdir = new vec3(0.0, 0.0, -1.0);
	this.right = new vec3(1.0, 0.0, 0.0);
	this.zoom = 1.0;
}

var walkTimer = 0.0;
Camera.prototype.controls = function(timer, dt){
	let speed = 20.0;
	let zoom = 1.0;
	if (this.body && events.shift){
		speed *= 1.5;
	}
	let coords = this.coords;
	let front = this.rdir;
	if (this.body){
		coords = this.body.vel;
		//coords.x = 0;
		//coords.z = 0;
		speed *= 10;
		front = this.dir;
	}
	
	if (this.body)
	if (events.down || events.up || events.left || events.right){
		coords.x = 0.0;
		coords.z = 0.0;
		if (events.shift)
			zoom = 1.2;
		else
			zoom = 1.05;
		let factor = speed * 0.05;
		walkTimer += dt*factor;
	}
	
	if (events.down) {
		coords.x -= front.x*0.016*speed;
		coords.y -= front.y*0.016*speed;
		coords.z -= front.z*0.016*speed;
	}
	if (events.up){
		coords.x += front.x*0.016*speed;
		coords.y += front.y*0.016*speed;
		coords.z += front.z*0.016*speed;
	}
	if (events.left){
		coords.x -= this.right.x*0.016*speed;
		coords.z -= this.right.z*0.016*speed;
	}
	if (events.right){
		coords.x += this.right.x*0.016*speed;
		coords.z += this.right.z*0.016*speed;
	}
	if (events.space) {
		if (this.body){
			this.body.vel.y = 6.0;
		} else {
			coords.y += 0.016*speed;
		}
	}
	if (!this.body && events.shift)
		coords.y -= 0.016*speed;
	
	if (events.locked){
		this.yrotation += events.dx * 0.005;
		this.xrotation += events.dy * 0.005;
		this.xrotation = Math.min(Math.max(this.xrotation, -3.141592*0.49), 3.141592*0.49);
	}
	dt *= 15.0;
	dt = Math.min(dt, 1.0);
	this.zoom = zoom * dt + this.zoom * (1.0-dt);
}

Camera.prototype.update = function(){
	this.dir.x = Math.sin(this.yrotation);
	this.dir.z = -Math.cos(this.yrotation);
	
	this.rdir.x = Math.sin(this.yrotation);
	this.rdir.z = -Math.cos(this.yrotation);
	this.rdir.y = -Math.tan(this.xrotation);
	
	let l = Math.sqrt(this.rdir.x * this.rdir.x + this.rdir.y * this.rdir.y + this.rdir.z * this.rdir.z);
	this.rdir.x /= l;
	this.rdir.y /= l;
	this.rdir.z /= l;
	
	this.right.x = Math.sin(this.yrotation + 3.141592 * 0.5);
	this.right.z = -Math.cos(this.yrotation + 3.141592 * 0.5);
}
