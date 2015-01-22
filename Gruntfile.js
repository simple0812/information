module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      foo: {
        files: [{
          src: ['public/js/user/*.js'],
          dest: 'public/js/user/user.js'
        }]
      },

      require: {
        files: [{
          src: ['public/js/lib/require.js', 'public/js/lib/jquery.js'],
          dest: 'public/js/dest/$require1.js'
        }]
      }
    },
    watch: {
      js: {
        files: [
          'app.js',
          'routers/**/*.js',
          'proxy/**/*.js',
          'models/**/*.js',
          'controllers/**/*.js'
        ],
        tasks: ['develop'],
        options: {
          nospawn: true
        }
      }
    },
    develop: {
      server: {
        file: 'app.js',
        nodeArgs: ['--debug']
      }
    },
    //不能正确运行
    requirejs: {
      main: {
        options: {
          appDir: "original",
          baseUrl: "js",
          dir: "../dist",
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
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-develop');
  grunt.registerTask('default', ['develop', 'watch']);
};