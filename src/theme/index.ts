
import { extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
    styles: {
        global: {
            "#root": {
                display: 'flex',
                flexDirection: 'column',
                minHeight: "100vh",
            },
        },
    },
    // ...other theme customisations
});

export default theme;