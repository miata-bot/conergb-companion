/**
 * @format
 */
import {AppRegistry} from 'react-native'

// required by react navigation
import 'react-native-gesture-handler'

import {name as appName} from './app.json'
import App from '~/App'

AppRegistry.registerComponent(appName, () => App)
