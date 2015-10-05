# import App
do me = ->
    args = [
        '\n %c __TITLE__ %c __DESCRIPTION__ \n\n',
        'background: #1A1A1A; color: #00ffff; font-size: x-large;',
        'background: #00ffff; color: #1A1A1A; font-size: x-large;'
    ]
    console.log.apply console, args
    window.app = new App()
    null
