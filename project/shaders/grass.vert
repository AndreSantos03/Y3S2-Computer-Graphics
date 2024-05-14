attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;


uniform vec3 uWindDirection;
uniform float uWindStrength;

void main() {
    vec3 displacedPosition = aVertexPosition + uWindDirection * uWindStrength;
    // gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(displacedPosition, 1.0);
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}