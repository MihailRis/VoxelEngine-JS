// shaders
var vertCode = `
attribute vec3 coords;
attribute vec4 texCoord;
attribute vec4 color;

varying vec4 v_color;
varying vec2 v_texCoord;
varying float v_fog;
varying vec2 v_light;

uniform mat4 u_proj;
uniform mat4 u_view;
uniform mat4 u_model;

uniform float u_timer;

void main(void) {
	v_color = color*vec4(1.0,0.9,0.8,1.0);
	float t = 1.0 - v_color.a;
	
	v_color.a = 1.0;
	vec4 modelPos = u_model * vec4(coords, 1.0);
	modelPos.x += sin((u_timer + modelPos.x * 0.2)*2.0) * 0.2 * t;
	vec4 position = u_proj * u_view * modelPos;
	v_fog = min(1.0, position.z*0.005);
	v_texCoord = texCoord.xy;
	v_light = texCoord.ba;
	gl_Position = position;
}`;

var fragCode = `
varying mediump vec4 v_color;
varying mediump vec2 v_texCoord;
varying mediump float v_fog;
varying mediump vec2 v_light;

uniform sampler2D u_texture0;
uniform highp float u_timer;
uniform mediump float u_saturation;
uniform mediump vec3 u_fogColor;

void main(void) {
	mediump float t = v_fog;
	mediump vec4 texColor = texture2D(u_texture0, v_texCoord);
	if (texColor.a < 0.5)
		discard;
	mediump float s = 1.0;//sin(u_timer * 0.1) * 0.5 + 0.5;
	mediump vec4 skyLight = vec4(v_light.y*s,v_light.y*s,v_light.y*s,1.0);
	mediump vec4 color = v_color * (vec4(v_light.x,v_light.x*0.7,v_light.x*0.4, 1.0)+skyLight) * texColor * (1.0-t) + vec4(u_fogColor*t, v_color.a);
	mediump float mid = (color.r+color.g+color.b)*0.333333;
	mid *= 1.0-(1.0-pow(max(1.0, v_light.x+v_light.y*s),1.0));
	color.r = color.r * u_saturation + mid * (1.0-u_saturation);
	color.g = color.g * u_saturation + mid * (1.0-u_saturation);
	color.b = color.b * u_saturation + mid * (1.0-u_saturation);
	gl_FragColor = color;
}`;


var atlas,noise_texture,blank_texture,border_texture;
function initialize_assets() {
	// textures
	var res = 16;
	atlas = new Atlas(res, [
		tex_noise_rgb(res,res, 0.05, 0.2), 
		tex_noise_rgb(res,res, 0.5, 0.5), 
		create_test_texture(res,res), 
		create_test_texture(res,res), 
		tex_grass(res,res),
		create_border_texture(res,res),
		create_leaves_texture(res,res, 0.05, 0.5, 0.33),
		]);
	noise_texture = atlas.texture;//new Texture(tex_grass(res,res), res,res, gl.RGBA);//new Texture(noise_rgb(res,res, 0.05, 0.2), res,res, gl.RGB);
	blank_texture = new Texture(create_test_texture(4,4), 4,4, gl.RGBA);
	border_texture = new Texture(create_border_texture(32,32), 32,32, gl.RGBA);
}