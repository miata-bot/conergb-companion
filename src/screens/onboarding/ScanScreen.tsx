import {useState} from 'react'
import {useEffect} from 'react'

import {Center, Flex, Spinner, VStack, useColorModeValue} from 'native-base'
import {type PermissionStatus} from 'react-native-permissions'

import {
  getCheckBtPermissionsFn,
  getRequestBtPermissionsFn,
} from 'src/modules/bt'

export default function ScanScreen() {
  const [btPermStatus, setBtPermStatus] = useState<PermissionStatus>()
  const bgColor = useColorModeValue('light.50', 'dark.50')
  const checkBtPermissionsFn = getCheckBtPermissionsFn()
  const requestBtPermissionsFn = getRequestBtPermissionsFn()

  useEffect(() => {
    async function checkBtPermissions() {
      const result = await checkBtPermissionsFn()
      setBtPermStatus(result)
    }
    checkBtPermissions()
  }, [checkBtPermissionsFn])

  useEffect(() => {
    async function requestBtPermissions() {
      console.log('requesting BT')
      const result = await requestBtPermissionsFn()
      setBtPermStatus(result)
    }

    if (btPermStatus) {
      if (btPermStatus === 'denied') {
        requestBtPermissions()
      }
      if (btPermStatus === 'granted') {
        console.log('granted')
      }
    }
  }, [btPermStatus, requestBtPermissionsFn])

  console.log('status', btPermStatus)

  return (
    <Flex bgColor={bgColor} flexDirection="column" height="100%">
      <Flex height="100%" justifyContent="center">
        <VStack>
          <Center>
            <Spinner size="lg" />
          </Center>
        </VStack>
      </Flex>
    </Flex>
  )
}
