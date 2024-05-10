attribute vec3 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

uniform vec3 uWindDirection;
uniform float uWindStrength;

void main() {
    vec3 displacedPosition = aVertexPosition + uWindDirection * uWindStrength;

    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(displacedPosition, 1.0);
}