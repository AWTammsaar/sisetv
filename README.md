# SiseTV
Content management system for information displays in buildings. 

# Compiling
Compiling is handled by Grunt:
```
grunt 
```
This copies/compiles all the required files into the `dist/` folder.

There is also an additional Grunt task:
```
grunt fast
```
This does not copy Node.js files. It only recompiles the Coffeescript files.

# Running
For development, use the following command to start the server:
```
coffee bin/www.coffee
```
After compiling, you can use `START.cmd` to start the server.

# Usage
After starting the server, an admin account will be created for you. Navigate to `http://localhost:3000/admin` 
to reset your password and start adding content.

Point your TV screens to `http://localhost:3000` for the slide show.

# Contributing
All issue reports, pull requests or other feedback is highly appreciated.

# License
The source code is released under the MIT licence. See `LICENSE.txt` for more information.
