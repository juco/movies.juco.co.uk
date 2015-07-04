module.exports = function(config) {
  config.set({
    basePath: '../../',

    preprocessors: {
      'app/views/partial/**/*.html': 'ng-html2js'
   },

   files: [
     'vendor/angular/angular.js',
     'vendor/angular-route/angular-route.js',
     'vendor/angular-mocks/angular-mocks.js',
     'app/js/**/*.js',
     'test/unit/**/*-test.js',
     'app/**/*.html'
   ],

    ngHtml2JsPreprocessor: {
      moduleName: 'juco.movies.partials',
      stripPrefix: 'app'
    },

   autoWatch: true,

   frameworks: ['jasmine'],

   browsers: ['PhantomJS'],

   plugins: [
     'karma-phantomjs-launcher',
     'karma-jasmine',
     'karma-ng-html2js-preprocessor'
   ],

   reporters: ['progress']
  });
};
