function Batch(capacity){
	this.glbuffer = gl.createBuffer();
	this.buffer = new Float32Array(capacity);
	this.capacity = capacity;
	this.size = 0;

	gl.bindBuffer(gl.ARRAY_BUFFER, this.glbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.buffer, gl.STATIC_DRAW, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

Batch.prototype.vertex = function (x,y,z,u,v,r,g,b,a,lr,ls) {
	this.buffer[this.size++] = x;
	this.buffer[this.size++] = y;
	this.buffer[this.size++] = z;
	this.buffer[this.size++] = u;
	this.buffer[this.size++] = v;
	this.buffer[this.size++] = lr;
	this.buffer[this.size++] = ls;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;
}

Batch.prototype.rect = function (x,y,w,h,u1,v1,u2,v2,r,g,b,a){
	this.buffer[this.size++] = x;
	this.buffer[this.size++] = y;
	this.buffer[this.size++] = 0;
	this.buffer[this.size++] = u1;
	this.buffer[this.size++] = v1;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;

	this.buffer[this.size++] = x;
	this.buffer[this.size++] = y+h;
	this.buffer[this.size++] = 0;
	this.buffer[this.size++] = u1;
	this.buffer[this.size++] = v2;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;

	this.buffer[this.size++] = x+w;
	this.buffer[this.size++] = y+h;
	this.buffer[this.size++] = 0;
	this.buffer[this.size++] = u2;
	this.buffer[this.size++] = v2;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;

	this.buffer[this.size++] = x;
	this.buffer[this.size++] = y;
	this.buffer[this.size++] = 0;
	this.buffer[this.size++] = u1;
	this.buffer[this.size++] = v1;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;

	this.buffer[this.size++] = x+w;
	this.buffer[this.size++] = y+h;
	this.buffer[this.size++] = 0;
	this.buffer[this.size++] = u2;
	this.buffer[this.size++] = v2;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;

	this.buffer[this.size++] = x+w;
	this.buffer[this.size++] = y;
	this.buffer[this.size++] = 0;
	this.buffer[this.size++] = u2;
	this.buffer[this.size++] = v1;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;
}

Batch.prototype.sprite = function(x,y,z, w,h, u1,v1,u2,v2, r,g,b,a, camera){
	let rx = camera.right.x;
	let rz = camera.right.z;
	
	rx = -rx;
	rz = -rz;
	
	this.buffer[this.size++] = x - rx * w;
	this.buffer[this.size++] = y - h;
	this.buffer[this.size++] = z - rz * w;
	this.buffer[this.size++] = u1;
	this.buffer[this.size++] = v1;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;

	this.buffer[this.size++] = x - rx * w;
	this.buffer[this.size++] = y + h;
	this.buffer[this.size++] = z - rz * w;
	this.buffer[this.size++] = u1;
	this.buffer[this.size++] = v2;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;

	this.buffer[this.size++] = x + rx * w;
	this.buffer[this.size++] = y + h;
	this.buffer[this.size++] = z + rz * w;
	this.buffer[this.size++] = u2;
	this.buffer[this.size++] = v2;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;

	this.buffer[this.size++] = x - rx * w;
	this.buffer[this.size++] = y - h;
	this.buffer[this.size++] = z - rz * w;
	this.buffer[this.size++] = u1;
	this.buffer[this.size++] = v1;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;

	this.buffer[this.size++] = x + rx * w;
	this.buffer[this.size++] = y + h;
	this.buffer[this.size++] = z + rz * w;
	this.buffer[this.size++] = u2;
	this.buffer[this.size++] = v2;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;

	this.buffer[this.size++] = x + rx * w;
	this.buffer[this.size++] = y - h;
	this.buffer[this.size++] = z + rz * w;
	this.buffer[this.size++] = u2;
	this.buffer[this.size++] = v1;
	this.buffer[this.size++] = r;
	this.buffer[this.size++] = g;
	this.buffer[this.size++] = b;
	this.buffer[this.size++] = a;
}

Batch.prototype.box = function (x,y,z, w,h,d, r,g,b,a, b0,b1,b2,b3,b4,b5){
	// Left Side (by Z)
	let lf = 1.0;
	let hw = w * 0.5;
	let hh = h * 0.5;
	let hz = d * 0.5;
	let l = 1.0;
	// Left Side (by Z)
	if (!b0){
		this.vertex(x+hw,y-hh,z-hz, 0,0, r*l,g*l,b*l,a);
		this.vertex(x+hw,y+hh,z-hz, 1,0, r*l,g*l,b*l,a);
		this.vertex(x+hw,y+hh,z+hz, 1,1, r*l,g*l,b*l,a);
		
		this.vertex(x+hw,y-hh,z-hz, 0,0, r*l,g*l,b*l,a);
		this.vertex(x+hw,y+hh,z+hz, 1,1, r*l,g*l,b*l,a);
		this.vertex(x+hw,y-hh,z+hz, 0,1, r*l,g*l,b*l,a);
	}
	
	// Right Side (by Z)
	if (!b1){
		this.vertex(x-hw,y-hh,z-hz, 0,0, r*l,g*l,b*l,a);
		this.vertex(x-hw,y+hh,z+hz, 1,1, r*l,g*l,b*l,a);
		this.vertex(x-hw,y+hh,z-hz, 1,0, r*l,g*l,b*l,a);
		
		this.vertex(x-hw,y-hh,z-hz, 0,0, r*l,g*l,b*l,a);
		this.vertex(x-hw,y-hh,z+hz, 0,1, r*l,g*l,b*l,a);
		this.vertex(x-hw,y+hh,z+hz, 1,1, r*l,g*l,b*l,a);
	}

	// Front Side (by Z)
	if (!b2){
		this.vertex(x-hw,y-hh,z+hz, 0,0, r*l,g*l,b*l,a);
		this.vertex(x+hw,y+hh,z+hz, 1,1, r*l,g*l,b*l,a);
		this.vertex(x-hw,y+hh,z+hz, 0,1, r*l,g*l,b*l,a);
		
		this.vertex(x-hw,y-hh,z+hz, 0,0, r*l,g*l,b*l,a);
		this.vertex(x+hw,y-hh,z+hz, 1,0, r*l,g*l,b*l,a);
		this.vertex(x+hw,y+hh,z+hz, 1,1, r*l,g*l,b*l,a);
	}
	
	// Back Side (by Z)
	if (!b3){
		this.vertex(x-hw,y-hh,z-hz, 0,0, r*l,g*l,b*l,a);
		this.vertex(x-hw,y+hh,z-hz, 0,1, r*l,g*l,b*l,a);
		this.vertex(x+hw,y+hh,z-hz, 1,1, r*l,g*l,b*l,a);
		
		this.vertex(x-hw,y-hh,z-hz, 0,0, r*l,g*l,b*l,a);
		this.vertex(x+hw,y+hh,z-hz, 1,1, r*l,g*l,b*l,a);
		this.vertex(x+hw,y-hh,z-hz, 1,0, r*l,g*l,b*l,a);
	}

	// Top Side (by Z)
	if (!b4){
		this.vertex(x-hw,y+hh,z-hz, 0,0, r*l,g*l,b*l,a);
		this.vertex(x-hw,y+hh,z+hz, 0,1, r*l,g*l,b*l,a);
		this.vertex(x+hw,y+hh,z+hz, 1,1, r*l,g*l,b*l,a);
		
		this.vertex(x-hw,y+hh,z-hz, 0,0, r*l,g*l,b*l,a);
		this.vertex(x+hw,y+hh,z+hz, 1,1, r*l,g*l,b*l,a);
		this.vertex(x+hw,y+hh,z-hz, 1,0, r*l,g*l,b*l,a);
	}

	// Bottom Side (by Z)
	if (!b5){
		this.vertex(x-hw,y-hh,z-hz, 0,0, r*l,g*l,b*l,a);
		this.vertex(x+hw,y-hh,z+hz, 1,1, r*l,g*l,b*l,a);
		this.vertex(x-hw,y-hh,z+hz, 0,1, r*l,g*l,b*l,a);
		
		this.vertex(x-hw,y-hh,z-hz, 0,0, r*l,g*l,b*l,a);
		this.vertex(x+hw,y-hh,z-hz, 1,0, r*l,g*l,b*l,a);
		this.vertex(x+hw,y-hh,z+hz, 1,1, r*l,g*l,b*l,a);
	}
}

Batch.prototype.grass = function (gx,gy,gz, x,y,z, w,h,d, r,g,b,a, chunks, brick){
	a = 0.0;
	x += fastRand(gx + gz * 17) * 0.5;
	z += fastRand(gz + gx * 3) * 0.5;
	// Left Side (by Z)
	let s = 1.0 + fastRand(gx+gz*11) * 0.2 - 0.1;
	let lf = 1.0;
	let hw = w * 0.5 * s;
	let hh = h * 0.5 * s;
	let hz = d * 0.5 * s;
	// Left Side (by Z)
	let dim = 16.0;
	let u0 = (brick.texture % dim) / dim;
	let v0 = Math.floor(brick.texture / dim) / dim;
	let u1 = u0 + 1.0/dim;
	let v1 = v0 + 1.0/dim;
	
	{
		let l = 1.0;
		let lmain = chunks.getLight(gx, gy, gz,0) / 15.0;
		l *= lmain;
		
		let ls = chunks.getLight(gx, gy, gz,1) / 15.0;
		
		this.vertex(x-hw,y-hh,z-hz, u0,v0, r,g,b,1, l,ls);
		this.vertex(x+hw,y-hh,z+hz, u1,v0, r,g,b,1, l, ls);
		this.vertex(x+hw,y+hh,z+hz, u1,v1, r,g,b,a, l, ls);
		
		this.vertex(x-hw,y-hh,z-hz, u0,v0, r,g,b,1, l, ls);
		this.vertex(x+hw,y+hh,z+hz, u1,v1, r,g,b,a, l, ls);
		this.vertex(x-hw,y+hh,z-hz, u0,v1, r,g,b,a, l, ls);
		
		this.vertex(x-hw,y-hh,z+hz, u0,v0, r,g,b,1, l, ls);
		this.vertex(x+hw,y-hh,z-hz, u1,v0, r,g,b,1, l, ls);
		this.vertex(x+hw,y+hh,z-hz, u1,v1, r,g,b,a, l, ls);
		
		this.vertex(x-hw,y-hh,z+hz, u0,v0, r,g,b,1, l, ls);
		this.vertex(x+hw,y+hh,z-hz, u1,v1, r,g,b,a, l, ls);
		this.vertex(x-hw,y+hh,z+hz, u0,v1, r,g,b,a, l, ls);
	}
}

Batch.prototype.block = function (gx,gy,gz, x,y,z, w,h,d, r,g,b,a, chunks, brick){
	// Left Side (by Z)
	let lf = 1.0;
	let hw = w * 0.5;
	let hh = h * 0.5;
	let hz = d * 0.5;
	// Left Side (by Z)
	let dim = 16.0;
	let u0 = (brick.texture % dim) / dim;
	let v0 = Math.floor(brick.texture / dim) / dim;
	let u1 = u0 + 1.0/dim;
	let v1 = v0 + 1.0/dim;
	
	// LEFT SIDE (BY Z)
	if (!chunks.isBlocked(gx+1,gy,gz, brick.drawGroup)) {
		let l = 1.0-0.4*lf;
		let lmain = chunks.getLight(gx+1, gy, gz) / 30.0;
		let ls = chunks.getLight(gx+1, gy, gz,1) / 30.0;
		
		let mm = chunks.getLight(gx+1, gy-1, gz-1) / 60.0;
		let mz = chunks.getLight(gx+1, gy, gz-1) / 60.0;
		let zm = chunks.getLight(gx+1, gy-1, gz) / 60.0;
		let mp = chunks.getLight(gx+1, gy+1, gz-1) / 60.0;
		let zp = chunks.getLight(gx+1, gy+1, gz) / 60.0;
		let pp = chunks.getLight(gx+1, gy+1, gz+1) / 60.0;
		let pm = chunks.getLight(gx+1, gy-1, gz+1) / 60.0;
		let pz = chunks.getLight(gx+1, gy, gz+1) / 60.0;
		
		let mms = chunks.getLight(gx+1, gy-1, gz-1, 1) / 60.0;
		let mzs = chunks.getLight(gx+1, gy, gz-1, 1) / 60.0;
		let zms = chunks.getLight(gx+1, gy-1, gz, 1) / 60.0;
		let mps = chunks.getLight(gx+1, gy+1, gz-1, 1) / 60.0;
		let zps = chunks.getLight(gx+1, gy+1, gz, 1) / 60.0;
		let pps = chunks.getLight(gx+1, gy+1, gz+1, 1) / 60.0;
		let pms = chunks.getLight(gx+1, gy-1, gz+1, 1) / 60.0;
		let pzs = chunks.getLight(gx+1, gy, gz+1, 1) / 60.0;
		
		let l0 = mm + mz + zm + lmain * 0.5;
		let l1 = mp + mz + zp + lmain * 0.5;
		let l2 = pp + zp + pz + lmain * 0.5;
		let l3 = pm + pz + zm + lmain * 0.5;
		
		let ls0 = mms + mzs + zms + ls * 0.5;
		let ls1 = mps + mzs + zps + ls * 0.5;
		let ls2 = pps + zps + pzs + ls * 0.5;
		let ls3 = pms + pzs + zms + ls * 0.5;
		
		this.vertex(x+hw,y-hh,z-hz, u0,v0, r*l,g*l,b*l,a, l0,ls0);
		this.vertex(x+hw,y+hh,z-hz, u1,v0, r*l,g*l,b*l,a, l1,ls1);
		this.vertex(x+hw,y+hh,z+hz, u1,v1, r*l,g*l,b*l,a, l2,ls2);
		
		this.vertex(x+hw,y-hh,z-hz, u0,v0, r*l,g*l,b*l,a, l0,ls0);
		this.vertex(x+hw,y+hh,z+hz, u1,v1, r*l,g*l,b*l,a, l2,ls2);
		this.vertex(x+hw,y-hh,z+hz, u0,v1, r*l,g*l,b*l,a, l3,ls3);
	}
	
	// Right Side (by Z)
	if (!chunks.isBlocked(gx-1,gy,gz, brick.drawGroup)) {
		let l = 1.0-0.22*lf;
		let lmain = chunks.getLight(gx-1, gy, gz) / 30.0;
		let ls = chunks.getLight(gx-1, gy, gz,1) / 30.0;
		
		let mm = chunks.getLight(gx-1, gy-1, gz-1) / 60.0;
		let mz = chunks.getLight(gx-1, gy, gz-1) / 60.0;
		let zm = chunks.getLight(gx-1, gy-1, gz) / 60.0;
		let mp = chunks.getLight(gx-1, gy+1, gz-1) / 60.0;
		let zp = chunks.getLight(gx-1, gy+1, gz) / 60.0;
		let pp = chunks.getLight(gx-1, gy+1, gz+1) / 60.0;
		let pm = chunks.getLight(gx-1, gy-1, gz+1) / 60.0;
		let pz = chunks.getLight(gx-1, gy, gz+1) / 60.0;
		
		let mms = chunks.getLight(gx-1, gy-1, gz-1, 1) / 60.0;
		let mzs = chunks.getLight(gx-1, gy, gz-1, 1) / 60.0;
		let zms = chunks.getLight(gx-1, gy-1, gz, 1) / 60.0;
		let mps = chunks.getLight(gx-1, gy+1, gz-1, 1) / 60.0;
		let zps = chunks.getLight(gx-1, gy+1, gz, 1) / 60.0;
		let pps = chunks.getLight(gx-1, gy+1, gz+1, 1) / 60.0;
		let pms = chunks.getLight(gx-1, gy-1, gz+1, 1) / 60.0;
		let pzs = chunks.getLight(gx-1, gy, gz+1, 1) / 60.0;
		
		let l0 = mm + mz + zm + lmain * 0.5;
		let l1 = mp + mz + zp + lmain * 0.5;
		let l2 = pp + zp + pz + lmain * 0.5;
		let l3 = pm + pz + zm + lmain * 0.5;

		let ls0 = mms + mzs + zms + ls * 0.5;
		let ls1 = mps + mzs + zps + ls * 0.5;
		let ls2 = pps + zps + pzs + ls * 0.5;
		let ls3 = pms + pzs + zms + ls * 0.5;
		
		this.vertex(x-hw,y-hh,z-hz, u0,v0, r*l,g*l,b*l,a, l0,ls0);
		this.vertex(x-hw,y+hh,z+hz, u1,v1, r*l,g*l,b*l,a, l2,ls2);
		this.vertex(x-hw,y+hh,z-hz, u1,v0, r*l,g*l,b*l,a, l1,ls1);
		
		this.vertex(x-hw,y-hh,z-hz, u0,v0, r*l,g*l,b*l,a, l0,ls0);
		this.vertex(x-hw,y-hh,z+hz, u0,v1, r*l,g*l,b*l,a, l3,ls3);
		this.vertex(x-hw,y+hh,z+hz, u1,v1, r*l,g*l,b*l,a, l2,ls2);
	}
	
	// Front Side (by Z)
	if (!chunks.isBlocked(gx,gy,gz+1, brick.drawGroup)) {
		let l = 1.0-0.2*lf;
		
		let lmain = chunks.getLight(gx, gy, gz+1) / 30.0;
		let ls = chunks.getLight(gx, gy, gz+1,1) / 30.0;
		
		let mm = chunks.getLight(gx-1, gy-1, gz+1) / 60.0;
		let mz = chunks.getLight(gx-1, gy, gz+1) / 60.0;
		let zm = chunks.getLight(gx, gy-1, gz+1) / 60.0;
		let mp = chunks.getLight(gx-1, gy+1, gz+1) / 60.0;
		let zp = chunks.getLight(gx, gy+1, gz+1) / 60.0;
		let pp = chunks.getLight(gx+1, gy+1, gz+1) / 60.0;
		let pm = chunks.getLight(gx+1, gy-1, gz+1) / 60.0;
		let pz = chunks.getLight(gx+1, gy, gz+1) / 60.0;
		
		let mms = chunks.getLight(gx-1, gy-1, gz+1, 1) / 60.0;
		let mzs = chunks.getLight(gx-1, gy, gz+1, 1) / 60.0;
		let zms = chunks.getLight(gx, gy-1, gz+1, 1) / 60.0;
		let mps = chunks.getLight(gx-1, gy+1, gz+1, 1) / 60.0;
		let zps = chunks.getLight(gx, gy+1, gz+1, 1) / 60.0;
		let pps = chunks.getLight(gx+1, gy+1, gz+1, 1) / 60.0;
		let pms = chunks.getLight(gx+1, gy-1, gz+1, 1) / 60.0;
		let pzs = chunks.getLight(gx+1, gy, gz+1, 1) / 60.0;
		
		let l0 = mm + mz + zm + lmain * 0.5;
		let l1 = mp + mz + zp + lmain * 0.5;
		let l2 = pp + zp + pz + lmain * 0.5;
		let l3 = pm + pz + zm + lmain * 0.5;
		
		let ls0 = mms + mzs + zms + ls * 0.5;
		let ls1 = mps + mzs + zps + ls * 0.5;
		let ls2 = pps + zps + pzs + ls * 0.5;
		let ls3 = pms + pzs + zms + ls * 0.5;
		
		this.vertex(x-hw,y-hh,z+hz, u0,v0, r*l,g*l,b*l,a, l0,ls0);
		this.vertex(x+hw,y+hh,z+hz, u1,v1, r*l,g*l,b*l,a, l2,ls2);
		this.vertex(x-hw,y+hh,z+hz, u0,v1, r*l,g*l,b*l,a, l1,ls1);
		
		this.vertex(x-hw,y-hh,z+hz, u0,v0, r*l,g*l,b*l,a, l0,ls0);
		this.vertex(x+hw,y-hh,z+hz, u1,v0, r*l,g*l,b*l,a, l3,ls3);
		this.vertex(x+hw,y+hh,z+hz, u1,v1, r*l,g*l,b*l,a, l2,ls2);
	}
	
	// Back Side (by Z)
	if (!chunks.isBlocked(gx,gy,gz-1, brick.drawGroup)) {
		let l = 1.0-0.25*lf;
		
		let lmain = chunks.getLight(gx, gy, gz-1) / 30.0;
		let ls = chunks.getLight(gx, gy, gz-1,1) / 30.0;
		
		let mm = chunks.getLight(gx-1, gy-1, gz-1) / 60.0;
		let mz = chunks.getLight(gx-1, gy, gz-1) / 60.0;
		let zm = chunks.getLight(gx, gy-1, gz-1) / 60.0;
		let mp = chunks.getLight(gx-1, gy+1, gz-1) / 60.0;
		let zp = chunks.getLight(gx, gy+1, gz-1) / 60.0;
		let pp = chunks.getLight(gx+1, gy+1, gz-1) / 60.0;
		let pm = chunks.getLight(gx+1, gy-1, gz-1) / 60.0;
		let pz = chunks.getLight(gx+1, gy, gz-1) / 60.0;
		
		let mms = chunks.getLight(gx-1, gy-1, gz-1, 1) / 60.0;
		let mzs = chunks.getLight(gx-1, gy, gz-1, 1) / 60.0;
		let zms = chunks.getLight(gx, gy-1, gz-1, 1) / 60.0;
		let mps = chunks.getLight(gx-1, gy+1, gz-1, 1) / 60.0;
		let zps = chunks.getLight(gx, gy+1, gz-1, 1) / 60.0;
		let pps = chunks.getLight(gx+1, gy+1, gz-1, 1) / 60.0;
		let pms = chunks.getLight(gx+1, gy-1, gz-1, 1) / 60.0;
		let pzs = chunks.getLight(gx+1, gy, gz-1, 1) / 60.0;
		
		let l0 = mm + mz + zm + lmain * 0.5;
		let l1 = mp + mz + zp + lmain * 0.5;
		let l2 = pp + zp + pz + lmain * 0.5;
		let l3 = pm + pz + zm + lmain * 0.5;
		
		let ls0 = mms + mzs + zms + ls * 0.5;
		let ls1 = mps + mzs + zps + ls * 0.5;
		let ls2 = pps + zps + pzs + ls * 0.5;
		let ls3 = pms + pzs + zms + ls * 0.5;
		
		this.vertex(x-hw,y-hh,z-hz, u0,v0, r*l,g*l,b*l,a, l0,ls0);
		this.vertex(x-hw,y+hh,z-hz, u0,v1, r*l,g*l,b*l,a, l1,ls1);
		this.vertex(x+hw,y+hh,z-hz, u1,v1, r*l,g*l,b*l,a, l2,ls2);
		
		this.vertex(x-hw,y-hh,z-hz, u0,v0, r*l,g*l,b*l,a, l0,ls0);
		this.vertex(x+hw,y+hh,z-hz, u1,v1, r*l,g*l,b*l,a, l2,ls2);
		this.vertex(x+hw,y-hh,z-hz, u1,v0, r*l,g*l,b*l,a, l3,ls3);
	}
	
	// Top Side (by Z)
	if (!chunks.isBlocked(gx,gy+1,gz, brick.drawGroup)) {
		let l = 1.0;
		let lmain = chunks.getLight(gx, gy+1, gz) / 30.0;
		let ls = chunks.getLight(gx, gy+1, gz, 1) / 30.0;
		
		let mm = chunks.getLight(gx-1, gy+1, gz-1) / 60.0;
		let mz = chunks.getLight(gx-1, gy+1, gz) / 60.0;
		let zm = chunks.getLight(gx, gy+1, gz-1) / 60.0;
		let mp = chunks.getLight(gx-1, gy+1, gz+1) / 60.0;
		let zp = chunks.getLight(gx, gy+1, gz+1) / 60.0;
		let pp = chunks.getLight(gx+1, gy+1, gz+1) / 60.0;
		let pm = chunks.getLight(gx+1, gy+1, gz-1) / 60.0;
		let pz = chunks.getLight(gx+1, gy+1, gz) / 60.0;
		
		let mms = chunks.getLight(gx-1, gy+1, gz-1, 1) / 60.0;
		let mzs = chunks.getLight(gx-1, gy+1, gz, 1) / 60.0;
		let zms = chunks.getLight(gx, gy+1, gz-1, 1) / 60.0;
		let mps = chunks.getLight(gx-1, gy+1, gz+1, 1) / 60.0;
		let zps = chunks.getLight(gx, gy+1, gz+1, 1) / 60.0;
		let pps = chunks.getLight(gx+1, gy+1, gz+1, 1) / 60.0;
		let pms = chunks.getLight(gx+1, gy+1, gz-1, 1) / 60.0;
		let pzs = chunks.getLight(gx+1, gy+1, gz, 1) / 60.0;
		
		let l0 = mm + mz + zm + lmain * 0.5;
		let l1 = mp + mz + zp + lmain * 0.5;
		let l2 = pp + zp + pz + lmain * 0.5;
		let l3 = pm + pz + zm + lmain * 0.5;
		
		let ls0 = mms + mzs + zms + ls * 0.5;
		let ls1 = mps + mzs + zps + ls * 0.5;
		let ls2 = pps + zps + pzs + ls * 0.5;
		let ls3 = pms + pzs + zms + ls * 0.5;
		
		this.vertex(x-hw,y+hh,z-hz, u0,v0, r*l,g*l,b*l,a, l0,ls0);
		this.vertex(x-hw,y+hh,z+hz, u0,v1, r*l,g*l,b*l,a, l1,ls1);
		this.vertex(x+hw,y+hh,z+hz, u1,v1, r*l,g*l,b*l,a, l2,ls2);
		
		this.vertex(x-hw,y+hh,z-hz, u0,v0, r*l,g*l,b*l,a, l0,ls0);
		this.vertex(x+hw,y+hh,z+hz, u1,v1, r*l,g*l,b*l,a, l2,ls2);
		this.vertex(x+hw,y+hh,z-hz, u1,v0, r*l,g*l,b*l,a, l3,ls3);
	}
	
	// Bottom Side (by Z)
	if (!chunks.isBlocked(gx,gy-1,gz, brick.drawGroup)) {
		let l = 1.0-0.5*lf;
		
		let lmain = chunks.getLight(gx, gy-1, gz) / 30.0;
		let ls = chunks.getLight(gx, gy-1, gz,1) / 15.0;
		let mm = chunks.getLight(gx-1, gy-1, gz-1) / 60.0;
		let mz = chunks.getLight(gx-1, gy-1, gz) / 60.0;
		let zm = chunks.getLight(gx, gy-1, gz-1) / 60.0;
		let mp = chunks.getLight(gx-1, gy-1, gz+1) / 60.0;
		let zp = chunks.getLight(gx, gy-1, gz+1) / 60.0;
		let pp = chunks.getLight(gx+1, gy-1, gz+1) / 60.0;
		let pm = chunks.getLight(gx+1, gy-1, gz-1) / 60.0;
		let pz = chunks.getLight(gx+1, gy-1, gz) / 60.0;
		let l0 = mm + mz + zm + lmain * 0.5;
		let l1 = mp + mz + zp + lmain * 0.5;
		let l2 = pp + zp + pz + lmain * 0.5;
		let l3 = pm + pz + zm + lmain * 0.5;
		
		this.vertex(x-hw,y-hh,z-hz, u0,v0, r*l,g*l,b*l,a, l0,ls);
		this.vertex(x+hw,y-hh,z+hz, u1,v1, r*l,g*l,b*l,a, l2,ls);
		this.vertex(x-hw,y-hh,z+hz, u0,v1, r*l,g*l,b*l,a, l1,ls);
		
		this.vertex(x-hw,y-hh,z-hz, u0,v0, r*l,g*l,b*l,a, l0,ls);
		this.vertex(x+hw,y-hh,z-hz, u1,v0, r*l,g*l,b*l,a, l3,ls);
		this.vertex(x+hw,y-hh,z+hz, u1,v1, r*l,g*l,b*l,a, l2,ls);
	}
}

Batch.prototype.flush = function (shaderProgram) {
	gl.bindBuffer(gl.ARRAY_BUFFER, this.glbuffer);
	gl.bufferData(gl.ARRAY_BUFFER, this.buffer, gl.STATIC_DRAW, 0, this.size);

	var coord = gl.getAttribLocation(shaderProgram.glprogram, "coords");
	gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, VERTEX_SIZE*4, 0);
	gl.enableVertexAttribArray(coord);

	var tex = gl.getAttribLocation(shaderProgram.glprogram, "texCoord");
	gl.vertexAttribPointer(tex, 4, gl.FLOAT, false, VERTEX_SIZE*4, 3*4);
	gl.enableVertexAttribArray(tex);

	var color = gl.getAttribLocation(shaderProgram.glprogram, "color");
	gl.vertexAttribPointer(color, 4, gl.FLOAT, false, VERTEX_SIZE*4, 7*4);
	gl.enableVertexAttribArray(color);
 
	gl.drawArrays(gl.TRIANGLES, 0, this.size / VERTEX_SIZE);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);

	this.size = 0;	
}

Batch.prototype.export = function() {
	let array = this.buffer.slice(0, this.size);
	return new Mesh(array);
}

Batch.prototype.clear = function() {
	this.size = 0;
}
