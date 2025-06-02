import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { runOnJS, useSharedValue, withDelay, withTiming, withSpring, Easing, useAnimatedStyle, useAnimatedProps, SharedValue 
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

const handleTapWorklet = (
  tapCount: SharedValue<number>,
  circleSize: SharedValue<number>,
  toggleColor: () => void,
  increaseSize: () => void,
  setIsCircle: (val: boolean) => void
) => {
  'worklet';

  const newCount = tapCount.value + 1;
  tapCount.value = newCount;

  runOnJS(toggleColor)();
  runOnJS(increaseSize)();

  if (newCount === 3) {
    runOnJS(setIsCircle)(false);
  } else if (newCount === 6) {
    runOnJS(setIsCircle)(true);
    tapCount.value = 0;
  }
};

export const SvgScreen = () => {
  const [circleColor, setCircleColor] = useState('pink');
  const [isCircle, setIsCircle] = useState(true);

  const tapCount = useSharedValue(0);
  const circleSize = useSharedValue(50);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(100); 

  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(100);
  const svgOpacity = useSharedValue(0);

  useEffect(() => {
    titleOpacity.value = withDelay(800, withTiming(1, { duration: 1000 }));
    titleTranslateY.value = withDelay(
      800,
      withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      })
    );

    svgOpacity.value = withDelay(1000, withTiming(1, { duration: 1000 }));
    translateY.value = withDelay(
      1000,
      withTiming(0, {
        duration: 1000,
        easing: Easing.out(Easing.exp),
      })
    );
  }, []);

  const animatedTitleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const animatedSvgStyle = useAnimatedStyle(() => ({
    opacity: svgOpacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
  }));

  const animatedCircleProps = useAnimatedProps(() => ({
    r: circleSize.value,
  }));

  const animatedRectProps = useAnimatedProps(() => ({
    x: 50 - circleSize.value,
    y: 50 - circleSize.value,
    width: circleSize.value * 2,
    height: circleSize.value * 2,
  }));

  const toggleColor = () => {
    setCircleColor((prev) => (prev === 'yellow' ? 'skyblue' : 'yellow'));
  };

  const increaseSize = () => {
    const newSize = circleSize.value >= 50 ? 40 : circleSize.value + 10;
    circleSize.value = withSpring(newSize, {
      damping: 10,
      stiffness: 100,
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY; 
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const tapGesture = Gesture.Tap().onEnd(() => {
    handleTapWorklet(tapCount, circleSize, toggleColor, increaseSize, setIsCircle);
  });

  const gesture = Gesture.Simultaneous(panGesture, tapGesture);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Animated.Text style={[styles.title, animatedTitleStyle]}>
        My Animated SVG
      </Animated.Text>

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.svgWrapper, animatedSvgStyle]}>
          <Svg height="100" width="100">
            {isCircle ? (
              <AnimatedCircle
                cx="50"
                cy="50"
                fill={circleColor}
                animatedProps={animatedCircleProps}
              />
            ) : (
              <AnimatedRect
                fill={circleColor}
                animatedProps={animatedRectProps}
              />
            )}
          </Svg>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginTop: 30,
    color: '#FACC15',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: 'black',
  },
  svgWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -50,
    marginTop: -50,
  },
});

