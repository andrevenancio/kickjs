#import core.templates.Debug
class Three extends Debug

    ambient:
        color: 0x000000
    directional:
        color: 0xffffff
        intensity: 1.0
    flash:
        connected: false
        color: 0xdddddd
        intensity: 0.3
        distance: 0.0
    fog:
        color: 0x000000
        near: 1,
        far: 1000

    constructor: ->
        super()

        @renderer = new THREE.WebGLRenderer()
    
        @canvas = @renderer.domElement
        document.body.appendChild @canvas

        @scene = new THREE.Scene()
        @scene.fog = new THREE.Fog @fog.color, @fog.near, @fog.far
        
        @camera = new THREE.PerspectiveCamera 45, 4/3, 1, 3000
        @camera.lookAt @scene.position
        @scene.add @camera

        @light_ambient = new THREE.AmbientLight @ambient.color
        @scene.add @light_ambient

        @light_directional = new THREE.PointLight 0xffffff
        @light_directional.position.set 0, 100, 0
        @scene.add @light_directional

        @light_camera = new THREE.SpotLight @flash.color, @flash.intensity, @flash.distance
        if not @flash.connected
            @light_camera.intensity = 0
        @scene.add @light_camera

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
        
        @light_camera.position.copy @camera.position

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
