import {useState} from 'react'
import {Appearance, type ColorSchemeName} from 'react-native'

import {NativeBaseProvider, type StorageManager, extendTheme} from 'native-base'

type Props = {
  children?: React.ReactNode
}

const appTheme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
      },
      sizes: {
        lg: {
          _text: {
            fontSize: 'lg',
          },
        },
      },
    },
    Text: {
      baseStyle: {
        fontSize: 'md',
      },
    },
  },
})

export function ThemeProvider({children}: Props) {
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
    <NativeBaseProvider colorModeManager={colorModeManager} theme={appTheme}>
      {children}
    </NativeBaseProvider>
  )
}
