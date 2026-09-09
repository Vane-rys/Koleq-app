import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radii, typeScale } from '../theme';

type Props = TextInputProps & {
  label: string;
};

// Campo de formulario sobre fondo oscuro (Login, Registro paso 1) —
// reproduce la clase .input-dark del handoff.
export function DarkField({ label, style, ...inputProps }: Props) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="rgba(255,255,255,0.3)"
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typeScale.caption,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: radii.pill,
    paddingVertical: 14,
    paddingHorizontal: 18,
    color: colors.blanco,
    fontSize: 14,
  },
});
