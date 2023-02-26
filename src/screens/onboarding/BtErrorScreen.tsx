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
import {openSettings} from 'react-native-permissions'

export default function BtErrorScreen() {
  async function handleOpenSettings() {
    await openSettings()
  }

  return (
    <View>
      <Flex flexDirection="column" height="100%">
        <Flex height="100%" justifyContent="center">
          <VStack>
            <Box paddingX="8">
              <Heading marginBottom="4">Couldn't initialize Bluetooth</Heading>
              <Text>
                You will not be able to control the ConeRGB Controller with this
                device if you do not grant this app access to Bluetooth.
              </Text>
            </Box>
          </VStack>
        </Flex>
        <Center marginBottom="8" marginTop="auto" paddingX="8" safeAreaBottom>
          <Button onPress={handleOpenSettings} size="lg" width="100%">
            Open Settings
          </Button>
        </Center>
      </Flex>
    </View>
  )
}
