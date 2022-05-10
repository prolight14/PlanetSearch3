import SpaceScene from "../../scenes/space/SpaceScene";
import SpaceGameObject from "./SpaceGameObject";

// Reference: https://godotengine.org/qa/13023/shaders-how-does-one-create-blackhole-effect-using-shaders

export default class Blackhole extends SpaceGameObject
{
    constructor(scene: SpaceScene, x: number, y: number)
    {
        super(scene, x, y, "crest");

        this.setStatic(true);
        this.body.collisionFilter = {
            'group': -1,
            'category': 2,
            'mask': 0,
        };

        this.setPipeline("blackhole");
    }
}


/*




float random(vec2 p)
{
    vec2 K1 = vec2(23.14069263277926, 2.665144142690225);
    return fract(cos(dot(p, K1)) * 12345.6789);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2 uv = fragCoord / iResolution.xy;
    vec2 uv_c = fragCoord / iResolution.xx;

    vec2 holeCenter = vec2(0.5, 0.3);
    float holeRadius = 0.01;
    float holeRadiusSquared = holeRadius * holeRadius;
    
    vec3 col = vec3(0.23, 0.2, 0.3);
    
    float dx = holeCenter.x - uv_c.x;
    float dy = holeCenter.y - uv_c.y;
    if(dx * dx + dy * dy < holeRadius)
    {
        col = vec3(0.0, 0.0, 0.0);
    }

    for(int i = 0; i < 500; i++)
    {
        float p_startAngle = random(vec2(float(i), float(i))) * 360.0;
        const float p_angleSpeed = 7.0;
        const float p_distSpeed = 0.8;
        const float p_maxRadius = 0.05;
        
        float s_iTime = iTime * 0.5 + float(i) * 78.4;

        

        float p_angle = p_startAngle + s_iTime * p_angleSpeed;
        float p_dist = (1.0 - mod(s_iTime * p_distSpeed, 1.0));
        
       //p_dist *= (1.0 - abs(p_dist - holeRadius) * 1.0);
        
        float p_radius = p_maxRadius - mod(s_iTime * p_distSpeed * p_maxRadius, p_maxRadius);

        vec2 p_displacement = vec2(cos(p_angle) * p_dist, sin(p_angle) * p_dist);
        vec2 particle1 = holeCenter + p_displacement;

        float p_radiusSquared = p_radius * p_radius;
        dx = uv_c.x - particle1.x;
        dy = uv_c.y - particle1.y;
        if(dx * dx + dy * dy < p_radiusSquared)
        {
            col = vec3(0.12, 0.0, 0.23);
        }
    }
    
    // Output to screen
    fragColor = vec4(col, 1.0);
}




*/


/*





precision mediump float;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    vec2 displace = vec2(0.0, 0.0);

    float dx = (0.5 - uv.x) * (iResolution.x / iResolution.y);
    float dy = 0.5 - uv.y;
    //float dSq = dx * dx + dy * dy;
    //float rd = 0.2;

    float theta = (atan(dy, dx) + 18.0 + iTime);
    float theta2 = theta;//(atan(dy, dx) + 90.0 + iTime* 0.2);

    // vec2 inputOCol = vec2(0.5 + sin(theta) * rd, 0.5 + cos(theta) * rd);

    // float theta = 

   // vec2 inputOCol = vec2(uv.x + sin(theta) * rd - sin(theta2) * rd, uv.y + cos(theta) * rd - cos(theta2) * rd);
   // vec3 outerCol = texture(iChannel0, inputOCol).rgb;
    
    vec3 outerCol2 = texture(iChannel0, vec2(uv.x + sin(theta2), uv.y + cos(theta))).rgb; 
     
    //vec2 uv_offset = vec2((sin((uv.x + (iTime * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (iTime * 0.2)) * 32.0) * 0.01)); 
     
    vec3 col = texture(iChannel0, uv).rgb;
  
    //if(dSq > 0.05 && dSq < 0.1)
    {
        //if(abs(outerCol.r - outerCol2.r) > 0.25 &&
        //   abs(outerCol.g - outerCol2.g) > 0.25 &&
        //   abs(outerCol.b - outerCol2.b) > 0.25) 
       // {
         //   col = outerCol;
       // }
        //else
        ///{
          col = outerCol2;
       // }


//        col = (outerCol + outerCol2) * 0.5;
    }
    
    // Output to screen
    fragColor = vec4(col, 1.0);
}



*/






































/*








void mainImage(out vec4 fragColor, in vec2 fragCoord)
{   
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / iResolution.xy;
    vec2 uv_c = fragCoord / iResolution.xx;

    float holeRadius = 0.1;
    float holeRadiusSquared = holeRadius * holeRadius;
    vec2 hole = vec2(0.5, 0.29);
    
    float dx = uv_c.x - hole.x;
    float dy = uv_c.y - hole.y;
    
    float currentAngle = atan(dy, dx);
    float displaceAngle = 23.0;
    float newAngle = currentAngle + displaceAngle;
    
    vec2 displace = vec2(0.0, 0.0);
    
    displace.x += cos(newAngle) * 0.1;// + sin(360.0 * (iTime * 0.01)) * 0.1;// * (0.167 + mod(iTime * 0.1, 1.0));
    displace.y += sin(newAngle) * 0.1;// + cos(360.0 * (iTime * 0.01)) * 0.1;// * (0.167 + mod(iTime * 0.1, 1.0));

    
    //float displaceAngle = 0.0;//12.0;
    
    //displace.x += (1.0 - cos(uv.x)) * 0.5;
    //displace.y += (1.0 - sin(uv.y)) * 0.5;

    // Time varying pixel color
    vec3 col = texture(iChannel0, uv + displace).rgb;
    
    ///dx = uv_c.x - hole.x;
    //dy = uv_c.y - hole.y;
    
    //if(dx * dx + dy * dy < holeRadiusSquared)
   // {
   //     col = vec3(0.0, 0.0, 0.0);
   // }

    // Output to screen
    fragColor = vec4(col, 1.0);
}












*/



















/*












void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord / iResolution.xy;
    vec2 uv_c = fragCoord / iResolution.xx;

    vec2 hole = vec2(0.5, 0.29);
    float holeRadius = 0.2;
    float holeRadiusSquared = holeRadius * holeRadius;

   
    vec2 offset = vec2(0.0, 0.0);


    vec2 diff = hole - uv_c;
    float lengthSquared = diff.x * diff.x + diff.y * diff.y;
    
    // if(lengthSquared < holeRadiusSquared)
    {
        float d = sqrt(lengthSquared);
        vec2 dir = normalize(diff);
        
        float bend = 0.05;
        
        float angle = ((d * bend) * 360.0 / holeRadius);// + iTime * 7.4;// + iTime * 0.1;
        
        float bendA = 0.19 + (float(iTime) % 0.5);
        
        vec2 dirOffset = vec2(cos(angle) * bendA, sin(angle) * bendA);
     
        offset = dirOffset * d;
    }

    // Time varying pixel color
    vec3 col = texture(iChannel0, uv + offset).rgb;
    
    // Output to screen
    fragColor = vec4(col, 1.0);
}






*/