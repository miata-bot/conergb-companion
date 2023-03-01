# RGB Controller Companion Mobile Application

A React Native application to control an [RGB Controller](https://github.com/miata-bot/can-link) over BLE. The RGB Controller is an open source hardware project designed, among many other things, to control auxiliary RGB lighting.

----

# Tech Stack
This app is written in TypeScript and utilizes React Native, a few core libraries, and various other supporting libraries.

Core dependencies include:
- [React Native](https://reactnative.dev)
  - Allows for the creation of native mobile applications written with Javascript
- [Native Base](https://nativebase.io)
  - Component and theming library that provides the foundation for this application's user interface
- [react-native-ble-manager](https://github.com/innoveit/react-native-ble-manager)
  - Bridges native Bluetooth Low Energy APIs
- [react-native-permissions](https://github.com/zoontek/react-native-permissions)
  - Bridges native app permissions APIs
- [React Navigation](https://reactnavigation.org)
  - Routing and navigation library that provides a true native experience for transitioning between app screens

----

# Local Development
TL;DR: run `npm i` and `npm run start`.

The instructions for setting up the development environment closely follows [the instructions in React Native's documentation for setting up a development environment](https://reactnative.dev/docs/environment-setup). Ensure that you are reading the instructions under "React Native CLI Quickstart".

This project requires Node.js 18; I highly recommend installing it with [asdf](https://asdf-vm.com) and its associated [node plugin](https://github.com/asdf-vm/asdf-nodejs).
