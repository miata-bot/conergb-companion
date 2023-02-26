import {useEffect, useState} from 'react'
import {NativeEventEmitter, NativeModules} from 'react-native'

import {type BleStopScanEvent, type Peripheral} from 'react-native-ble-manager'

const BleManagerModule = NativeModules.BleManager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)

interface DiscoveredPeripherals {
  [key: Peripheral['id']]: Peripheral
}

interface UseDiscoverPeripheralsProps {
  onDiscoveryStop?: (args?: BleStopScanEvent) => void
}

export default function useDiscoverPeripherals({
  onDiscoveryStop,
}: UseDiscoverPeripheralsProps = {}) {
  const [peripherals, setPeripherals] = useState<DiscoveredPeripherals>({})

  useEffect(() => {
    const listeners = [
      bleManagerEmitter.addListener(
        'BleManagerStopScan',
        (args: BleStopScanEvent) => {
          onDiscoveryStop?.(args)
        },
      ),
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        (peripheral: Peripheral) => {
          if (!peripherals[peripheral.id]) {
            setPeripherals({...peripherals, [peripheral.id]: peripheral})
          }
        },
      ),
    ]

    return () => {
      for (const listener of listeners) listener.remove()
    }
  })

  return {peripherals: Object.values(peripherals)}
}
