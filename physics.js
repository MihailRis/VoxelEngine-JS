var gravity = 16.0;

function Body(coords, size){
	this.coords = coords;
	this.size = size;
	this.vel = new vec3(0,0,0);
}

function step_physics(body, chunks, delta, substeps){
	for (let i = 0; i < substeps; i++){
		let dt = delta / substeps;
		let p = body.coords;
		let s = body.size;
		let v = body.vel;
		v.y -= gravity*dt;
		
		let E = 0.01;
		
		if (v.x < 0.0){
			for (let y = Math.floor(p.y-s.y+E); y <= Math.floor(p.y+s.y-E); y++){
				for (let z = Math.floor(p.z-s.z+E); z <= Math.floor(p.z+s.z-E); z++){
					let x = Math.floor(p.x-s.x-E);
					if (chunks.isSolid(x,y,z)){
						v.x *= 0.0;
						p.x = x + 1 + s.x + E;
						break;
					}
				}
			}
		}
		
		if (v.x > 0.0){
			for (let y = Math.floor(p.y-s.y+E); y <= Math.floor(p.y+s.y-E); y++){
				for (let z = Math.floor(p.z-s.z+E); z <= Math.floor(p.z+s.z-E); z++){
					let x = Math.floor(p.x+s.x+E);
					if (chunks.isSolid(x,y,z)){
						v.x *= 0.0;
						p.x = x - s.x - E;
						break;
					}
				}
			}
		}
		
		if (v.z < 0.0){
			for (let y = Math.floor(p.y-s.y+E); y <= Math.floor(p.y+s.y-E); y++){
				for (let x = Math.floor(p.x-s.x+E); x <= Math.floor(p.x+s.x-E); x++){
					let z = Math.floor(p.z-s.z-E);
					if (chunks.isSolid(x,y,z)){
						v.z *= 0.0;
						p.z = z + 1 + s.z + E;
						break;
					}
				}
			}
		}
		
		if (v.z > 0.0){
			for (let y = Math.floor(p.y-s.y+E); y <= Math.floor(p.y+s.y-E); y++){
				for (let x = Math.floor(p.x-s.x+E); x <= Math.floor(p.x+s.x-E); x++){
					let z = Math.floor(p.z+s.z+E);
					if (chunks.isSolid(x,y,z)){
						v.z *= 0.0;
						p.z = z - s.z - E;
						break;
					}
				}
			}
		}
		
		if (v.y < 0.0){
			for (let x = Math.floor(p.x-s.x+E); x <= Math.floor(p.x+s.x-E); x++){
				for (let z = Math.floor(p.z-s.z+E); z <= Math.floor(p.z+s.z-E); z++){
					let y = Math.floor(p.y-s.y-E);
					if (chunks.isSolid(x,y,z)){
						v.y *= 0.0;
						p.y = y + 1 + s.y + E;
						let f = 18.0;
						v.x *= Math.max(0.0, 1.0 - dt * f);
						v.z *= Math.max(0.0, 1.0 - dt * f);
						break;
					}
				}
			}
		}
		if (v.y > 0.0){
			for (let x = Math.floor(p.x-s.x+E); x <= Math.floor(p.x+s.x-E); x++){
				for (let z = Math.floor(p.z-s.z+E); z <= Math.floor(p.z+s.z-E); z++){
					let y = Math.floor(p.y+s.y+E);
					if (chunks.isSolid(x,y,z)){
						v.y *= 0.0;
						p.y = y - s.y - E;
						break;
					}
				}
			}
		}
		
		p.x += v.x * dt;
		p.y += v.y * dt;
		p.z += v.z * dt;
	}

}