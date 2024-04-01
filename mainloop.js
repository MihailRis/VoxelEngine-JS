var canvas = document.getElementById('glcanvas');
var gl = canvas.getContext('experimental-webgl', {antialias: false, alpha:false, premultipliedAlpha: false});
var progress_bar = document.getElementById('progress');

var events = {
	"right":false,
	"left":false,
	"up":false,
	"down":false,
	"mx":0.0,
	"my":0.0,
	"dx":0.0,
	"dy":0.0,
	"locked":false,
	"space":false,
	"shift":false,
	"ctrl":false,
	"lmb":false,
	"rmb":false,
};
var frameID = 0;
var VERTEX_SIZE = 11;
var CW = 16;
var CH = 128;
var CD = 16;

var flight = true;
var selectedId = 1;
function handleKeyPress(e){
    if (e.code == 'KeyD') events.right = true;
    if (e.code == 'KeyA') events.left = true;
    if (e.code == 'KeyW') events.up = true;
    if (e.code == 'KeyS') events.down = true;
	if (e.code == 'Space') events.space = true;
	if (e.code == 'ShiftLeft') events.shift = true;
	if (e.code == 'ControlLeft') events.ctrl = true;
	if (e.code == 'KeyF') events.lmb = true;
	if (e.code == 'KeyP') events.rmb = true;
	if (e.code == 'KeyT'){
		canvas.requestPointerLock();
		events.locked = true;
	}
	if (e.code == 'KeyZ') flight = !flight;
	if (e.code == 'Escape')
		events.locked = false;
	
	if (e.code == 'Digit1') selectedId = 1;
	if (e.code == 'Digit2') selectedId = 2;
	if (e.code == 'Digit3') selectedId = 3;
	if (e.code == 'Digit4') selectedId = 4;
	if (e.code == 'Digit5') selectedId = 5;
	if (e.code == 'Digit6') selectedId = 6;
	if (e.code == 'Digit7') selectedId = 7;
	if (e.code == 'Digit8') selectedId = 8;
	if (e.code == 'Digit9') selectedId = 9;
	if (e.code == 'Digit0') selectedId = 0;
	console.log(e.code);
};

function handleMouseClick(e){
	if (e.button == 0)
		events.lmb = true;
	if (e.button == 2)
		events.rmb = true;
};

function handleKeyRelease(e){
    if (e.code == 'KeyD') events.right = false;
    if (e.code == 'KeyA') events.left = false;
    if (e.code == 'KeyW') events.up = false;
    if (e.code == 'KeyS') events.down = false;
	if (e.code == 'Space') events.space = false;
	if (e.code == 'ShiftLeft') events.shift = false;
	if (e.code == 'ControlLeft') events.ctrl = false;
	if (e.code == 'KeyF') events.lmb = false;
	if (e.code == 'KeyP') events.rmb = false;
};

function handleMouseMove(e){
    var rect = canvas.getBoundingClientRect();
	let mx = e.clientX - rect.left
	let my = e.clientY - rect.top;
	if (frameID > 10){
		events.dx += e.movementX;
		events.dy += e.movementY;
	}
    events.mx = mx;
    events.my = my;
}

var onTick;
var chunks;
var timer = 0.0;
function main() {
	canvas.addEventListener('keydown', handleKeyPress);
	canvas.addEventListener('keyup', handleKeyRelease);
	canvas.addEventListener('mousemove', handleMouseMove);
	canvas.addEventListener('click', handleMouseClick);
	canvas.focus();
	
	 function getUnmaskedInfo(gl) {
      var unMaskedInfo = {
        renderer: '',
        vendor: ''
      };

      var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (dbgRenderInfo != null) {
        unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
        unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
      }

      return unMaskedInfo;
    }
	console.log("GPU Info:");
    console.log("  vendor:", getUnmaskedInfo(gl).vendor);
    console.log("  renderer:", getUnmaskedInfo(gl).renderer);
	
	var chunkBatch = new Batch(4096*256*1);
	var dsChunkBatch = new Batch(4096*256*1);
	var batch = new Batch(4096);
	
	var shader = new Shader(vertCode, fragCode);
	var camera = new Camera(new vec3(16.0*8, 64.0, 16.0*8));
	var body = new Body(camera.coords.cpy(), new vec3(0.2,0.9,0.2));
	
	initialize_assets();
	
	timer = 0.0;
	
	// generating map
	progress_message = 'Generating map..';
	console.log("Generating map..");
	chunks = new Chunks(0,0, 16,16);
	
	for (let i = 0; i <= 50; i++){
		chunks.set(i,70,10, 2);
		if (i % 10 == 0){
			for (let j = 0; j < 70; j++)
				chunks.set(i,j,10, 2);
		}
	}
	
	let r = 32;
	for (let y = -r; y <= r; y++)
		for (let z = -r; z <= r; z++)
			for (let x = -r; x <= r; x++)
				if (x*x+y*y+z*z <= r*r){
					chunks.set(x+150, y+70, z+150, 2);
				}
	console.log("Propagating lights..");
	init_lighting();
	
	camera.update();
	
	var selectedBlockX;
	var selectedBlockY;
	var selectedBlockZ;

	var lastUpdate = Date.now();
	onTick = function() {
		canvas.focus();
		let now = Date.now();
		let delta = (now - lastUpdate) / 1000.0;
		lastUpdate = now;
		frameID++;
		
		for (let i = 0; i < chunks.w*chunks.h; i++){
			let chunk = chunks.chunks[i];
			if (chunk == null)
				continue;
			let mesh = chunks.meshes[i];
			if (chunk.modified || mesh == null){
				if (mesh != null){
					mesh.oneside.free();
					mesh.doubleside.free();
				}
				renderChunk(chunk, chunks, bricks, chunkBatch, dsChunkBatch);
				chunks.meshes[i] = {'oneside': chunkBatch.export(), 'doubleside': dsChunkBatch.export()};
				chunkBatch.clear();
				dsChunkBatch.clear();
				chunk.modified = false;
			}
		}

		camera.controls(timer, delta);
		camera.update();
		
		if (flight){
			body.coords.set(camera.coords);
			camera.body = null;
		} else {
			step_physics(body, chunks, delta, 100);
			camera.coords.set(body.coords);
			camera.coords.y += 0.5;
			camera.coords.y += Math.sin(walkTimer)*0.05;
			camera.coords.x += camera.right.x * Math.cos(walkTimer * 0.5) * 0.05;
			camera.body = body;
		}
		
		let ray = chunks.raycast(
		camera.coords.x, camera.coords.y, camera.coords.z, 
		camera.rdir.x, camera.rdir.y, camera.rdir.z, 0.1, 100.0);
		
		if (ray != null && chunks.get(ray.ix,ray.iy,ray.iz)){
			if (events.lmb){
				chunks.set(ray.ix,ray.iy,ray.iz, 0);
				on_block_changed(0, ray.ix,ray.iy,ray.iz, chunks);
			}
			selectedBlockX = ray.ix;
			selectedBlockY = ray.iy;
			selectedBlockZ = ray.iz;
		} else {
			selectedBlockX = undefined;
			selectedBlockY = undefined;
			selectedBlockZ = undefined;
		}
		
		if (events.rmb && ray != null && chunks.get(ray.ipx,ray.ipy,ray.ipz) == 0){
			chunks.set(ray.ipx,ray.ipy,ray.ipz, selectedId);
			on_block_changed(selectedId, ray.ipx,ray.ipy,ray.ipz, chunks);
		}
		
		var matrix = m4.perspective(1.7*camera.zoom, canvas.width/canvas.height, 0.01,1000.0);//m4.projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 100);
		var view = m4.translation(0,0,0);
		view = m4.xRotate(view, camera.xrotation);
		view = m4.yRotate(view, camera.yrotation);
		view = m4.translate(view, -camera.coords.x, -camera.coords.y, -camera.coords.z);
		shader.use();
		shader.uniform1f("u_timer", timer);
		
		let saturation = 1.0;//Math.sin(timer)*0.5+0.5;
		shader.uniform3f("u_fogColor", 0.2,0.4,0.6,1.0);
		shader.uniformMat4("u_proj", matrix);
		shader.uniformMat4("u_view", view);
		shader.uniform1f("u_saturation", saturation);
		timer += delta;
		//gl.clearColor(0.3,0.4,0.5,0.9);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		let mid = (0.2+0.4+0.6) * 0.33333;
		gl.clearColor(
		0.2*saturation+mid*(1.0-saturation),
		0.4*saturation+mid*(1.0-saturation),
		0.6*saturation+mid*(1.0-saturation),
		1.0);
		gl.viewport(0,0, canvas.width, canvas.height);
		gl.bindTexture(gl.TEXTURE_2D, noise_texture.gltexture);
		
		for (let i = 0; i < chunks.w*chunks.h; i++){
			let chunk = chunks.chunks[i];
			if (chunk == null)
				continue;
			let mesh = chunks.meshes[i];
			if (mesh == null)
				continue;
			let gx = (chunk.x+0.5) * chunk.w - camera.coords.x;
			let gz = (chunk.z+0.5) * chunk.d - camera.coords.z;
			
			let l = Math.sqrt(gx*gx + gz*gz);
			gx /= l;
			gz /= l;
			
			if (camera.dir.x * gx + camera.dir.z * gz > 0.1 || l < 64){
				shader.uniformMat4("u_model", m4.translation(chunk.x*chunk.w,chunk.y*chunk.h,chunk.z*chunk.d));
				gl.disable(gl.CULL_FACE);
				mesh.doubleside.render(shader);
				gl.enable(gl.CULL_FACE);
				mesh.oneside.render(shader);
			}
		}
		
		shader.uniformMat4("u_model", m4.translation(0,0,0));
		
		if (selectedBlockX != undefined){
			gl.bindTexture(gl.TEXTURE_2D, border_texture.gltexture);
			batch.box(selectedBlockX+0.5, selectedBlockY+0.5, selectedBlockZ+0.5, 1.02,1.02,1.02, 0.1,0.1,0.1, 1.0);
			/*batch.sprite(
			selectedBlockX+0.5, 
			selectedBlockY+2.0, 
			selectedBlockZ+0.5, 
			1.0,1.0, 
			0,0,1,1,
			0,0,1,1, camera);*/
			batch.flush(shader);
		}
		gl.bindTexture(gl.TEXTURE_2D, blank_texture.gltexture);
		batch.box(camera.coords.x+camera.rdir.x*0.1,
		camera.coords.y+camera.rdir.y*0.1,
		camera.coords.z+camera.rdir.z*0.1,
		0.001,0.001,0.001, 0,0,0,1,
		);
		batch.flush(shader);
		
		events.dx = 0;
		events.dy = 0;
		events.lmb = false;
		events.rmb = false;
		if (camera.body){
			events.space = false;
		}
		gl.flush();
		
		clear2d();
		window.requestAnimationFrame(onTick);
	}
	draw_progress('propagating lights..');

	window.requestAnimationFrame(onTick);
	//setInterval(onTick, 8);
}
draw_progress('loading..');
setTimeout(main, 0)