import {useState} from 'react'
import {Appearance, type ColorSchemeName} from 'react-native'

import {NativeBaseProvider, type StorageManager} from 'native-base'

import theme from '../theme'

export default function ThemeProvider({children}: {children: React.ReactNode}) {
  const [systemColorScheme, setSystemColorScheme] = useState<ColorSchemeName>(
    Appearance.getColorScheme(),
  )

  Appearance.addChangeListener(({colorScheme}) => {
    setSystemColorScheme(colorScheme)
  })

  const colorModeManager: StorageManager = {
    get: async () => {
      if (systemColorScheme) return systemColorScheme
      return 'light'
    },
    set: async () => {},
  }

  return (
    <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </NativeBaseProvider>
  )
}
