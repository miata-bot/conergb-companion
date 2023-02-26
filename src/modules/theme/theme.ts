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
      defaultProps: {
        colorScheme: 'orange',
      },
      sizes: {
        lg: {
          _text: {
            fontSize: 'lg',
          },
        },
      },
    },
    Spinner: {
      defaultProps: {
        color: 'orange.500',
      },
    },
    Text: {
      baseStyle: {
        fontSize: 'md',
      },
    },
    View: {
      baseStyle: (_props: any) => {
        const baseStyles = {
          height: '100%',
        }
        return {
          _light: {...baseStyles, backgroundColor: 'light.50'},
          _dark: {...baseStyles, backgroundColor: 'dark.50'},
        }
      },
    },
  },
})

export default theme
