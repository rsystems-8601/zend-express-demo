console.log("App.js is running");

// JSX

var template= 
            <div>
                <h1>This is header </h1>
                <p> This is JSX from app.jsff </p>;
            </div>
var appRoot =  document.getElementById('app');

ReactDOM.render(template,appRoot);

/*
npm i live-server -g
npm i babel-cli -g
npm i babel-preset-react babel-preset-env --save
babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
live-server public
*/