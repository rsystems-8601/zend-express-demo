"use strict";

console.log("App.js is running");

// JSX

var template = React.createElement(
    "div",
    null,
    React.createElement(
        "h1",
        null,
        "This is header "
    ),
    React.createElement(
        "p",
        null,
        " This is JSX from app.jsff "
    ),
    ";"
);
var appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);

/*
npm i live-server -g
npm i babel-cli -g
npm i babel-preset-react babel-preset-env --save
babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
live-server public
*/
