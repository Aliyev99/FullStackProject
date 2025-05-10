import { useSpring, animated } from "@react-spring/web";
import { ReactElement } from "react";

var FadeAnimationComponent = (children: ReactElement) => {
    const props = useSpring({
        to: { opacity: 0.5},
        from: { opacity: 0},
        enter: {}
    });

    return (
        <animated.div style={props}>
            {children}
        </animated.div>
    )
}

export default FadeAnimationComponent;