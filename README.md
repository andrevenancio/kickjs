# kickjs

kickjs is an ES6 boilerplate template system for quick prototyping.

It allows you to quickly start a new project simply by typing `kickjs` from your Terminal window.

You'll be prompted to type the projects `name` (mandatory) and `description` (optional).

You'll also be given an option to have all the npm dependencies installed for you. If you don't want to, you can always run `npm install` later.

## Installation
Make sure you have [node.js](http://nodejs.org/) installed.
```shell
npm install -g kickjs
```

## Template
The generated template already comes with a few libraries ([dat.gui.js](https://github.com/dataarts/dat.gui), [stats.js](https://github.com/mrdoob/stats.js), [microphysics.js](https://github.com/jeromeetienne/microphysics.js), [three.js](https://github.com/mrdoob/three.js) and [renderstats.js](https://github.com/jeromeetienne/threex.rendererstats))

You can add files/folders to the `source/static` folder, and it will be automatically copied to your destination folder.

Regardless of the number os scripts in your `source/static/vendors` folder, the only files that will be imported to `vendors.js` will be the ones specified in the `config.json`.

### Development & Production
The template runs `gulp`, however you shouldn't call the `gulp` scripts directly but instead use the `npm` scripts specified in you `package.json`.

They are `npm run dev` for development or `npm run build` for production.
