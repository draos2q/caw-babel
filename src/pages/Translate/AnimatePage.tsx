import { useEffect } from "react";
import { useDisclosure } from '@chakra-ui/react';

import LottieAnimation, { defaultStyle } from "src/components/animations/LottieAnimation";

type AnimatePageProps = {
    pending: number;
};
export function AnimatePage({ pending }: AnimatePageProps) {

    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    useEffect(() => {

        if (pending === 0)
            onOpen();

        else
            onClose();

    }, [ pending, onClose, onOpen ]);

    if (!isOpen)
        return <></>;

    return (
        <LottieAnimation
            animation="confetti-blueyellow"
            autoplay={true}
            loop={true}
            visibleControls={false}
            onClickAnyWhere={onClose}
            style={{
                ...defaultStyle,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                margin: 'auto',
                transform: 'scale(1.5)'
            }} />
    );
}
