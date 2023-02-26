import {extendTheme} from 'native-base'

const theme = extendTheme({
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

export default theme
