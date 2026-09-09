import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import type { RootStackParamList, Rol } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

// Isotipo pequeño para la cabecera del login (como en el mockup: ícono + "Koleq").
function MiniMark() {
  return (
    <Svg width={26} height={26} viewBox="0 0 48 48" fill="none">
      <Circle cx={16} cy={24} r={7} fill="white" opacity={0.92} />
      <Circle cx={36} cy={12} r={5.5} fill={colors.violeta} />
      <Circle cx={36} cy={36} r={5.5} fill={colors.violeta} />
    </Svg>
  );
}

const CONFIG: Record<
  Rol,
  {
    wordmarkSuffix: string;
    campoLabel: string;
    placeholder: string;
    keyboardType: 'default' | 'email-address';
    entrarLabel: string;
    mostrarOlvide: boolean;
    footerNota?: string;
    switchTo?: { rol: Rol; label: string };
  }
> = {
  apoderado: {
    wordmarkSuffix: '',
    campoLabel: 'Correo',
    placeholder: 'vanessa@correo.cl',
    keyboardType: 'email-address',
    entrarLabel: 'Entrar como apoderado/a',
    mostrarOlvide: true,
    switchTo: { rol: 'profesor', label: 'Soy profesor/a' },
  },
  profesor: {
    wordmarkSuffix: ' · Profesor',
    campoLabel: 'Correo',
    placeholder: 'carla.fuentes@colegio.cl',
    keyboardType: 'email-address',
    entrarLabel: 'Entrar como profesor/a',
    mostrarOlvide: false,
    switchTo: { rol: 'apoderado', label: 'Soy apoderado/a' },
  },
  estudiante: {
    wordmarkSuffix: ' · Estudiante',
    campoLabel: 'Usuario',
    placeholder: 'emilia.reyes',
    keyboardType: 'default',
    entrarLabel: 'Entrar',
    mostrarOlvide: false,
    footerNota: 'Usuario y contraseña los entrega tu colegio.',
  },
};

export function LoginScreen({ route, navigation }: Props) {
  const { rol } = route.params;
  const cfg = CONFIG[rol];

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const puedeEntrar = usuario.trim().length > 0 && password.length > 0;

  const onEntrar = () => {
    if (!puedeEntrar) return;
    // Sin backend todavía (datos de prueba) — navegamos directo a Home.
    navigation.reset({ index: 0, routes: [{ name: 'Home', params: { rol } }] });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <BackLink label="Atrás" onPress={() => navigation.goBack()} />

        <View style={styles.header}>
          <MiniMark />
          <Text style={styles.wordmark}>
            Kole<Text style={{ color: colors.violeta }}>q</Text>
            {cfg.wordmarkSuffix}
          </Text>
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.label}>{cfg.campoLabel}</Text>
            <TextInput
              style={styles.input}
              value={usuario}
              onChangeText={setUsuario}
              placeholder={cfg.placeholder}
              placeholderTextColor="rgba(255,255,255,0.3)"
              keyboardType={cfg.keyboardType}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="rgba(255,255,255,0.3)"
              secureTextEntry
            />
          </View>

          <Pressable
            style={[styles.primaryButton, !puedeEntrar && styles.disabled]}
            onPress={onEntrar}
            disabled={!puedeEntrar}
          >
            <Text style={styles.primaryButtonText}>{cfg.entrarLabel}</Text>
          </Pressable>

          {cfg.mostrarOlvide && (
            <Pressable
              onPress={() =>
                Alert.alert('Muy pronto', 'La recuperación de contraseña estará disponible acá.')
              }
            >
              <Text style={styles.olvide}>
                ¿Olvidaste tu contraseña? <Text style={styles.olvideLink}>Recupérala</Text>
              </Text>
            </Pressable>
          )}

          {cfg.footerNota && <Text style={styles.footerNota}>{cfg.footerNota}</Text>}
        </View>

        {cfg.switchTo && (
          <Pressable
            style={styles.outlineButton}
            onPress={() => navigation.setParams({ rol: cfg.switchTo!.rol })}
          >
            <Text style={styles.outlineButtonText}>{cfg.switchTo.label}</Text>
          </Pressable>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.noche },
  container: {
    flexGrow: 1,
    paddingTop: 64,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.xl,
  },
  header: {
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  wordmark: {
    ...typeScale.h3,
    color: colors.blanco,
  },
  form: {
    gap: spacing.lg,
  },
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
  primaryButton: {
    backgroundColor: colors.indigo,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  disabled: {
    opacity: 0.4,
  },
  primaryButtonText: {
    ...typeScale.button,
    color: colors.blanco,
  },
  olvide: {
    ...typeScale.caption,
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
  },
  olvideLink: {
    color: colors.blanco,
  },
  footerNota: {
    ...typeScale.caption,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
  },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  outlineButtonText: {
    ...typeScale.button,
    color: colors.blanco,
  },
});
