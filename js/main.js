require.config({
    urlArgs: "ver=" + (new Date()).getTime(),       //just for dev purposes to eliminate caching of files.
    
    paths: {
        jquery: 'libs/jquery-1.8.3',
        backbone: 'libs/backbone-0.9.9-min',
        underscore: 'libs/underscore-1.4.4-min',
        localStorage: 'libs/backbone.localStorage-min'
    },
    
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require(['controller/router'], function(Router) {
    Router.initialize();
});

