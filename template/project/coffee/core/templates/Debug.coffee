class Debug
    constructor: ->
        @stats = new Stats()
        @stats.setMode 0

        @stats.domElement.style.position = 'absolute'
        @stats.domElement.style.top = '0'
        @stats.domElement.style.left = '0'
        document.body.appendChild @stats.domElement

        @gui = new dat.GUI()