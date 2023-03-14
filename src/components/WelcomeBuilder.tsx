import { chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function WelcomeBuilder() {
    return (
        <ChakraBox
            animate={{
                scale: [1, 1.6, 1.6, 1, 1],
                rotate: [0, 0, 360, 360, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            // @ts-ignore no problem in operation, although type error appears.
            transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
            }}
            padding="2"
            bgGradient="linear(to-b, rgb(242,196,85,2), rgb(20,20,39,7))"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="130px"
            height="130px"
        >
            shout-out the ✨ Builders ✨
        </ChakraBox>
    )
}