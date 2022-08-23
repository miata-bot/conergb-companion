import {Platform} from 'react-native'

import {
  PERMISSIONS,
  type PermissionStatus,
  RESULTS,
  check,
  checkMultiple,
  request,
  requestMultiple,
} from 'react-native-permissions'

export const getCheckBtPermissionsFn =
  function (): () => Promise<PermissionStatus> {
    return Platform.select({
      android: async () => {
        let blocked = false
        let denied = false
        let granted = false
        let unavailable = false
        const permissions = await checkMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
        ])
        for (const permission in permissions) {
          if (permission === RESULTS.UNAVAILABLE) unavailable = true
          if (permission === RESULTS.BLOCKED) blocked = true
          if (permission === RESULTS.DENIED) denied = true
          if (permission === RESULTS.GRANTED) granted = true
        }
        if (unavailable) return RESULTS.UNAVAILABLE
        if (blocked) return RESULTS.BLOCKED
        if (denied) return RESULTS.DENIED
        if (granted) return RESULTS.GRANTED
        return RESULTS.UNAVAILABLE
      },
      ios: async () => {
        return await check(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL)
      },
      default: async () => 'unavailable',
    })
  }

export const getRequestBtPermissionsFn =
  function (): () => Promise<PermissionStatus> {
    return Platform.select({
      android: async () => {
        let blocked = false
        let denied = false
        let granted = false
        let unavailable = false
        const permissions = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
        ])
        for (const permission in permissions) {
          if (permission === RESULTS.UNAVAILABLE) unavailable = true
          if (permission === RESULTS.BLOCKED) blocked = true
          if (permission === RESULTS.DENIED) denied = true
          if (permission === RESULTS.GRANTED) granted = true
        }
        if (unavailable) return RESULTS.UNAVAILABLE
        if (blocked) return RESULTS.BLOCKED
        if (denied) return RESULTS.DENIED
        if (granted) return RESULTS.GRANTED
        return RESULTS.UNAVAILABLE
      },
      ios: async () => await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL),
      default: async () => 'blocked',
    })
  }
