import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, spacing, typeScale } from '../theme';
import { HomeCard } from './HomeCard';

type Props = TextInputProps & {
  label: string;
};

// Campo de formulario sobre fondo claro (Registro, Nuevo mensaje, Licencia
// médica) — reproduce el estilo .card usado como input en el handoff.
export function LightField({ label, style, ...inputProps }: Props) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <HomeCard style={styles.card}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.gris400}
          {...inputProps}
        />
      </HomeCard>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typeScale.caption,
    color: '#5A5A5A',
    marginBottom: 6,
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  input: {
    fontSize: 13,
    color: colors.noche,
    padding: 0,
  },
});
