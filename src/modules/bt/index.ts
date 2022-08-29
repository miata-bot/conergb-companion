import {NativeEventEmitter, NativeModules} from 'react-native'

import {getCheckBtPermissionsFn, getRequestBtPermissionsFn} from './utils'

const BleManagerModule = NativeModules.BleManager
export const BleManagerEmitter = new NativeEventEmitter(BleManagerModule)

export {getCheckBtPermissionsFn, getRequestBtPermissionsFn}
