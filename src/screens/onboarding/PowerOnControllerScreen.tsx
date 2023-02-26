import {useEffect, useState} from 'react'

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
import {RESULTS} from 'react-native-permissions'

import {OnboardingStackParamList} from '.'
import useGetBtPerms from '~/modules/bt/hooks/useGetBtPerms'

type Props = StackScreenProps<OnboardingStackParamList, 'PowerOnController'>

export default function PowerOnControllerScreen({navigation}: Props) {
  const bgColor = useColorModeValue('light.50', 'dark.50')
  const [btPermStatus] = useGetBtPerms()

  function goToNextScreen() {
    if (
      btPermStatus === RESULTS.DENIED ||
      btPermStatus === RESULTS.UNAVAILABLE
    ) {
      navigation.push('ExplainPermissions')
    }
    if (btPermStatus === RESULTS.BLOCKED || btPermStatus === RESULTS.LIMITED) {
      navigation.push('BtError')
    }
    if (btPermStatus === RESULTS.GRANTED) {
      navigation.push('Scan')
    }
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
