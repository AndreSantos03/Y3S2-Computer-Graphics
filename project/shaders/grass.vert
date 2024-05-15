attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord; 

uniform float timeOscilation;
uniform float windIntensity;
uniform float windAngle;



void main() {
    vTextureCoord = aTextureCoord;
    // values to intensify the effects
    float xMultiplier = 0.5;
    float zMultipler = 3.0;
    float xOffset = timeOscilation * sin(windAngle) * windIntensity * 0.5 * aVertexPosition.y;

    //we multiply by 2 to intensify the z wind effect
    float yOffset = timeOscilation * cos(windAngle) * windIntensity * 2.0 * aVertexPosition.y;
    vec3 displacement = vec3(xOffset, 0, yOffset);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + displacement, 1.0);
}
