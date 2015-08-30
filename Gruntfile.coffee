module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"
    clean:
      main:
        ["dist/{/,routes/,bin/}*.js"]
    coffee:
      main:
        files: [
          expand: true,
          src: ["{bin,routes}/*.coffee", "*.coffee", "!Gruntfile.coffee"],
          dest: "dist/",
          ext: ".js"
        ]
    copy:
      main:
        files: [
          expand: true,
          src: ["public/**", "views/**", "node/**", "START.cmd", "INSTALL.cmd"],
          dest: "dist/"
        ]
      fast:
        files: [
          expand: true,
          src: ["public/**", "views/**", "START.cmd", "INSTALL.cmd"],
          dest: "dist/"
        ]


  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.registerTask 'default', ['clean:main', 'coffee', 'copy:main']
  grunt.registerTask 'fast', ['clean', 'coffee', 'copy:fast']