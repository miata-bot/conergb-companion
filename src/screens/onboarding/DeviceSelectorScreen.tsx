import {useContext} from 'react'

import {useNavigation} from '@react-navigation/native'
import {
  StackNavigationProp,
  type StackScreenProps,
} from '@react-navigation/stack'
import {
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base'
import {type Peripheral} from 'react-native-ble-manager'
import EntypoIcon from 'react-native-vector-icons/Entypo'

import {OnboardingStackParamList} from '.'
import {ScanningContext} from '~/modules/bluetooth/discovery'
import {AppColors} from '~/modules/theme/theme'

interface DeviceItemProps {
  peripheral: Peripheral
}

function DeviceItem({peripheral}: DeviceItemProps) {
  const navigation =
    useNavigation<
      StackNavigationProp<OnboardingStackParamList, 'DeviceSelector'>
    >()
  return (
    <Pressable
      _dark={{bgColor: 'muted.800'}}
      _pressed={{
        _dark: {bgColor: 'muted.700'},
        _light: {bgColor: 'light.300'},
      }}
      _light={{bgColor: 'light.200'}}
      marginBottom="4"
      onPress={() => {
        navigation.push('Pair', {peripheral})
      }}
      padding="8"
      rounded="8"
      width="48%">
      <VStack alignItems="center" space="xs">
        <Icon
          as={EntypoIcon}
          color="orange.600"
          name="traffic-cone"
          size="12"
        />
        <Text fontWeight="bold" textAlign="center">
          {peripheral.name || 'ConeRGB'}
        </Text>
      </VStack>
    </Pressable>
  )
}

type DeviceSelectorProps = StackScreenProps<
  OnboardingStackParamList,
  'DeviceSelector'
>

export default function DeviceSelectorScreen({
  navigation,
}: DeviceSelectorProps) {
  const {
    peripheralsState: [peripherals],
    scanningState: [isScanning],
    reset,
  } = useContext(ScanningContext)

  return (
    <View>
      <Flex height="100%" paddingTop="8" safeAreaTop safeAreaBottom>
        <Heading textAlign="center" marginBottom="8">
          Select your device:
        </Heading>
        <ScrollView>
          <Flex
            direction="row"
            justifyContent="space-between"
            px="4"
            wrap="wrap">
            {peripherals.map((p, i) => (
              <DeviceItem key={`${p.id}-${i}`} peripheral={p} />
            ))}
          </Flex>
        </ScrollView>
        <Center
          _dark={{bgColor: AppColors.BG.dark}}
          _light={{bgColor: AppColors.BG.light}}
          marginBottom="8"
          marginTop="auto"
          paddingX="8"
          paddingTop="8">
          {isScanning ? (
            <Spinner />
          ) : (
            <Button
              onPress={() => {
                reset()
                navigation.replace('Scan')
              }}
              size="lg"
              variant="outline"
              width="100%">
              Re-scan
            </Button>
          )}
        </Center>
      </Flex>
    </View>
  )
}
