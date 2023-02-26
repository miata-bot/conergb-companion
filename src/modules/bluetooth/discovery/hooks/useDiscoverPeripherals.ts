import {useContext, useEffect} from 'react'
import {NativeEventEmitter, NativeModules} from 'react-native'

import {type BleStopScanEvent, type Peripheral} from 'react-native-ble-manager'

import {ScanningContext} from '../contexts/ScanningProvider'

const BleManagerModule = NativeModules.BleManager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

export default function useDiscoverPeripherals() {
  const {
    peripheralsState: [, addPeripheral],
    scanningState: [, setIsScanning],
  } = useContext(ScanningContext)

  useEffect(() => {
    const listeners = [
      bleManagerEmitter.addListener(
        'BleManagerStopScan',
        (_args: BleStopScanEvent) => {
          setIsScanning(false)
        },
      ),
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        (peripheral: Peripheral) => {
          addPeripheral(peripheral)
        },
      ),
    ]

    return () => {
      for (const listener of listeners) listener.remove()
    }
  })
}
