_ = require 'lodash'
Slide = require './slide'
path = require 'path'
fs = require 'fs'
uploadDir = path.resolve path.join __dirname, 'public/content'
fs.mkdirSync uploadDir if not fs.existsSync uploadDir
class User
  constructor: (data) ->
    if data.slides?
      data.slides = data.slides.map (s) -> new Slide s
    @data = _.defaults({
      username: null
      password: null
      slides: []
      needsReset: false
      admin: false
    }, data)

  toJSON: ->
    @data

  deleteSlide: (id, cb) ->
    if id > 0 and id < @data.slides.length
      @data.slides.splice id
      return cb null
    return cb "No slide with ID #{id}"

  addSlide: (data) ->
    name = data.fileName
    i = 1
    while fs.existsSync uploadDir
      name = req.file.originalname.slice(0,
          req.file.originalname.lastIndexOf('.')) + "_" + i + req.file.originalname.slice(req.file.originalname.lastIndexOf('.'))

    fs.renameSync data.filePath, path.join uploadDir, name
    @data.slides.push(new Slide data)

module.exports = User