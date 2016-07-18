# import core/Settings
class Three

    WIDTH: 400
    HEIGHT: 300
    RATIO: window.devicePixelRatio

    constructor: ->

        # clock
        @clock = new THREE.Clock()

        # scene
        @scene = new THREE.Scene()

        # camera
        @camera = new THREE.PerspectiveCamera(
            Settings.camera.fov,
            @WIDTH / @HEIGHT,
            Settings.camera.near,
            Settings.camera.far
        )
        @camera.position.set 0, 0, Settings.DEPTH
        @camera.lookAt @scene.position

        # renderer
        @renderer = new THREE.WebGLRenderer {
            antialias: Settings.renderer.antialias
            alpha: Settings.renderer.alpha
        }
        @renderer.setPixelRatio @RATIO
        @renderer.setSize @WIDTH, @HEIGHT
        document.body.appendChild @renderer.domElement

        # controls
        @controls = new THREE.TrackballControls @camera, @renderer.domElement
        @controls.rotateSpeed = 1.0
        @controls.zoomSpeed = 1.0
        @controls.noZoom = false
        @controls.noPan = true
        @controls.staticMoving = false
        @controls.dynamicDampingFactor = 0.15
        @controls.minDistance = Settings.DEPTH / 1.5
        @controls.maxDistance = Settings.DEPTH * 1.9

        # PostProcessing
        if Settings.postProcessing

            @depthMaterial = new THREE.MeshDepthMaterial()
            @depthMaterial.depthPacking = THREE.RGBADepthPacking
            @depthMaterial.blending = THREE.NoBlending

            pars = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter
            }
            @depthRenderTarget = new THREE.WebGLRenderTarget @WIDTH, @HEIGHT, pars

            # Add pass to effect composer
            @composer = new THREE.EffectComposer @renderer, @renderTarget
            # render scene
            @composer.addPass(new THREE.RenderPass(@scene, @camera))

            # SSAO
            @ssao = new THREE.ShaderPass THREE.SSAO
            @ssao.uniforms["tDepth"].value = @depthRenderTarget.texture
            @ssao.uniforms['cameraNear'].value = Settings.camera.near
            @ssao.uniforms['cameraFar'].value = Settings.camera.far
            @composer.addPass @ssao

            # overlay
            @overlay = new THREE.ShaderPass THREE.Overlay
            @overlay.renderToScreen = true
            @composer.addPass @overlay

        # events
        window.addEventListener 'focus', @__start, false
        window.addEventListener 'blur', @__stop, false
        window.addEventListener 'resize', @__resize, false

        # start things up
        @init()
        @__resize()

    __start: (e) =>
        e.preventDefault()
        @start()
        null

    __stop: (e) =>
        e.preventDefault()
        @stop()
        null

    __resize: (e) =>
        @WIDTH = window.innerWidth
        @HEIGHT = window.innerHeight
        @updateRenderer()
        @updateCamera()
        @controls.handleResize()
        @resize()
        null

    start: -> null

    stop: -> null

    resize: -> null

    updateCamera: =>
        @camera.fov = Settings.camera.fov
        @camera.near = Settings.camera.near
        @camera.far = Settings.camera.far
        @camera.projectionMatrix.makePerspective Settings.camera.fov, @WIDTH / @HEIGHT, Settings.camera.near, Settings.camera.far
        null

    updateRenderer: =>
        @renderer.setSize @WIDTH, @HEIGHT

        if Settings.postProcessing
            @ssao.uniforms[ 'size' ].value.set @WIDTH * @RATIO, @HEIGHT * @RATIO
            @depthRenderTarget.setSize @WIDTH * @RATIO, @HEIGHT * @RATIO

            @composer.setSize @WIDTH * @RATIO, @HEIGHT * @RATIO
        null

    update: ->
        if Settings.postProcessing

            # Render depth into depthRenderTarget
            @scene.overrideMaterial = @depthMaterial
            @renderer.render(@scene, @camera, @depthRenderTarget, true)

            # Render renderPass and SSAO shaderPass
            @scene.overrideMaterial = null

            @composer.render()

            # update time
            @overlay.uniforms.time.value = @clock.getElapsedTime()
        else
            @renderer.render @scene, @camera
        @controls.update @clock.getDelta()
        null
