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

export default function ExplainPermissionsScreen() {
  const bgColor = useColorModeValue('light.50', 'dark.50')

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
        <Button colorScheme="orange" size="lg" w="100%">
          Continue
        </Button>
      </Center>
    </Flex>
  )
}
