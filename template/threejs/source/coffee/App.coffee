###
__TITLE__
@author: Your Name [your-email@yourdomain.com]
###

class App
    
    constructor: ->
        console.log 'kickjs __TYPE__ template'

        @scene = new THREE.Scene()

        @camera = new THREE.PerspectiveCamera 75, window.innerWidth / window.innerHeight, 1, 10000
        @camera.position.z = 1000

        @renderer = new THREE.WebGLRenderer()
        @renderer.setSize window.innerWidth, window.innerHeight
        document.body.appendChild @renderer.domElement

        @init()
        @update()

    init: ->
        geometry = new THREE.BoxGeometry 200, 200, 200
        material = new THREE.MeshBasicMaterial { color: 0xff0000, wireframe: true }

        @mesh = new THREE.Mesh geometry, material
        @scene.add @mesh
        null

    update: =>
        requestAnimationFrame @update

        @mesh.rotation.x += 0.01
        @mesh.rotation.y += 0.02

        @renderer.render @scene, @camera

window.app = new App()