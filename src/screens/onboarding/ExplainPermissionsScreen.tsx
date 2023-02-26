import {StackScreenProps} from '@react-navigation/stack'
import {Box, Button, Center, Flex, Heading, Text, VStack} from 'native-base'

import {OnboardingStackParamList} from '.'
import {useBgColor} from '~/modules/theme'

type Props = StackScreenProps<OnboardingStackParamList, 'ExplainPermissions'>

export default function ExplainPermissionsScreen({navigation}: Props) {
  const bgColor = useBgColor()

  function goToNextScreen() {
    navigation.push('Scan')
  }

  return (
    <Flex bgColor={bgColor} flexDirection="column" height="100%">
      <Flex height="100%" justifyContent="center">
        <VStack>
          <Box paddingX="8">
            <Heading marginBottom="4">Enable Bluetooth</Heading>
            <Text>
              Please provide access to your device's bluetooth, which is
              required for connecting to the ConeRGB Controller.
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
          Continue
        </Button>
      </Center>
    </Flex>
  )
}
