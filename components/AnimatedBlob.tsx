import React, { useEffect } from "react";
import {
  Canvas,
  Circle,
  vec,
  LinearGradient,
} from "@shopify/react-native-skia";
import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { View } from "react-native";

interface AnimatedBlobProps {
  animate: boolean;
}

const AnimatedBlob = (props: AnimatedBlobProps) => {
  const { animate } = props;

  const width = 256;
  const height = 256;
  const initialRadius = width * 0.33;
  const radius = useSharedValue(initialRadius);

  useEffect(() => {
    if (animate) {
      // Animate the radius of the circle (expand and contract)
      radius.value = withRepeat(
        withTiming(initialRadius + 10, {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    } else {
      radius.value = initialRadius;
    }
  }, [animate]);

  return (
    <View style={{ alignItems: "center" }}>
      <Canvas style={{ width, height }}>
        <Circle cx={width / 2} cy={height / 2} r={radius}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(200, 200)}
            colors={["#E6C111", "#7D6A8C", "#2E889D"]}
          />
        </Circle>
      </Canvas>
    </View>
  );
};

export default AnimatedBlob;
