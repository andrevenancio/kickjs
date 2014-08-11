#import core.templates.Debug
class Three extends Debug

    ambient:
        color: 0xffffff
    directional:
        color: 0xffffff
        intensity: 0.125
    fog:
        color: 0x000000
        near: 3500,
        far: 15000

    constructor: ->
        super()

        @renderer = new THREE.WebGLRenderer { antialias: true, alpha: true }
    
        @canvas = @renderer.domElement
        document.body.appendChild @canvas

        @scene = new THREE.Scene()
        @scene.fog = new THREE.Fog @fog.color, @fog.near, @fog.far
        @scene.fog.color.setHSL 0.51, 0.4, 0.01
        
        @camera = new THREE.PerspectiveCamera 40, 4/3, 1, 15000
        @camera.lookAt @scene.position
        @scene.add @camera

        @light_ambient = new THREE.AmbientLight @ambient.color
        @light_ambient.color.setHSL 0.1, 0.3, 0.2
        @scene.add @light_ambient

        @light_directional = new THREE.DirectionalLight @directional.color, @directional.intensity
        @light_directional.position.set(0, -1, 0).normalize()
        @scene.add @light_directional

        @light_directional.color.setHSL 0.1, 0.7, 0.5

        @controls = new THREE.OrbitControls @camera, @renderer.domElement
        @controls.damping = 0.2;
       
        window.addEventListener 'resize', @onResize, false

        @init()

        @onResize()
        @render()

    onResize: (e) =>
        @width = window.innerWidth
        @height = window.innerHeight

        @aspect = @width / @height

        @renderer.setSize @width, @height
        @camera.aspect = @aspect
        @camera.updateProjectionMatrix()

        @resize @width, @height
        null

    render: =>
        @update()
        
        @renderer.render @scene, @camera
        requestAnimationFrame @render       
        null

    morphColorsToFaceColors: (geometry) ->
        if geometry.morphColors && geometry.morphColors.length
            colorMap = geometry.morphColors[0]

            for i in [0...colorMap.colors.length]
                geometry.faces[i].color = colorMap.colors[i]
                geometry.faces[i].color.offsetHSL 0, 0.3, 0
        null

    init: ->
        null

    update: ->
        null
        
    resize: (width, height) ->
        null
