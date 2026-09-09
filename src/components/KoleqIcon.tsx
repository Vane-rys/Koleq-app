import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';
import { colors } from '../theme';

const AnimatedLine = Animated.createAnimatedComponent(Line);

type Props = {
  size?: number;
  /** Si es false, se muestra estático (por ejemplo, en un ícono chico de header). */
  animated?: boolean;
};

// Isotipo de Koleq: 3 nodos conectados (apoderado-colegio-estudiante).
// Nodo principal (blanco, grande) = apoderado. Los otros dos (violeta) = colegio y estudiante.
// Las líneas "laten" suavemente en loop — representa la conexión activa entre los 3 actores.
export function KoleqIcon({ size = 52, animated = true }: Props) {
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    if (!animated) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false, // animamos un prop de SVG (opacity), no un style nativo
        }),
        Animated.timing(pulse, {
          toValue: 0.25,
          duration: 1400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [animated, pulse]);

  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <AnimatedLine x1={16} y1={24} x2={36} y2={12} stroke={colors.blanco} strokeWidth={2} opacity={animated ? pulse : 0.4} />
      <AnimatedLine x1={16} y1={24} x2={36} y2={36} stroke={colors.blanco} strokeWidth={2} opacity={animated ? pulse : 0.4} />
      <Circle cx={16} cy={24} r={7} fill={colors.blanco} opacity={0.92} />
      <Circle cx={36} cy={12} r={5.5} fill={colors.violeta} />
      <Circle cx={36} cy={36} r={5.5} fill={colors.violeta} />
    </Svg>
  );
}
