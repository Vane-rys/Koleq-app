import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Upload, FileText, CircleCheck, Clock } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { LightField } from '../components/LightField';
import { mockApoderado } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'LicenciaMedica'>;
type Etapa = 'formulario' | 'enviada';

const hijo = mockApoderado.hijos[0];

export function LicenciaMedicaScreen({ navigation }: Props) {
  const [etapa, setEtapa] = useState<Etapa>('formulario');
  const [desde, setDesde] = useState('08 sep');
  const [hasta, setHasta] = useState('10 sep');
  const [motivo, setMotivo] = useState('');
  const [archivo, setArchivo] = useState<string | null>(null);

  const puedeEnviar = desde.trim().length > 0 && hasta.trim().length > 0 && motivo.trim().length > 0;

  const onAdjuntar = () => {
    // Sin selector de archivos real todavía — simulamos el adjunto.
    setArchivo(`licencia_${hijo.nombre.toLowerCase().replace(' ', '_')}.pdf`);
  };

  const onEnviar = () => {
    if (!puedeEnviar) return;
    setEtapa('enviada');
  };

  if (etapa === 'enviada') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Licencia enviada</Text>
          <Text style={styles.subtitle}>
            {hijo.nombre} · {desde}–{hasta}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.enviadaBody}>
          <View style={styles.checkCircle}>
            <CircleCheck size={30} color={colors.exito} strokeWidth={2} />
          </View>
          <Text style={styles.enviadaTexto}>
            Recibimos tu licencia. El colegio la revisará y te avisaremos apenas quede aprobada.
          </Text>

          <View style={styles.timeline}>
            <View style={styles.timelineRow}>
              <CircleCheck size={16} color={colors.exito} strokeWidth={2} />
              <Text style={styles.timelineLabelActivo}>Enviada</Text>
            </View>
            <View style={styles.timelineRowActivo}>
              <Clock size={16} color={colors.advertencia} strokeWidth={2} />
              <Text style={styles.timelineLabelEnRevision}>En revisión</Text>
            </View>
            <View style={[styles.timelineRow, styles.timelineRowPendiente]}>
              <CircleCheck size={16} color="#5A5A5A" strokeWidth={2} />
              <Text style={styles.timelineLabelPendiente}>Aprobada</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.outlineButton} onPress={() => navigation.goBack()}>
            <Text style={styles.outlineButtonText}>Volver al inicio</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <BackLink label="Inicio" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>Licencia médica</Text>
        <Text style={styles.subtitle}>{hijo.nombre} · {hijo.curso}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <View style={styles.fechasRow}>
          <View style={styles.flex}>
            <LightField label="Desde" value={desde} onChangeText={setDesde} placeholder="08 sep" />
          </View>
          <View style={styles.flex}>
            <LightField label="Hasta" value={hasta} onChangeText={setHasta} placeholder="10 sep" />
          </View>
        </View>

        <LightField label="Motivo" value={motivo} onChangeText={setMotivo} placeholder="Ej: Cuadro gripal" />

        {archivo ? (
          <HomeCard style={styles.archivoCard}>
            <View style={styles.archivoIcon}>
              <FileText size={18} color={colors.indigo} strokeWidth={2} />
            </View>
            <View style={styles.flex}>
              <Text style={styles.archivoNombre} numberOfLines={1}>{archivo}</Text>
              <Text style={styles.archivoMeta}>PDF · 842 KB</Text>
            </View>
            <CircleCheck size={16} color={colors.exito} strokeWidth={2} />
          </HomeCard>
        ) : (
          <Pressable style={styles.uploadBox} onPress={onAdjuntar}>
            <Upload size={22} color={colors.indigo} strokeWidth={2} />
            <Text style={styles.uploadText}>Sube una foto o PDF</Text>
            <Text style={styles.uploadSubtext}>de la licencia médica</Text>
          </Pressable>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={[styles.primaryButton, !puedeEnviar && styles.disabled]} disabled={!puedeEnviar} onPress={onEnviar}>
          <Text style={styles.primaryButtonText}>Enviar licencia</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.blanco },
  header: { backgroundColor: colors.noche, paddingTop: 64, paddingBottom: 20, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { ...typeScale.h2, color: colors.blanco, marginTop: spacing.sm },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  body: { padding: spacing.md + 2, gap: spacing.md },
  fechasRow: { flexDirection: 'row', gap: spacing.sm + 2 },
  archivoCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 2, borderColor: '#C7D2FE', backgroundColor: colors.niebla },
  archivoIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.cielo, alignItems: 'center', justifyContent: 'center' },
  archivoNombre: { fontSize: 13, fontWeight: '600', color: colors.noche },
  archivoMeta: { fontSize: 11, color: colors.gris400 },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    backgroundColor: colors.niebla,
    gap: 4,
  },
  uploadText: { fontSize: 13, fontWeight: '600', color: colors.indigo, marginTop: 4 },
  uploadSubtext: { fontSize: 11, color: colors.gris400 },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  disabled: { opacity: 0.4 },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
  enviadaBody: { padding: spacing.lg, alignItems: 'center', gap: spacing.md },
  checkCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.exitoBg,
    borderWidth: 1,
    borderColor: '#A8DDB8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enviadaTexto: { fontSize: 13, color: '#5A5A5A', textAlign: 'center' },
  timeline: { width: '100%', gap: spacing.sm + 2, marginTop: spacing.sm },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.blanco,
    borderWidth: 1,
    borderColor: colors.gris200,
    borderRadius: 16,
    padding: spacing.sm + 6,
  },
  timelineRowActivo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.advertenciaBg,
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 16,
    padding: spacing.sm + 6,
  },
  timelineRowPendiente: { opacity: 0.4 },
  timelineLabelActivo: { fontSize: 13, fontWeight: '600', color: colors.noche },
  timelineLabelEnRevision: { fontSize: 13, fontWeight: '600', color: colors.advertencia },
  timelineLabelPendiente: { fontSize: 13, color: '#5A5A5A' },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: colors.gris200,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  outlineButtonText: { ...typeScale.button, color: colors.noche },
});
