import {SetStateAction, createContext, useState} from 'react'

import {Peripheral} from 'react-native-ble-manager'

interface DiscoveredPeripherals {
  [key: Peripheral['id']]: Peripheral
}

interface ScanningContext {
  peripheralsState: [Peripheral[], (peripheral: Peripheral) => void]
  scanningState: [boolean, React.Dispatch<SetStateAction<boolean>>]
  reset: () => void
}

export const ScanningContext = createContext<ScanningContext>({
  peripheralsState: [[], () => {}],
  scanningState: [true, () => {}],
  reset: () => {},
})

export default function ScanningProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [discoveredPeripherals, setDiscoveredPeripherals] = useState<
    Peripheral[]
  >([])
  const [discoveredPeripheralsMap, setDiscoveredPeripheralsMap] =
    useState<DiscoveredPeripherals>({})
  const [isScanning, setIsScanning] = useState(true)

  function addPeripheral(peripheral: Peripheral) {
    if (!discoveredPeripheralsMap[peripheral.id]) {
      setDiscoveredPeripheralsMap({
        ...discoveredPeripheralsMap,
        [peripheral.id]: peripheral,
      })
      setDiscoveredPeripherals([...discoveredPeripherals, peripheral])
    }
  }

  function reset() {
    setDiscoveredPeripheralsMap({})
    setDiscoveredPeripherals([])
    setIsScanning(true)
  }

  return (
    <ScanningContext.Provider
      value={{
        peripheralsState: [discoveredPeripherals, addPeripheral],
        scanningState: [isScanning, setIsScanning],
        reset,
      }}>
      {children}
    </ScanningContext.Provider>
  )
}
