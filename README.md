# Eat This!
Where should I eat?

An app that helps users decide what and where they "want" to eat in a specified location near them.

## Instructions for startup

1. Do `npm install -g ionic cordova` for fresh installers.
1. You'll need at least two (optimally 4) seperate terminal sessions to run both the server and the client side.

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
  2. OPTIONAL: Seed the data at `npm run seed` for first installation. Then quit process.
1. Start at `npm run dev`.
1. Server will run at `localhost:8080`.

Note: 

- See application's values.js to change url to point to correct server. 

## Members Include

~~Project Manager:~~
####THE Prime Minister: n/a

Team:
  - Julia Bond
  - Sean Nakamura
  - Keahi Selhourst
  - Kelemete Seto
