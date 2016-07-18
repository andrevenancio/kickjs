Settings = {}

Settings.NUMBER = 0
Settings.COLOR = 1
Settings.BOOLEAN = 2

Settings.WIDTH = 100
Settings.HEIGHT = 100
Settings.DEPTH = 100

Settings.camera = {
    fov: 50
    near: 1
    far: 1000
}

Settings.renderer = {
    antialias: false
    alpha: false
}

Settings.postProcessing = true

Settings.GUI =
    Stats:
        stats:
            type: Settings.BOOLEAN
            value: false

    # noise
    Noise:
        amount:
            type: Settings.NUMBER
            value: 0.046
            min: 0
            max: 0.3
        speed:
            type: Settings.NUMBER
            value: 0
            min: 0
            max: 1

    # SSAO
    SSAO:
        debug:
            type: Settings.BOOLEAN
            value: false
        clamp:
            type: Settings.NUMBER
            value: 0.52
            min: 0
            max: 1
        influence:
            type: Settings.NUMBER
            value: 3.9
            min: 0
            max: 6
