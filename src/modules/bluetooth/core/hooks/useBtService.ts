import {useEffect} from 'react'

import {start} from 'react-native-ble-manager'

export default function useBtService() {
  useEffect(() => {
    start({showAlert: true})
  })
}
