# [GPScavenger](#https://github.com/StoutsHonor/AR.T) (development name)

> A location based multiplayer scavenger hunt app for Android, built in React Native.
>
> __Features__:
> Reach GPS marker on the map to advance
> Answer riddle / question challenges
> Social features (lobby, chat)
> Design your own games
>
> __Use Cases__:
> Social: It’s a game! Flexible game modes for different tastes. (competitive, cooperative, etc.)
> Educational: Learn more about a subject by making the learning interactive. Example use case: a museum where students can visit various exhibits and answer questions.
> Explorative: See the unseen and expand your horizons. Example use case: Get to know a part of town you’ve never checked out.


## Table of Contents

1. [Team](#team)
1. [Usage](#usage)
1. [Dependencies & Setting Up](#dependencies--setting-up)
1. [Contributing](#contributing)
1. [Known Bugs](#known-bugs)


## Team
  - __Product Owner__: [Jennifer Tran](#https://github.com/startupjen)
  - __Scrum Master__: [Jeffrey Lee](#https://github.com/brickbite)
  - __Development Team Members__: [Michael Nguyen](#https://github.com/miken619), [Kevin Tamarus](#https://github.com/kevintamarus)


## Usage

#### Create an account
- create an account using the form provided, or login with an existing account

#### Start a game (creating a lobby)
- fetches available games from the database and displays as a (map view also available)
- touch on a game (or map marker) to view further details

#### Join a game
- checks active lobbies on the server and displays a list (map view also available)
- touch on a game (or map marker) to view further details

#### Starting a game (from within a lobby)
- once the minimum number of players has been reached, the lobby will allow the game to be started

#### Playing a game
- three tabs displaying the current challenge, the list of challenges, and a chat
- chat is between all players in the game by default. starting a message with "@team" will send the message to players on your own team
- progress through the challenges until reaching the end, where you are redirected back to the homepage


## Dependencies & Setting Up

> Project is written in React Native. Here are the steps to set up an environment to work in React Native. (base reference link: https://facebook.github.io/react-native/releases/0.23/docs/android-setup.html)

#### General Notes:
- Homebrew and NPM are used for services and package managers
- In terminal, npm install will be required in two places: within the client folder (package.json generated by React Native), and within the server folder (package.json generated for server and database use).
```sh
npm install
```
- There are also multiple .gitignore files.
- API keys used:
Client: Firebase (for authentication)
Client: Google Maps
Database: PostgreSQL (on ElephantSQL)
- Knowledge of the native language (in this case, Java for Android apps) is helpful, since updates to native project files may be required to modify features.

#### install and set up dependencies
- set up server (that can be acessed from the web, if on a physical device), and run server
- set up database, and initalize it (can also seed here if needed)
- set up authentication via firebase, and allow for email/password login
- clone this repo
- refer to the dependencies section for further details

#### for macOS developers, working on an Android App:
- Android SDK (by installing Android Studio 2.3.3 for macOS)
- Configure the Android SDK: React Native supports Android 6.0 (API 23) at the time of this writing. Install the Android SDK files for 6.0 (System Image, Tools, etc.)
- Update environment variables for Android SDK: (in .bash_profile for macOS users). "ANDROID_HOME" should point to the path in given by the SDK manager (where SDK is located).
```sh
# Android SDK
export ANDROID_HOME=~/Library/Android/sdk
export PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools
export PATH="$HOME/Android/tools:$PATH"
export PATH="$HOME/Android/platform-tools:$PATH"
```
- VirtualBox 5.1.26 platform packages (Genymotion requires this for macOS)
- Genymotion 2.10.0 Revision 20170719-0eb896a (Android Emulator)
- Genymotion Configuration: Create an Android Emulator running Android 6.0 (API 23).

#### for Windows (10?) developers, working on an Android App:
- To Be Written


#### Client config.js (in client/config/):
- firebase used for authentication, relevant details are stored in this file.
- If testing with a local server, the emulator should NOT be sending requests to 'localhost'. It will be another IP address depending on the service that is running the emulator. Localhost (or server) address is set in this file, since various emulators use certain IP addresses to refer to localhost. Set this address to the server address with port when the server is deployed

#### Database config.js (in server/database/):
- PostgreSQL using elephantSQL is the database used for this project. Seeding database can be done via npm:
```sh
npm run seed
```

#### Google Maps API Configuration:
- Google Play Services is required on the device. (Adding Google Player Services to Genymotion emulator: http://opengapps.org/, x86 platform, Android 6.0, nano variant. Drop the zip file into the running emulator)
- AndroidManifeset.xml is already updated with appropriate information (refer to Google API docs if needed)

#### build the app to a physical device running Android:
- To Be Written

#### build the app to an emulator:
- in terminal: navigate within the client folder and install app dependencies with npm install.
- have at least 1 instance of an emulator running the correct android version
- after dependencies are installed, run:
```sh
react-native run-android
```
- this will start a local service which builds the android app and runs it on the emulator





## Contributing
- feature ideas for further development:

#### Client Side Features
- social login (facebook, google, etc)
- persistence of login (react-native-keychain)
- profile page and addition of friends features, 1:1 chat
- display and saving of more features
- pseudo-replay function (recording of past games / completed challenges)
- player selection on which team to join in lobby

#### Additional Game Modes / Features (using existing tech)
- drawing of player path as they progress through a game
- multiple challenge markers shown from the beginning, users decide the order of completion (collect as many as you can in a time limit, race to finish, etc.)
- king of the hill (territory control based game mode)
- visible / invisible markers
- GPS race / timed challenge
- GPS based interactions (examples: when in vicinity of another player, tag, go invisible, increase their timer, temporary disable, etc)
- tag game mode (would need to define fixed area of gameplay to ensure players stay in an area)
- mini-games between nearby players
- group cooperative mode
- GPS ping pong
- GPS monopoly (or other suitable board game)

#### Additional Technologies to Incorporate
- QR Codes
- Compass / Gyroscope / other sensor available on the phone
- Agumented Reality
- Date / Time-based events
- Image recognition (machine learning)


## Known Bugs
- Breaking: JSON Parse Error: Unexpected EOF
- Breaking: roomId null
- Breaking: questionTypeId undefined
- Breaking: JSON Parse Error: unexpected token (usually error handling after promises)
- Med Priority (usage restriction): All GPS locations used must be traversable between each other. Google Distance calculation: returns undefined if the origin or destination is untraversable terrain (ex: within bodies of water, separated landmass). Error reads something like 'cannot read 'legs' of undefined'
- Med Priority (usage restriction): Must pause video before answering a video challenge. Audio will continue playing even when view changes: videoplayer component does not unmount (since a page is just added to the stack on react-router-flux).
- Med Priority (performance): various timer warnings
- Low Priority (feature lacking polish): no check for player in vicinity before the game can be started

