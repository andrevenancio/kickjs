###
__TITLE__
###
class App

    fov: 75
    near: 1
    far: 10000

    constructor: ->

        @scene = new THREE.Scene()

        @camera = new THREE.PerspectiveCamera @fov, window.innerWidth / window.innerHeight, @near, @far
        @camera.position.z = 1000

        # @controls = new THREE.OrbitControls @camera

        @renderer = new THREE.WebGLRenderer { antialias: true, alpha: false }
        @renderer.setSize window.innerWidth, window.innerHeight
        # @renderer.setPixelRatio window.devicePixelRatio

        document.body.appendChild @renderer.domElement

        window.addEventListener 'resize', @onResize, false

        @addLights()
        @initPass()
        @onResize()
        @init()
        @update()

    addLights: ->
        @ambient = new THREE.AmbientLight 0x444444
        @scene.add @ambient

        @light = new THREE.SpotLight 0xaaaaaa, 1, 0, Math.PI / 2, 1
        @light.position.set 0, 1500, 1000
        @light.target.position.set 0, 0, 0

        @scene.add @light
        null

    initPass: ->
        @composer = new WAGNER.Composer @renderer, { useRGBA: false }

        @bloomPass = new WAGNER.MultiPassBloomPass()
        @bloomPass.params.blurAmount = 2
        @bloomPass.params.applyZoomBlur = true
        @bloomPass.params.zoomBlurStrength = 1

        gui = new dat.GUI()
        gui.add( @bloomPass.params, 'blurAmount' ).min(0).max(2)
        # gui.add( @bloomPass.params, 'applyZoomBlur' )
        gui.add( @bloomPass.params, 'zoomBlurStrength' ).min(0).max(2)
        # gui.add( @bloomPass.params, 'useTexture' )
        gui.open()
        null

    init: ->
        geometry = new THREE.BoxGeometry 200, 200, 200
        material = new THREE.MeshBasicMaterial { color: 0x00ffff, wireframe: false }

        @mesh = new THREE.Mesh geometry, material
        @scene.add @mesh
        null

    onResize: =>
        w = window.innerWidth
        h = window.innerHeight

        @renderer.setSize w, h
        @camera.projectionMatrix.makePerspective @fov, w / h, @near, @far

        @resizePass()
        null

    resizePass: ->
        @composer.setSize @renderer.domElement.width, @renderer.domElement.height
        @bloomPass.params.zoomBlurCenter.set .5 * @composer.width, .5 * @composer.height
        @glowTexture = WAGNER.Pass.prototype.getOfflineTexture @composer.width, @composer.height, false
        null

    update: =>
        requestAnimationFrame @update

        @mesh.rotation.x += 0.01
        @mesh.rotation.y += 0.02

        @renderPass()
        null

    renderPass: ->
        @composer.reset()

        if @bloomPass.params.useTexture

            @scene.overrideMaterial = @glowMaterial
            @composer.render @scene, @camera, null, @glowTexture

            @scene.overrideMaterial = null
            @composer.render @scene, @camera

            @bloomPass.params.glowTexture = @glowTexture
        else
            @composer.render @scene, @camera

        @composer.pass @bloomPass
        @composer.toScreen()
        null
