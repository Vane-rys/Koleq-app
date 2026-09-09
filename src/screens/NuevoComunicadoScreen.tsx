import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Users, Check, Upload } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { LightField } from '../components/LightField';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'NuevoComunicado'>;

export function NuevoComunicadoScreen({ navigation }: Props) {
  const [conCopia, setConCopia] = useState(true);
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const puedeEnviar = asunto.trim().length > 0 && mensaje.trim().length > 0;

  const onEnviar = () => {
    if (!puedeEnviar) return;
    Alert.alert('Comunicado enviado', conCopia ? 'Con copia a los apoderados.' : 'Solo a los alumnos.');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <BackLink label="Mensajes" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>Nuevo comunicado</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.label}>Destinatarios</Text>
          <HomeCard style={styles.destinatarioCard}>
            <Users size={16} color={colors.indigo} strokeWidth={2} />
            <Text style={styles.destinatarioText}>Alumnos · 6° Básico B</Text>
          </HomeCard>
          <Pressable onPress={() => setConCopia((v) => !v)}>
            <HomeCard style={[styles.destinatarioCard, styles.copiaCard, conCopia && styles.copiaCardActiva]}>
              <View style={[styles.checkBadge, conCopia && styles.checkBadgeActivo]}>
                {conCopia && <Check size={12} color={colors.blanco} strokeWidth={3} />}
              </View>
              <Text style={styles.destinatarioText}>Con copia a sus apoderados</Text>
            </HomeCard>
          </Pressable>
        </View>

        <LightField label="Asunto" value={asunto} onChangeText={setAsunto} placeholder="Contenidos prueba de fracciones" />

        <LightField
          label="Mensaje"
          value={mensaje}
          onChangeText={setMensaje}
          placeholder="La prueba del viernes incluye suma, resta y comparación de fracciones."
          multiline
          style={styles.mensajeInput}
        />

        <Pressable style={styles.uploadBox} onPress={() => Alert.alert('Adjuntar', 'Selector de archivos — próximamente.')}>
          <Upload size={16} color={colors.indigo} strokeWidth={2} />
          <Text style={styles.uploadText}>Adjuntar material</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={[styles.primaryButton, !puedeEnviar && styles.disabled]} disabled={!puedeEnviar} onPress={onEnviar}>
          <Text style={styles.primaryButtonText}>Enviar comunicado</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.blanco },
  header: { backgroundColor: colors.noche, paddingTop: 56, paddingBottom: 16, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { ...typeScale.h3, fontSize: 20, color: colors.blanco, marginTop: spacing.sm },
  body: { padding: spacing.md + 2, gap: spacing.md },
  label: { ...typeScale.caption, color: '#5A5A5A', marginBottom: 6 },
  destinatarioCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.xs + 2 },
  destinatarioText: { flex: 1, fontSize: 13, fontWeight: '600', color: colors.noche },
  copiaCard: {},
  copiaCardActiva: { borderColor: colors.indigo, backgroundColor: colors.cielo },
  checkBadge: { width: 20, height: 20, borderRadius: 5, borderWidth: 1.5, borderColor: colors.gris200, alignItems: 'center', justifyContent: 'center' },
  checkBadgeActivo: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  mensajeInput: { textAlignVertical: 'top', minHeight: 90 },
  uploadBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    borderRadius: radii.lg,
    paddingVertical: 14,
    backgroundColor: colors.niebla,
  },
  uploadText: { fontSize: 12, fontWeight: '600', color: colors.indigo },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  disabled: { opacity: 0.4 },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
