module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({

    clean: ['dist/*'],

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: ['application.scss'],
          dest: 'dist/styles',
          ext: '.css'
        }]
      }
    },

    watch: {
      js: {
        files: 'app/js/**/*.js',
        options: {
          livereload: true
        }
      },
      css: {
        files: 'app/styles/*.scss',
        tasks: 'sass',
        options: {
          livereload: true
        }
      }
    }
  });
};
