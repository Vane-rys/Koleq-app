import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

type Props = {
  iniciales: string;
  size?: number;
  bg?: string;
  color?: string;
};

// Círculo con inicial(es), usado para apoderados/hijos/remitentes en tarjetas.
export function Avatar({ iniciales, size = 36, bg = colors.violeta, color = colors.blanco }: Props) {
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: bg },
      ]}
    >
      <Text style={[styles.letter, { color, fontSize: size * 0.38 }]}>{iniciales}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontFamily: fonts.displaySemiBold,
    fontWeight: '700',
  },
});
