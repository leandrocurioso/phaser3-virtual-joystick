# Phaser3 Virtual Joystick

A Phaser 3 virtual joystick implementation with phaser3-rex-notes plugin. This project is already configured with webpack and gulp for css.
<br/>
**If you like this implementation please star it =)**
<br/>

**DEMO**: http://phaservirtualjoystick.leandrocurioso.com
<br/>
**Documentation lnk**: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/virtualjoystick

![alt Demo](https://raw.githubusercontent.com/leandrocurioso/phaser3-virtual-joystick/master/demo.png)

### Structure
The code must be written is ES6 then Webpack will automatically transpile it to ES5 to ensure browser compatibility.

### Installation
````
npm install
````

### How to run in development mode

To run in development mode type in the terminal:
````
npm run watch
````
The command above will automatically start a webpack dev server at port 3000 and will restart everytime a code file is saved, automatically minifiying the css file.

### Build for production

To build for production type in the terminal:
````
npm run build
````
The command above will automatically minify the script files and css file into one. 

You can see the transpiled files in: 
<br/>
**./public/css/style.min.css** and **./public/js/bundle.min.js**
