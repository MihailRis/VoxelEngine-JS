function Chunk(x,y,z, w,h,d){
	this.w = w;
	this.h = h;
	this.d = d;
	this.x = x;
	this.y = y;
	this.z = z;
	this.voxels = new Uint8Array(w*h*d);
	this.lightmap = new Lightmap();
	this.modified = true;
	for (let y = 0; y < h; y++){
		for (let z = 0; z < d; z++){
			for (let x = 0; x < w; x++){
				//if (y <= (noise_oct((x+this.x*w)*0.01, 2)+noise_oct((z+this.z*d)*0.01+345.3245, 2))*10+20)
				//	this.voxels[(y*d+z)*w+x] = 1;
				let gx = x + this.x * w;
				let gy = y + this.y * h;
				let gz = z + this.z * d;
				
				let upper = (noise_oct((x+this.x*w)*0.025, 2)+noise_oct((gy+1)*0.08+8553.643, 2)+noise_oct((z+this.z*d)*0.025+343.5, 2))*((gy+1)*0.01 + 1.0);
				let noise = (noise_oct((x+this.x*w)*0.025, 2)+noise_oct(gy*0.08+8553.643, 2)+noise_oct((z+this.z*d)*0.025+343.5, 2))*(gy*0.01 + 1.0);
			
				let lx = (gx - 8*w) / (8*w);
				let lz = (gz - 8*d) / (8*d);
				let length = Math.sqrt(Math.sqrt(lx*lx + lz*lz));
				noise -= length;
				upper -= length;
				if (y*0.05 < noise){
					this.voxels[(y*d+z)*w+x] = 6;
					if (y*0.05 >= upper-0.1)
						this.voxels[(y*d+z)*w+x] = 1;
				}
			}
		}
	}
}

Chunk.prototype.isBlocked = function(x,y,z, group){
	let w = this.w;
	let h = this.h;
	let d = this.d;
	if (x < 0 || y < 0 || z < 0 || x >= w || y >= h || z >= d)
		return false;
	return bricks[this.voxels[(y*d+z)*w+x]].drawGroup == group;
}

Chunk.prototype.set = function(x,y,z, id){
	let w = this.w;
	let h = this.h;
	let d = this.d;
	if (x < 0 || y < 0 || z < 0 || x == w || y == h || z == d)
		return;
	this.voxels[(y*d+z)*w+x] = id;
	this.modified = true;
}

Chunk.prototype.get = function(x,y,z){
	if (x < 0 || y < 0 || z < 0 || x == this.w || y == this.h || z == this.d)
		return 0;
	return this.voxels[(y*this.d+z)*this.w+x];
}

Chunk.prototype.getLight = function(x,y,z, channel){
	if (x < 0 || y < 0 || z < 0 || x == this.w || y == this.h || z == this.d)
		return 0;
	return this.lightmap.get(x,y,z, channel);
}

function renderChunk(chunk, chunks, bricks, batch, dsBatch){
	for (let y = 0; y < chunk.h; y++){
		for (let z = 0; z < chunk.d; z++){
			for (let x = 0; x < chunk.w; x++){
				let gx = x + chunk.x * chunk.w;
				let gy = y + chunk.y * chunk.h;
				let gz = z + chunk.z * chunk.d;
				let voxel = chunk.voxels[(y*chunk.d+z)*chunk.w+x];
				let brick = bricks[voxel];
				let color = brick.color;
				let l = 1.0;
				/*for (let e = gy+1; e < chunk.h; e++){
					if (chunks.get(gx,e,gz)){
						l = 0.75;
						break;
					}
				}*/
				if (voxel > 0){
					if (brick.emission > 0)
						l *= 2.0;
					/*if (brick.emission > 0){
						batch.box(x+0.5,y+0.5,z+0.5, 1,1,1, 1,1,1,1,
						chunks.isBlocked(gx+1,gy,gz),
						chunks.isBlocked(gx-1,gy,gz),
						chunks.isBlocked(gx,gy,gz+1), 
						chunks.isBlocked(gx,gy,gz-1),
						chunks.isBlocked(gx,gy+1,gz),
						chunks.isBlocked(gx,gy-1,gz));
					} else {*/
					if (brick.type == 1)
						dsBatch.grass(gx,gy,gz, x+0.5,y+0.5,z+0.5, 1,1,1, color[0]*l,color[1]*l,color[2]*l,1,chunks, brick);
					else
						batch.block(gx,gy,gz, x+0.5,y+0.5,z+0.5, 1,1,1, color[0]*l,color[1]*l,color[2]*l,1,chunks, brick);
					//}
				}
			}
		}
	}
}

function Chunks(ox,oy, w,h){
	this.w = w;
	this.h = h;
	this.ox = ox;
	this.oy = oy;
	this.chunks = new Array(w*h);
	this.chunks_second = new Array(w*h);
	this.meshes = new Array(w*h);
	this.meshes_second = new Array(w*h);
	for (let y = 0; y < h; y++){
		for (let x = 0; x < w; x++){
			this.chunks[y * w + x] = new Chunk(x+ox,0,y+oy, CW,CH,CD);
		}
	}
	this.meshes.fill(null);
}

Chunks.prototype.isBlocked = function(x,y,z, group){
	let cx = Math.floor(x / CW);
	let cy = Math.floor(y / CH);
	let cz = Math.floor(z / CD);
	if (cx < this.ox || cy < 0 || cz < this.oy || cx >= this.ox+this.w || cy >= 1 || cz >= this.oy+this.d)
		return false;
	let chunk = this.chunks[cz * this.w + cx];
	if (chunk == null)
		return false;
	return chunk.isBlocked(x - cx * CW, y - cy * CH, z - cz * CD, group);
}

Chunks.prototype.get = function(x,y,z){
	let cx = Math.floor(x / CW);
	let cy = Math.floor(y / CH);
	let cz = Math.floor(z / CD);
	if (cx < this.ox || cy < 0 || cz < this.oy || cx >= this.ox+this.w || cy >= this.h || cz >= this.oy+this.d)
		return null;
	let chunk = this.chunks[cz * this.w + cx];
	if (chunk == null)
		return null;
	return chunk.get(x - cx * CW, y - cy * CH, z - cz * CD);
}

Chunks.prototype.isSolid = function(x,y,z){
	let id = this.get(x,y,z);
	if (id == null)
		return true;
	return bricks[id].solid;
}

Chunks.prototype.getLight = function(x,y,z,channel){
	let cx = Math.floor(x / CW);
	let cy = Math.floor(y / CH);
	let cz = Math.floor(z / CD);
	if (cx < this.ox || cy < 0 || cz < this.oy || cx >= this.ox+this.w || cy >= this.h || cz >= this.oy+this.d)
		return 0;
	let chunk = this.chunks[cz * this.w + cx];
	if (chunk == null)
		return 0;
	return chunk.lightmap.get(x - cx * CW, y - cy * CH, z - cz * CD, channel);
}

Chunks.prototype.set = function(x,y,z, id){
	let cx = Math.floor(x / CW);
	let cy = Math.floor(y / CH);
	let cz = Math.floor(z / CD);
	if (cx < this.ox || cy < 0 || cz < this.oy || cx >= this.ox+this.w || cy >= this.h || cz >= this.oy+this.d)
		return;
	let chunk = this.chunks[cz * this.w + cx];
	if (chunk == null)
		return;
	chunk.set(x - cx * CW, y - cy * CH, z - cz * CD, id);
}

Chunks.prototype.setLight = function(x,y,z, channel, value){
	let cx = Math.floor(x / CW);
	let cy = Math.floor(y / CH);
	let cz = Math.floor(z / CD);
	if (cx < this.ox || cy < 0 || cz < this.oy || cx >= this.ox+this.w || cy >= this.h || cz >= this.oy+this.d)
		return;
	let chunk = this.chunks[cz * this.w + cx];
	if (chunk == null)
		return;
	chunk.modified = true;
	chunk.lightmap.set(x - cx * CW, y - cy * CH, z - cz * CD, channel, value);
}

Chunks.prototype.setModified = function(x,y,z){
	let cx = Math.floor(x / CW);
	let cy = Math.floor(y / CH);
	let cz = Math.floor(z / CD);
	if (cx < this.ox || cy < 0 || cz < this.oy || cx >= this.ox+this.w || cy >= this.h || cz >= this.oy+this.d)
		return;
	let chunk = this.chunks[cz * this.w + cx];
	if (chunk == null)
		return;
	chunk.modified = true;
}

Chunks.prototype.raycast = function(sx,sy,sz, dx,dy,dz, step, steps){
	let x = sx;
	let y = sy;
	let z = sz;
	let px = sx;
	let py = sy;
	let pz = sz;
	let length = 0.0;
	for (; length < steps*step; length += step){
		x += step * dx;
		y += step * dy;
		z += step * dz;
		let ix = Math.floor(x);
		let iy = Math.floor(y);
		let iz = Math.floor(z);
		if (this.get(ix,iy,iz) > 0){
			let ipx = Math.floor(px);
			let ipy = Math.floor(py);
			let ipz = Math.floor(pz);
			return {'px':px, 'py':py, 'pz':pz, 
			'x':x, 'y':y, 'z':z, 'length':length,
			'ix':ix, 'iy':iy, 'iz':iz,
			'ipx':ipx, 'ipy':ipy, 'ipz':ipz}
		}
		px = x;
		py = y;
		pz = z;
	}
	return null;
}
