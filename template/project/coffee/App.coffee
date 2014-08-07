#import core.Core
#import core.templates.Three
class App extends Three
    constructor: ->
        super()

    init: ->
        console.log '__NAMESPACE__'

    update: ->
        @stats.begin()

        #your awesome code here

        @stats.end()
