({
    appDir: "./",
    baseUrl: "js",
    dir: "../publish",
    optimize: "uglify",
    optimizeCss: "standard.keepLines",
    // mainConfigFile: "js/main.js",
    removeCombined: true,
    paths: {
        jquery: 'lib/jquery',
        bootstrap: 'lib/bootstrap',
        underscore: 'lib/underscore',
        moment: 'lib/moment',
        common: 'lib/common',
        validator: 'lib/validator'
    },
    shim: {
        'common': ['jquery', 'bootstrap'],
        'validator': ['jquery', 'common']
    },
    // fileExclusionRegExp: /^\./,
    modules: [{
        name: "user/app",
        exclude: [
            "bootstrap",
            "lib/angular",
            'lib/pager',
            'lib/underscore',
            'lib/validator',
            'moment',
            'lib/common'
        ]
    }, {
        name: "news/app",
        exclude: [
            "bootstrap",
            "lib/angular",
            'lib/pager',
            'lib/underscore',
            'lib/validator',
            'moment',
            'lib/common'
        ]
    }]
})