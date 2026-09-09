import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { DarkField } from '../components/DarkField';
import { HomeCard } from '../components/HomeCard';
import { Avatar } from '../components/Avatar';
import { mockApoderado } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Registro'>;

// Registro de apoderado en 2 pasos, tal como en el handoff: datos personales
// y luego confirmar los hijos que el colegio ya vinculó a ese RUT.
export function RegistroScreen({ navigation }: Props) {
  const [paso, setPaso] = useState<1 | 2>(1);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rut, setRut] = useState('');

  const paso1Completo =
    nombre.trim().length > 0 && correo.trim().length > 0 && password.length > 0 && rut.trim().length > 0;

  const onVolver = () => {
    if (paso === 2) {
      setPaso(1);
    } else {
      navigation.goBack();
    }
  };

  const onFinalizar = () => {
    navigation.reset({ index: 0, routes: [{ name: 'Home', params: { rol: 'apoderado' } }] });
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <BackLink label={paso === 2 ? 'Tus datos' : 'Elige tu rol'} onPress={onVolver} />

        <View style={styles.headerBlock}>
          <Text style={styles.title}>{paso === 1 ? 'Crear tu cuenta' : 'Tus hijos vinculados'}</Text>
          <Text style={styles.subtitle}>Paso {paso} de 2 · {paso === 1 ? 'Tus datos' : 'Confirmar'}</Text>
          <View style={styles.progressRow}>
            <View style={styles.progressBar} />
            <View style={[styles.progressBar, paso === 1 && styles.progressBarInactive]} />
          </View>
        </View>

        {paso === 1 ? (
          <View style={styles.form}>
            <DarkField label="Nombre completo" value={nombre} onChangeText={setNombre} placeholder="Vanessa Reyes" />
            <DarkField
              label="Correo"
              value={correo}
              onChangeText={setCorreo}
              placeholder="vanessa@correo.cl"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <DarkField
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
            />
            <DarkField label="RUT" value={rut} onChangeText={setRut} placeholder="12.345.678-9" />

            <Pressable
              style={[styles.primaryButton, !paso1Completo && styles.disabled]}
              disabled={!paso1Completo}
              onPress={() => setPaso(2)}
            >
              <Text style={styles.primaryButtonText}>Continuar</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.detectados}>Detectamos estos estudiantes asociados a tu RUT</Text>
            {mockApoderado.hijos.map((hijo) => (
              <HomeCard key={hijo.id} style={styles.hijoCard}>
                <Avatar iniciales={hijo.iniciales} />
                <View style={styles.flex}>
                  <Text style={styles.hijoNombre}>{hijo.nombre}</Text>
                  <Text style={styles.hijoCurso}>{hijo.curso} · Colegio Los Aromos</Text>
                </View>
                <View style={styles.checkBadge}>
                  <Check size={14} color={colors.blanco} strokeWidth={2.5} />
                </View>
              </HomeCard>
            ))}
            <Text style={styles.nota}>
              ¿No aparece tu hijo/a? El colegio debe registrarlo primero con tu RUT.
            </Text>

            <Pressable style={styles.primaryButton} onPress={onFinalizar}>
              <Text style={styles.primaryButtonText}>Vincular y finalizar</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    backgroundColor: colors.noche,
    paddingTop: 64,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  headerBlock: { marginTop: spacing.sm },
  title: { ...typeScale.h2, color: colors.blanco },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 4 },
  progressRow: { flexDirection: 'row', gap: 4, marginTop: 14 },
  progressBar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.blanco },
  progressBarInactive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  form: { gap: spacing.md },
  detectados: { fontSize: 13, color: 'rgba(255,255,255,0.55)' },
  hijoCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)' },
  hijoNombre: { fontSize: 14, fontWeight: '600', color: colors.blanco },
  hijoCurso: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 1 },
  checkBadge: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: colors.violeta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nota: { fontSize: 12, color: 'rgba(255,255,255,0.4)' },
  primaryButton: {
    backgroundColor: colors.indigo,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  disabled: { opacity: 0.4 },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
