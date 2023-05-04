import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useRef } from "react";

import useOnClickOutside from "src/hooks/useOnClickOutside";

const animationData = {
    'congrats-animation': './assets/animations/congrats.json',
    'confetti-blueyellow': './assets/animations/confetti-blueyellow.json',
}

type Props = {
    animation: keyof typeof animationData;
    autoplay: boolean;
    loop: boolean;
    style?: React.CSSProperties;
    visibleControls?: boolean;
    onClickAnyWhere?: () => void;
}

export const defaultStyle: React.CSSProperties = {
    height: '300px',
    width: '300px',
    position: 'absolute',
    bottom: '0',
    right: '0',
    top: '0',
    left: '0',
    zIndex: 20,
    // transform: 'translate(50%, 50%)',
}

const LottieAnimation = ({
    animation, autoplay, loop, visibleControls,
    style = defaultStyle,
    onClickAnyWhere
}: Props) => {

    const ref = useRef(null);
    const handleClickOutside = () => {
        onClickAnyWhere?.();
    }

    useOnClickOutside(ref, handleClickOutside)

    const animationSrc = animationData[ animation ];
    return (
        <div ref={ref}>
            <Player
                autoplay={autoplay}
                loop={loop}
                src={animationSrc}
                style={style}
            >
                <Controls visible={visibleControls} buttons={[ 'play', 'repeat', 'frame', 'debug' ]} />
            </Player>
        </div>
    );
}

export default LottieAnimation;
