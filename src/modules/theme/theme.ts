import {theme as BaseTheme, extendTheme} from 'native-base'

export const AppColors = {
  BG: {light: 'light.50', dark: 'dark.50'},
}

const theme = extendTheme({
  colors: {
    primary: BaseTheme.colors.orange,
  },
  config: {
    useSystemColorMode: true,
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
      },
      defaultProps: {
        colorScheme: 'primary',
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
          _light: {...baseStyles, backgroundColor: AppColors.BG.light},
          _dark: {...baseStyles, backgroundColor: AppColors.BG.dark},
        }
      },
    },
  },
})

export default theme
