import {useEffect} from 'react'
import {useState} from 'react'
import {Platform} from 'react-native'

import {type StackScreenProps} from '@react-navigation/stack'
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from 'native-base'
import {
  PERMISSIONS,
  type PermissionStatus,
  RESULTS,
  check,
  checkMultiple,
} from 'react-native-permissions'

import {OnboardingStackParamList} from '.'

type Props = StackScreenProps<OnboardingStackParamList, 'PowerOnController'>

const getCheckBtPermissionsFn = function (): () => Promise<PermissionStatus> {
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

export default function PowerOnControllerScreen({navigation}: Props) {
  const bgColor = useColorModeValue('light.50', 'dark.50')
  const checkBtPermissionsFn = getCheckBtPermissionsFn()
  const [btPermStatus, setBtPermStatus] = useState<PermissionStatus>()

  useEffect(() => {
    async function checkBtPermissions() {
      const result = await checkBtPermissionsFn()
      setBtPermStatus(result)
    }
    checkBtPermissions()
  }, [checkBtPermissionsFn])

  function goToNextScreen() {
    if (
      btPermStatus === RESULTS.DENIED ||
      btPermStatus === RESULTS.UNAVAILABLE
    ) {
      navigation.push('ExplainPermissions')
    }
    return
  }

  return (
    <Flex bgColor={bgColor} flexDirection="column" height="100%">
      <Flex height="100%" justifyContent="center">
        <VStack>
          <Box paddingX="8">
            <Heading marginBottom="4">Power your ConeRGB Controller</Heading>
            <Text>
              Your controller should be on and in close proximity to this device
              before you continue.
            </Text>
          </Box>
        </VStack>
      </Flex>
      <Center marginBottom="8" marginTop="auto" paddingX="8" safeAreaBottom>
        <Button
          colorScheme="orange"
          onPress={goToNextScreen}
          size="lg"
          width="100%">
          Next
        </Button>
      </Center>
    </Flex>
  )
}
