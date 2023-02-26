import {useEffect, useState} from 'react'

import {type PermissionStatus} from 'react-native-permissions'

import {getCheckBtPermissionsFn} from '..'

export default function useGetBtPerms(): [
  PermissionStatus | undefined,
  () => void,
] {
  const [btPermStatus, setBtPermStatus] = useState<PermissionStatus>()
  const [checkingPermStatus, setCheckingPermStatus] = useState(true)
  const checkBtPermissionsFn = getCheckBtPermissionsFn()

  useEffect(() => {
    async function checkBtPermissions() {
      setBtPermStatus(await checkBtPermissionsFn())
    }
    if (checkingPermStatus) {
      checkBtPermissions()
      setCheckingPermStatus(false)
    }
  }, [checkBtPermissionsFn, checkingPermStatus])

  function resyncPerms() {
    setCheckingPermStatus(true)
  }
  return [btPermStatus, resyncPerms]
}
