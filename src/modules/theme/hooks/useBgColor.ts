import {useColorModeValue} from 'native-base'

export default function useBgColor() {
  return useColorModeValue('light.50', 'dark.50')
}
