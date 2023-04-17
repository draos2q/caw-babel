
import { extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
    config: {
        cssVarPrefix: 'teh',
        localStoragePrefix: 'teh-t'
    },
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