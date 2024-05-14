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

    float windFrequency = 2.0;
    float windSpeed = 0.5;

    vec2 windDirection = vec2(cos(windAngle), sin(windAngle));
    float offset = sin(aVertexPosition.y * windFrequency + timeFactor * windSpeed) * windIntensity;

    vec3 displacedPosition = aVertexPosition;
    displacedPosition.x += offset * windDirection.x;
    displacedPosition.z += offset * windDirection.y;

    //basic position
	// gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    
    gl_Position = uPMatrix * uMVMatrix * vec4(displacedPosition, 1.0);
    vTextureCoord = aTextureCoord;
}

