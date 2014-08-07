Function::property = (prop, desc) ->
    Object.defineProperty @prototype, prop, desc

#import core.MathUtils
#import core.EventDispatcher