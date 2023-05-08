export default /* glsl */`
//uniform sampler2D uTexture;  
uniform float uTime;
//uniform float uRadius;
uniform float uDisplacement;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vDisplacement; 


void main() {

    /*vec2 uv = vUv;
    uv -= vec2(0.5);
    uv *= 2.0;*/
    //efecto fresnel
    /*vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = 1.0 - dot(viewDirection, vNormal);*/
    //vec4 color = vec4( 1.0, 1.0, 0.0, 1.0 );
    //linea
    //vec3(step(0.99, 1.0 - abs(vUv.x - 0.5)))

    //circulo
    //vec3(step(0.2, length(vUv - 0.5)))
    // vec3(drawCircle(vUv, vec2(0.5), uRadius))
    //vec3(step(0.9, 1.0 - sdBox(vUv - 0.5, vec2(0.15))))

    //noise shader
    //vec3(noise(vPosition * 10.0))

    //texture and desaturation
    /*const vec3 DESATURATE = vec3(0.2126, 0.7152, 0.0722);
    vec3 color = texture2D(uTexture, vUv).xyz;
    float finalColor = dot(DESATURATE, color);*/

	gl_FragColor = vec4(vec3(vPosition), 1);
}
`