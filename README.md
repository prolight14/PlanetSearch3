# PlanetSearch3

The sequel to Helix's Adventure (Planet Search 2)

## Running

Run "./www/index.html" in a Live Server in a browser window (vscode has one)

## Contributing

1. Make sure you have Visual Studio code, vscode Live Server extension, nodejs and npm installed.

2. Open Visual Studio code

3. Then run "npm install" (in a terminal window) then run "npm run build" You might have to install other things globally like webpack and/or the typescript compiler.

2. Then in a terminal window run "tsc --watch -p ./src --outDir ./nodeSrc" then run
(in a new terminal window) "webpack -w"

5. Then right click "./www/index.html" and chose "Open with Live Server"

6. Finally you should have PlanetSearch3 open in a new browser window and refresh everytime you make a change in "src"

## Debugging

Change `debugging` in `webpack.config.js` to "true" and make sure you're running the command described in "Contributing" (above)

## Pushing to a repository

Make sure you stop all running commands in the terminal before pushing anything to a repository.