'use strict'

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)
  grunt.initConfig({
    uglify: {
      dist: {
        options: {
          sourceMap: true
        },
        src: 'dist/modlog.js',
        dest: 'dist/modlog.min.js'
      }
    },
    browserify: {
      dist: {
        options: {
          ignore: ['chalk']
        },
        files: {
          'dist/modlog.js': ['src/modlog.js']
        }
      }
    }
  })
  grunt.registerTask('default', ['browserify:dist', 'uglify:dist'])
}
