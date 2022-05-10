precision mediump float;

uniform sampler2D uMainSampler[%count%];

uniform vec2 uResolution;
uniform float uTime;

varying vec2 outTexCoord;
varying float outTexId;
varying vec4 outTint;

#define iResolution uResolution

float strength = 0.01;

float sq(float x) 
{
    return x * x;
}


float shelf_curve(float x) 
{
    // Simple parabola. Could use a smoothstep instead?
    return clamp(1.0 - sq(2.0 * x), 0.0, 1.0);
}

vec4 blackhole(sampler2D tex)
{
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    vec2 uv_c = gl_FragCoord.xy / iResolution.xx;

    vec2 hole = vec2(1.0);

    // Get direction and distance to the black hole center
    vec2 diff = hole - uv;
    float d = length(diff);
    vec2 dir = normalize(diff);

    // This is a 0..1 value that will nullify displacement around the bounds of the effect,
    // for a seamless transition between the effect's area and the unaffected world pixels.
    float shelf = shelf_curve(d);

    // Calculate displacement amount
    float displacement = strength / (d * d + 0.01);
    
    // Calculate distorted screen-space texture coordinates
    vec2 place = dir * (displacement * shelf);

    // Output pixels from the screen using distorted UVs
    vec3 col = texture2D(tex, place - vec2(-0.5)).rgb;

    return vec4(col, 1.0);
}

void main()
{
    vec4 col;

    %forloop%

    gl_FragColor = col;
}
