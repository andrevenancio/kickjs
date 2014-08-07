#import core.templates.Debug
class Three extends Debug

    constructor: ->
        super()

        @renderer = new THREE.WebGLRenderer()
        @canvas = @renderer.domElement
        document.body.appendChild @canvas

        @scene = new THREE.Scene()
        @scene.fog = new THREE.Fog 0x000000, 1, 700
        
        @camera = new THREE.PerspectiveCamera 45, 4/3, 1, 3000
        @camera.lookAt @scene.position
        @scene.add @camera

        @ambient = new THREE.AmbientLight 0x000000
        @scene.add @ambient

        @light = new THREE.PointLight 0xffffff
        @light.position.set 0, 500, 0
        @scene.add @light

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
