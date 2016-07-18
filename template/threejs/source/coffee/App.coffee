# import core/Settings
# import core/Three
class App extends Three

    constructor: ->
        super()

    start: ->
        @raf = requestAnimationFrame @render
        null

    stop: ->
        cancelAnimationFrame @raf
        @update()
        null

    resize: ->
        @update()
        null

    render: =>
        @raf = requestAnimationFrame @render
        @update();
        null

    init: ->
        @initDebug()
        @applyGuiChanges()
        @start()

        geometry = new THREE.BoxGeometry 30, 30, 30
        material = new THREE.MeshBasicMaterial { color: 0x00ffff }
        mesh = new THREE.Mesh geometry, material
        @scene.add mesh
        null

    initDebug: ->

        # stats
        @stats = new Stats()
        @stats.domElement.style.position = 'absolute'
        @stats.domElement.style.top = 0
        @stats.domElement.style.left = 0
        @stats.domElement.style.zIndex = 10000

        # render stats
        @rendererStats = new THREEx.RendererStats()
        @rendererStats.domElement.style.position = 'absolute'
        @rendererStats.domElement.style.left = 0
        @rendererStats.domElement.style.top = '48px'
        @rendererStats.domElement.style.zIndex = 10000

        @statsAdded = false

        gui = new dat.GUI()

        for name of Settings.GUI
            folder = gui.addFolder name

            for param of Settings.GUI[name]
                p = Settings.GUI[name][param]
                switch p.type
                    when Settings.NUMBER
                        folder.add p, 'value', p.min, p.max
                            .name param
                            .listen()
                            .onChange @applyGuiChanges
                    when Settings.COLOR
                        folder.addColor p, 'value'
                        .name param
                        .onChange @applyGuiChanges
                    when Settings.BOOLEAN
                        folder.add p, 'value'
                            .name param
                            .onChange @applyGuiChanges
        null

    applyGuiChanges: =>
        # stats
        if Settings.GUI.Stats.stats.value
            if @statsAdded is false
                @statsAdded = true
                document.body.appendChild @stats.domElement
                document.body.appendChild @rendererStats.domElement
        else
            if @statsAdded is true
                @statsAdded = false
                document.body.removeChild @stats.domElement
                document.body.removeChild @rendererStats.domElement

        # post production
        @ssao.uniforms.onlyAO.value = Settings.GUI.SSAO.debug.value
        @ssao.uniforms.aoClamp.value = Settings.GUI.SSAO.clamp.value
        @ssao.uniforms.lumInfluence.value = Settings.GUI.SSAO.influence.value

        @overlay.uniforms.amount.value = Settings.GUI.Noise.amount.value * window.devicePixelRatio
        @overlay.uniforms.speed.value = Settings.GUI.Noise.speed.value
        null


    update: =>
        super()
        @rendererStats.update @renderer
        @stats.update()
        null
