// original by Felix Turner / www.airtight.cc / @felixturner
// edited by andrevenancio.com for WAGNER
uniform sampler2D tInput;
uniform vec2 resolution;
varying vec2 vUv;

uniform float amount;
uniform float angle;

void main() {

    vec2 offset = amount * vec2( cos(angle), sin(angle));
    vec4 cr = texture2D(tInput, vUv + offset);
    vec4 cga = texture2D(tInput, vUv);
    vec4 cb = texture2D(tInput, vUv - offset);
    gl_FragColor = vec4(cr.r, cga.g, cb.b, cga.a);

}
