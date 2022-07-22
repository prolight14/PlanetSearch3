precision mediump float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D iChannel0;

varying vec2 fragCoord;

void main(void) 
{
    vec2 uv = fragCoord.xy / resolution.xy;
    vec4 color = texture2D(iChannel0, uv);
    gl_FragColor = vec4(color.rgb, 1.0);
}