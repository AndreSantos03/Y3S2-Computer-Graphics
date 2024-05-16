attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;



uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord; 

uniform float timeFactor;
uniform float windIntensity;
uniform float windAngle;




void main() {
    vTextureCoord = aTextureCoord;

    // values to intensify the effects
    float xMultiplier = 12.0;
    float zMultipler = 2.0;


    float frequency = 2.0;



    float timeOscilation = (sin(frequency * timeFactor) + 1.0) * 0.625 - 0.25;  //make it so this oscilates between 100 percent to the side of the wind and 25 on the other side on the "recoil" of the wind"

    float xOffset = timeOscilation * sin(windAngle) * windIntensity * xMultiplier * aVertexPosition.y;
    float zOffset = timeOscilation * cos(windAngle) * windIntensity * zMultipler * aVertexPosition.y;
    
    vec3 newPosition = vec3(aVertexPosition.x + xOffset, aVertexPosition.y,aVertexPosition.z + zOffset);

    gl_Position = uPMatrix * uMVMatrix * vec4(newPosition, 1.0);
}
