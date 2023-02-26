import {useEffect} from 'react'
import {NativeEventEmitter, NativeModules} from 'react-native'

import {type Peripheral} from 'react-native-ble-manager'

const BleManagerModule = NativeModules.BleManager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

function handleDiscoverPeripheral(peripheral: Peripheral) {
  console.log('got ble peripheral', peripheral)
}

export default function useBtListeners() {
  useEffect(() => {
    const listeners = [
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      ),
    ]

    return () => {
      for (const listener of listeners) listener.remove()
    }
  })
}
