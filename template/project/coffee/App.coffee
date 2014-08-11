#import core.Core
#import core.templates.Three
class App extends Three
    constructor: ->
        super()

    init: ->

        geometry = new THREE.PlaneGeometry 500, 500, 10, 10 
        material = new THREE.MeshPhongMaterial { wireframe: true }
        
        @plane = new THREE.Mesh(geometry, material)
        @plane.rotation.x -= Math.PI*.5
        @scene.add @plane
       
       
        TweenMax.to @camera.position, 1, { z: 500, y: 100, ease: Quint.easeInOut, onComplete: =>  
            console.log '__NAMESPACE__'
        }

    update: ->
        @stats.begin()

        #your awesome code here

        @stats.end()
        null
