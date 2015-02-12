class EventDispatcher

    addEventListener: (type, listener) =>
        if @_listeners is undefined
            @_listeners = {}

        listeners = @_listeners
        if listeners[type] is undefined
            listeners[type] = []

        if listeners[type].indexOf(listener)is -1
            listeners[type].push(listener)
        null

    hasEventListener: (type, listener) =>
        return false if @_listeners is undefined

        listeners = @_listeners
        if listeners[type] isnt undefined and listeners[type].indexOf(listener) isnt -1
            return true
        else
            return false

    removeEventListener: (type, listener) =>
        return false if @_listeners is undefined

        listeners = @_listeners
        listenerArray = listeners[type]

        if listenerArray isnt undefined
            index = listenerArray.indexOf(listener)
            if index isnt -1
                listenerArray.splice(index, 1)
        null
  
    dispatchEvent: (event) =>
        return false if @_listeners is undefined

        listeners = @_listeners
        listenerArray = listeners[event.type]

        if listenerArray isnt undefined
            for i in [0...listenerArray.length]
                listenerArray[i].call(@, event)
        null