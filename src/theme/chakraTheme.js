import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    styles: {
      global: {
        // styles for the `body`
        body: {
          bg: "black",
          color: "white",
          margin: '0',
          padding: '0',
        },
        // styles for the `a`
        a: {
          color: "teal.500",
          _hover: {
            textDecoration: "underline",
          },
        button: {
            colorScheme: 'purple'
        }
        },
      },
    },
  })

  export default theme
