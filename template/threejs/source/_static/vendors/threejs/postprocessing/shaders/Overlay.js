THREE.Overlay = {

    uniforms: {
        'tDiffuse': { value: null },
        'ao': { type: 't', value: null },
        'amount': { value: 0.1 },
        'speed': { value: 0 },
        'time': { value: 0 },
        'ao_factor': { value: 0.5}
    },

    vertexShader: [
        'varying vec2 v_uv;',

        'void main() {',
        '   v_uv = uv;',
        '   gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
        '}'
    ].join( '\n' ),

    fragmentShader: [
        'uniform sampler2D tDiffuse;',
        'uniform float amount;',
        'uniform float speed;',
        'uniform float time;',
        'varying vec2 v_uv;',

        'float random(vec2 n, float offset ) {',
            'return .5 - fract(sin(dot(n.xy + vec2( offset, 0. ), vec2(12.9898, 78.233)))* 43758.5453);',
        '}',

        'void main() {',
        '   vec4 color = texture2D(tDiffuse, v_uv);',
        '   color += vec4( vec3( amount * random( v_uv, .00001 * speed * time ) ), 1. );',
        '   gl_FragColor = color;',
        '}'

    ].join( '\n' )

};
