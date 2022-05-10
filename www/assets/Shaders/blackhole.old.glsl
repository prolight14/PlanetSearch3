// precision mediump float;

// uniform float time;
// uniform vec2 resolution;
// uniform sampler2D iChannel0;

// varying vec2 fragCoord;

// #define iTime time
// #define iResolution resolution

// void mainImage(out vec4 fragColor, in vec2 fragCoord)
// {
//     vec2 uv = fragCoord.xy / resolution.xy;

//     vec3 col = texture2D(iChannel0, uv).rgb;

//     col = vec3(0.32, 0.0, 0.823);

//     fragColor = vec4(col, 0.4);
// }

// void main(void)
// {
//     mainImage(gl_FragColor, fragCoord.xy);
// }

precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
// uniform sampler2D iChannel0;

// varying vec2 fragCoord;

#define iTime uTime
#define iResolution uResolution

// Be gentle on this one
// float strength = 0.01;

// float sq(float x) 
// {
//     return x * x;
// }

// float shelf_curve(float x) 
// {
//     // Simple parabola. Could use a smoothstep instead?
//     return clamp(1.0 - sq(2.0 * x), 0.0, 1.0);
// }

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    // vec2 uv = fragCoord / iResolution.xy;
    // vec2 uv_c = fragCoord / iResolution.xx;

    // vec2 hole = vec2(0.5, 0.29);

    // // Get direction and distance to the black hole center
    // vec2 diff = hole - vec2(uv_c.x, uv_c.y);
    // float d = length(diff);
    // vec2 dir = normalize(diff);

    // // This is a 0..1 value that will nullify displacement around the bounds of the effect,
    // // for a seamless transition between the effect's area and the unaffected world pixels.
    // float shelf = shelf_curve(length(uv_c - hole));

    // // Calculate displacement amount
    // float displacement = strength / (d * d + 0.01);
    
    // vec2 movement = vec2(1.0, 1.0);

    // // Calculate distorted screen-space texture coordinates
    // vec2 place = uv + dir * movement * (displacement * shelf);

    // // Output pixels from the screen using distorted UVs
    // // vec3 col = texture2D(iChannel0, place).rgb;
    // // fragColor = vec4(col, 1.0);

    vec4 col = texture2D(iChannel0, uv).rgba;
    // fragColor = col;
    fragColor = vec4(0.3, 0.8, 0.0, col.a);
}

void main(void)
{
    mainImage(gl_FragColor, gl_FragCoord.xy);
}