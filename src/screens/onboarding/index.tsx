import type {StackScreenProps} from '@react-navigation/stack'
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

import type {RootStackParamList} from 'src/App'

type Props = StackScreenProps<RootStackParamList, 'Onboarding'>

export default function OnboardingScreen({}: Props) {
  const bgColor = useColorModeValue('light.50', 'dark.50')

  return (
    <Flex bgColor={bgColor} flexDirection="column" height="100%">
      <Flex h="100%" justifyContent="center">
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
      <Center marginBottom="8" marginTop="auto" paddingX="8">
        <Button colorScheme="orange" size="lg" w="100%">
          Continue
        </Button>
      </Center>
    </Flex>
  )
}
