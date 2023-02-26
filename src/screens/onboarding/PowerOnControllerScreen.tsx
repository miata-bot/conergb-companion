import {type StackScreenProps} from '@react-navigation/stack'
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
  View,
} from 'native-base'
import {RESULTS} from 'react-native-permissions'

import {type OnboardingStackParamList} from '.'
import {useGetBtPerms} from '~/modules/bluetooth/permissions'

type Props = StackScreenProps<OnboardingStackParamList, 'PowerOnController'>

export default function PowerOnControllerScreen({navigation}: Props) {
  const [btPermStatus] = useGetBtPerms()

  function goToNextScreen() {
    if (
      btPermStatus === RESULTS.DENIED ||
      btPermStatus === RESULTS.UNAVAILABLE
    ) {
      navigation.push('ExplainPermissions')
    }
    if (btPermStatus === RESULTS.BLOCKED || btPermStatus === RESULTS.LIMITED) {
      navigation.replace('BtError')
    }
    if (btPermStatus === RESULTS.GRANTED) {
      navigation.replace('Scan')
    }
  }

  return (
    <View>
      <Flex height="100%" justifyContent="center">
        <VStack>
          <Box paddingX="8">
            <Heading marginBottom="4">Power your Cone RGB Controller</Heading>
            <Text>
              Your controller should be on and in close proximity to this device
              before you continue.
            </Text>
          </Box>
        </VStack>
      </Flex>
      <Center marginBottom="8" marginTop="auto" paddingX="8" safeAreaBottom>
        <Button onPress={goToNextScreen} size="lg" width="100%">
          Next
        </Button>
      </Center>
    </View>
  )
}
