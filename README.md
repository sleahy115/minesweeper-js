# Experince95

## Description
Remember your past with an app that allows a user to play minesweeper and save their scores to a leaderboard. The user can also challenge a friend to play against a certain set score.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Setup
* clone repository from https://github.com/sleahy115/minesweeper-js.git
* `npm install -g @angular/cli`
* ` cd minesweeper-js`
* `npm install`
* `bower install`
* `ng-serve`
*  To add firebase...
   * `touch api-keys.ts` in the app folder
   * go to  https://firebase.google.com/ to set up an account
   * create a project in firebase called gymnast-roster
   * select the option to add firebase to web app
   * copy the information from the pop up into the api-keys.ts file
   * code example- in src/app-keys.ts
   `export var masterFirebaseConfig = {
      apiKey: "xxxx",
      authDomain: "xxxx.firebaseapp.com",
      databaseURL: "https://xxxx.firebaseio.com",
      storageBucket: "xxxx.appspot.com",
      messagingSenderId: "xxxx"
    };`
    * add the api-keys file to the gitignore file.
* This project is also hosted at https://minesweeper-de6d0.firebaseapp.com/

## Technologies used
* Angular 2 CLI -https://cli.angular.io/
* Bootstrap -http://getbootstrap.com/
* Firebase -https://firebase.google.com/
* Node JS -https://nodejs.org/en/

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

Copyright (c) 2017 Sarah Leahy, Dylan Stackhouse All Rights Reserved.
