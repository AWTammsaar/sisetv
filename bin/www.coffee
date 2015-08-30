#!/usr/bin/env node

###
  Module dependencies.
###

app = require '../app'
debug = require('debug')('sisetv:server')
http = require 'http'

###
    Normalize a port into a number, string, or false.
###

normalizePort = (val) ->
  port = parseInt val, 10
  return val if isNaN port
  return port if port >= 0
  false

###
  Get port from environment and store in Express.
###

port = normalizePort process.env.PORT or '3000'
app.set 'port', port

###
  Create HTTP server.
###

server = http.createServer app

###
  Event listener for HTTP server "error" event.
###

onError = (error) ->
  if error.syscall != 'listen'
    throw error;
  switch error.code
    when 'EACCES'
      console.error "#{bind} requires elevated privileges"
      process.exit 1
    when 'EADDRINUSE'
      console.error "#{bind} is already in use"
      process.exit 1
    else
      throw error

###
  Event listener for HTTP server "listening" event.
###

onListening = () ->
  addr = server.address();
  bind = if typeof addr == 'string' then "pipe #{addr}" else "port #{addr.port}";
  debug('Listening on ' + bind);

###
  Listen on provided port, on all network interfaces.
###

server.listen port
server.on 'error', onError
server.on 'listening', onListening

bind = if typeof port == 'string' then "Pipe #{port}" else "Port #{port}"

# handle specific listen errors with friendly messages



