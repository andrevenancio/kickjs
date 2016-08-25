var config              = {};

// folders
config.tmp              = '.tmp';
config.production       = 'build';
config.source           = './source';

// in production
config.isProduction     = process.env.NODE_ENV === 'production';

// build directories
config.buildBase        = config.isProduction ? config.production : config.tmp
config.build            = config.buildBase;

// styles
config.styles           = {};
config.styles.src       = config.source + '/styles/main.sass';
config.styles.dest      = config.build + '/css';
config.styles.watch     = config.source + '/styles/**/*';

// pages
config.pages            = {};
config.pages.src        = config.source + '/pages/index.hbs';
config.pages.dest       = config.build;
config.pages.watch      = config.source + '/pages/**/*';
config.pages.partials   = config.source + '/pages/partials';

// scripts
config.scripts          = {};
config.scripts.src      = config.source + '/scripts/index.js';
config.scripts.dest     = config.build + '/js';
config.scripts.watch    = config.source + '/scripts/**/*';

// statics
config.static          = {};
config.static.src      = config.source + '/static';
config.static.dest     = config.build;
config.static.watch    = config.source + '/**/*';

module.exports          = config;
