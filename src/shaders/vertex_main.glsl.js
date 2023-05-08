export default /* glsl */`
vec3 coords = normal;
vec3 noisePattern = vec3(noise(coords));
//coords += noise(coords);
float pattern = wave(noisePattern);

//varyings
//vPosition = position;
//vNormal = normal;
//vUv = uv;

vDisplacement = pattern;

// para cambiar la fuerza del shader
float uDisplacement = vDisplacement / 2.0; 

transformed += normalize(objectNormal) * uDisplacement;
`;