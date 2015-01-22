module.exports = function(config){
  config.set({
    // 下面files里的基础目录
    basePath : '../',
    // 测试环境需要加载的JS信息
    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],
    // 是否自动监听上面文件的改变自动运行测试
    autoWatch : true,
    // 应用的测试框架
    frameworks: ['jasmine'],
    // 用什么环境测试代码,这里是chrome`
    browsers : ['Chrome'],
    // 用到的插件,比如chrome浏览器与jasmine插件
    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],
    // 测试内容的输出以及导出用的模块名
    reporters: ['progress', 'junit'],
    // 设置输出测试内容文件的信息
    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
  });
};