# Eat This!
Where should I eat?

An app that helps users decide what and where they "want" to eat in a specified location near them.

## Instructions for startup

1. Do `npm install -g ionic cordova` for fresh installers.
1. You'll need at least three (optimally 4) seperate terminal sessions to run both the server and the client side.

Do NOT edit the styles.css file in www/css. Instead please work in the SCSS folder styles file. 

### Client (Ionic)
1. Change directories into `app`.
1. Run `npm install` for node module and bower dependencies.
1. Start `ionic serve`.
1. You can view the front-end at `localhost:8100`.

Note: In case there are problems with missing plugins or ionic/cordova related issues. Use `ionic state reset` to download all the missing dependencies that are only obtainable through ionic/cordova.

### Server
1. Insure you are in the root directory of the project.
1. Run `npm install` for node module dependencies.
1. OPTIONAL: Seed the data at `npm run seed` for first installation.
1. Start `mongod` for database.
1. Start at `npm run dev`.
  2. This will also take care of the `source .env` and `nodemon` command.
  2. Note that gulp will no longer run server side.
1. Server will run at `localhost:8080`.
  2. However you won't be needing to go there right now.

Note: Please make sure location services are turned on in-browser or NO information will be returned on the client side.

## Mobile Debugging/Developing Instructions
1. Change directory to `app`.
1. Make sure you run `npm install` and `ionic state reset` to install all dependencies in CLIENT if you haven't already.
1. Use `ionic platform add ios` and `ionic platform add android` to check if they are installed. If not, it'll do it for you.
1. Run `ionic build` + `ios`/`android` to package up for the respective platforms.
1. Run `ionic emulate` + `ios`/`android` to emulate app on workstation.
  2. Alternatively you can add the `--livereload` flag for better workflow. This will also help when you're debugging in xCode as it will too live reload for your actual mobile device. (Have not tested with Google yet).
  2. Useful CLI commands to use in the same terminal session.
    3. `consolelog` or `c` for verbose viewing of code session.
    3. `reset` or `r` to quickly reset back to home page and reload all files. 
  2. Sometimes changes won't be properly running. You'll have to `ionic build` to completely refresh the project.

## Members Include
(as of Sept 23, 2015)

~~Project Manager:~~
####THE Prime Minister:
Julia Bond

Former:
~~Keahi Selhourst~~ ~~Kelemete Seto~~ ~~Sean Nakamura~~

Team:
  - Julia Bond
  - Sean Nakamura
  - Keahi Selhourst
  - Kelemete Seto
