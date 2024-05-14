#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uWindDirection;
uniform float uWindStrength;

varying vec2 vTextureCoord;

void main() {
    vec3 displacedPosition = aVertexPosition + uWindDirection * uWindStrength;
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(displacedPosition, 1.0);

    vTextureCoord = aTextureCoord;
}
