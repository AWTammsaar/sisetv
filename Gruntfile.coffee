module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"
    clean:
      main:
        ["dist/**/*"]
      fast:
        ["dist/{/,routes/,bin/,sourcemap/}*{.js,.js.map}"]
    coffee:
      main:
        files: [
          expand: true,
          src: ["{bin,routes,app}/*.coffee"],
          dest: "dist/",
          ext: ".js"
        ]
        options:
          sourceMap: true
          sourceMapDir: "dist/sourcemap"
    copy:
      main:
        files: [
          expand: true,
          src: ["public/**", "views/**", "node/**", "START.cmd", "INSTALL.cmd", "package.json", "LICENSE.txt", "!public/content/**"],
          dest: "dist/"
        ]
      fast:
        files: [
          expand: true,
          src: ["public/**", "views/**", "START.cmd", "INSTALL.cmd", "package.json", "LICENSE.txt", "!public/content/**"],
          dest: "dist/"
        ]


  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.registerTask 'default', ['clean:main', 'coffee', 'copy:main']
  grunt.registerTask 'fast', ['clean:fast', 'coffee', 'copy:fast']