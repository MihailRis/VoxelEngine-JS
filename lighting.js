function Lightmap(){
	this.map = new Uint8Array(CW*CH*CD);
}

Lightmap.prototype.get = function(x,y,z,channel){
	return (this.map[y*CD*CW+z*CW+x] >> (channel << 2)) & 0xF;
}

Lightmap.prototype.set = function(x,y,z,channel, value){
	let index = y*CD*CW+z*CW+x;
	this.map[index] = (this.map[index] & (0xFFFF & (~(0xF << (channel*4))))) | (value << (channel << 2));
}

Lightmap.prototype.isEmpty = function(){
	for (let i = 0; i < CW*CH*CD; i++){
		if (this.map[i] != 0)
			return false;
	}
	return true;
}

function LightSolver(chunks, channel){
	this.chunks = chunks;
	this.channel = channel;
	this.toadd = new Queue();
	this.torem = new Queue();
}

LightSolver.prototype.add = function(x, y, z, emission){
	if (emission == undefined)
		emission = this.chunks.getLight(x,y,z, this.channel);
	let entry = {'x': x, 'y': y, 'z': z, 'light': emission};
	this.toadd.enqueue(entry);
	this.chunks.setLight(x,y,z, this.channel, emission);
}

LightSolver.prototype.remove = function(x, y, z){
	let light = this.chunks.getLight(x,y,z, this.channel);
	if (light == 0)
		return;
	let entry = {'x': x, 'y': y, 'z': z, 'light': light};
	this.torem.enqueue(entry);
	this.chunks.setLight(x,y,z, this.channel, 0);
}

LightSolver.prototype.solve = function(){
	let coords =[
		0, 0, 1,
		0, 0,-1,
		0, 1, 0,
		0,-1, 0,
		1, 0, 0,
	   -1, 0, 0,
	];
	while (!this.torem.empty()){
		let entry = this.torem.dequeue();
		for (let i = 0; i < 6; i++){
			let x = entry.x + coords[i*3+0];
			let y = entry.y + coords[i*3+1];
			let z = entry.z + coords[i*3+2];
			let light = this.chunks.getLight(x,y,z, this.channel);
			if (light != 0 && light == entry.light-1){
				let nentry = {'x':x,'y':y,'z':z,'light':light};
				this.torem.enqueue(nentry);
				this.chunks.setLight(x,y,z, this.channel, 0);
			} else if (light >= entry.light){
				let nentry = {'x':x,'y':y,'z':z,'light':light};
				this.toadd.enqueue(nentry);
			}
		}
	}
	while(!this.toadd.empty()){
		let entry = this.toadd.dequeue();
		if (entry.light <= 1)
			continue;
		for (let i = 0; i < 6; i++){
			let x = entry.x + coords[i*3+0];
			let y = entry.y + coords[i*3+1];
			let z = entry.z + coords[i*3+2];
			let light = this.chunks.getLight(x,y,z, this.channel);
			if (this.chunks.get(x,y,z) != null && bricks[this.chunks.get(x,y,z)].lightInside && light+2 <= entry.light){
				this.chunks.setLight(x,y,z, this.channel, entry.light-1);
				let nentry = {'x':x,'y':y,'z':z,'light':entry.light-1};
				this.toadd.enqueue(nentry);
			}
		}
	}
}

function on_block_changed(id, x,y,z, chunks){
	if (id === 0){
		solverR.remove(x,y,z);
		solverR.solve();
		solverR.add(x-1,y,z); chunks.setModified(x-1,y,z);
		solverR.add(x+1,y,z); chunks.setModified(x+1,y,z);
		solverR.add(x,y-1,z); chunks.setModified(x,y-1,z);
		solverR.add(x,y+1,z); chunks.setModified(x,y+1,z);
		solverR.add(x,y,z-1); chunks.setModified(x,y,z-1);
		solverR.add(x,y,z+1); chunks.setModified(x,y,z+1);
		solverR.solve();
		
		if (chunks.getLight(x,y+1,z, 1) == 15){
			for (; y >= 0; y--){
				if (!bricks[chunks.get(x, y, z)].lightInside)
					break;
				solverS.add(x,y,z, 15);
				solverS.solve();
			}
		} else {
			solverS.add(x-1,y,z);
			solverS.add(x+1,y,z);
			solverS.add(x,y-1,z);
			solverS.add(x,y+1,z);
			solverS.add(x,y,z-1);
			solverS.add(x,y,z+1);
		}
	} else {
		solverR.remove(x,y,z);
		solverS.remove(x,y,z);
		if (chunks.getLight(x,y-1,z) == 15){
			for (; y >= 0; y--){
				if (!bricks[chunks.get(x, y, z)].lightInside)
					break;
				solverS.remove(x,y,z);
				solverS.solve();
			}
		}
		solverR.solve();
		if (bricks[selectedId].emission > 0){
			solverR.add(x,y,z,bricks[id].emission);
			solverR.solve();
		}
	}
}

var solverR;
var solverS;

function init_lighting(){
	solverR = new LightSolver(chunks, 0);
	solverS = new LightSolver(chunks, 1);
	for (let i = 0; i < 500; i++){
		let x = Math.floor(Math.random()*32*16);
		let y = Math.floor(Math.random()*32*16);
		let z = Math.floor(Math.random()*32*16);
		chunks.set(x,y,z, 3);
		solverR.add(x,y,z, 15);
	}
	
	// setting up lights
	for (let i = 0; i < 10000000; i++){
		let x = Math.floor(Math.random()*32*16);
		let y = Math.floor(Math.random()*32*16);
		let z = Math.floor(Math.random()*32*16);
		if (chunks.get(x,y,z) == 0 && chunks.get(x,y-1,z) == 1){
			chunks.set(x,y,z,4);
		}
	}
	
	for (let z = 0; z < chunks.h * CD; z++){
		for (let x = 0; x < chunks.w * CW; x++){
			for (let y = CH - 1; y >= 0; y--){
				let voxel = chunks.get(x,y,z);
				if (!bricks[voxel].lightInside){
					if (y+1 < CH){
						solverS.add(x,y+1,z,15);
						solverS.solve();
					}					
					break;
				}
				//chunks.setLight(x,y,z,1,15);
				
				solverS.add(x,y+1,z,15);
				solverS.solve();
			}
		}
		console.log('day-light: ', z, ' of ', chunks.h * CD, '('+Math.ceil(z / (chunks.h*CD) * 100.0)+'%)');
	}
	solverR.solve();
}