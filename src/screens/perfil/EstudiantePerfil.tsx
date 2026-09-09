import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Bell, CircleHelp, ChevronRight, FileText, LogOut, ShieldCheck,
  GraduationCap, House, Briefcase, MessageCircle, User, Award, Star, History,
} from 'lucide-react-native';
import { colors, spacing, radii, typeScale, fonts } from '../../theme';
import { DarkHeader } from '../../components/DarkHeader';
import { BackLink } from '../../components/BackLink';
import { HomeCard } from '../../components/HomeCard';
import { Avatar } from '../../components/Avatar';
import { BottomNavBar } from '../../components/BottomNavBar';
import { mockEstudiante } from '../../data/mockHome';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Perfil'>;

const MEDALLA_ICONO = { 'buena-onda': Award, 'top-esfuerzo': Star, constancia: History } as const;

const OPCIONES = [
  { key: 'notificaciones', label: 'Notificaciones', icon: Bell },
  { key: 'privacidad', label: 'Privacidad y datos', icon: ShieldCheck },
  { key: 'terminos', label: 'Términos y condiciones', icon: FileText },
  { key: 'ayuda', label: 'Ayuda y soporte', icon: CircleHelp },
];

export function EstudiantePerfil({ navigation }: { navigation: Nav }) {
  const onCerrarSesion = () => {
    Alert.alert('Cerrar sesión', '¿Seguro que quieres salir de tu cuenta Koleq?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Cerrar sesión',
        style: 'destructive',
        onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Bienvenida' }] }),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <DarkHeader>
        <BackLink label="Inicio" onPress={() => navigation.goBack()} />
        <View style={styles.perfilHeader}>
          <Avatar iniciales={mockEstudiante.nombre[0]} bg={colors.violeta} size={64} />
          <Text style={styles.nombre}>{mockEstudiante.nombre} {mockEstudiante.apellido}</Text>
          <Text style={styles.curso}>{mockEstudiante.curso}</Text>
        </View>
      </DarkHeader>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.rachaCard}>
          <Text style={styles.rachaTitulo}>🔥 {mockEstudiante.rachaDias} días de racha</Text>
        </View>

        <Text style={styles.sectionLabel}>Mis medallas</Text>
        <View style={styles.medallasRow}>
          {mockEstudiante.medallas.map((m) => {
            const Icon = MEDALLA_ICONO[m.key as keyof typeof MEDALLA_ICONO];
            return (
              <HomeCard key={m.key} style={[styles.medallaCard, !m.ganada && styles.medallaSinGanar]}>
                <View style={[styles.medallaCircle, { backgroundColor: m.ganada ? colors.violeta : colors.niebla }]}>
                  <Icon size={18} color={m.ganada ? colors.blanco : colors.gris400} strokeWidth={2} />
                </View>
                <Text style={styles.medallaLabel}>{m.label}</Text>
              </HomeCard>
            );
          })}
        </View>

        <Text style={styles.sectionLabel}>Cuenta</Text>
        <HomeCard style={styles.opcionesCard}>
          {OPCIONES.map((o, i) => (
            <Pressable
              key={o.key}
              style={[styles.opcionRow, i > 0 && styles.opcionBorde]}
              onPress={() => Alert.alert(o.label, 'Esta sección se conectará más adelante.')}
            >
              <o.icon size={18} color={colors.gris400} strokeWidth={2} />
              <Text style={styles.opcionLabel}>{o.label}</Text>
              <ChevronRight size={16} color={colors.gris400} strokeWidth={2} />
            </Pressable>
          ))}
        </HomeCard>

        <Pressable style={styles.cerrarSesionButton} onPress={onCerrarSesion}>
          <LogOut size={16} color={colors.error} strokeWidth={2} />
          <Text style={styles.cerrarSesionText}>Cerrar sesión</Text>
        </Pressable>
      </ScrollView>

      <BottomNavBar
        activeKey="perfil"
        items={[
          { key: 'inicio', label: 'Inicio', icon: House, onPress: () => navigation.goBack() },
          { key: 'notas', label: 'Notas', icon: GraduationCap, onPress: () => navigation.navigate('NotasEstudiante') },
          { key: 'trabajos', label: 'Trabajos', icon: Briefcase, onPress: () => navigation.navigate('Trabajos') },
          { key: 'mensajes', label: 'Mensajes', icon: MessageCircle, onPress: () => navigation.navigate('MensajesEstudiante') },
          { key: 'perfil', label: 'Perfil', icon: User },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  perfilHeader: { alignItems: 'center', marginTop: spacing.md, gap: 4 },
  nombre: { ...typeScale.h3, fontSize: 18, color: colors.blanco, marginTop: spacing.sm },
  curso: { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
  body: { padding: spacing.md + 2, gap: spacing.sm + 2, paddingBottom: spacing.xl },
  rachaCard: { backgroundColor: colors.niebla, borderRadius: radii.lg, padding: spacing.sm + 6, alignItems: 'center' },
  rachaTitulo: { fontFamily: fonts.displayBold, fontSize: 15, color: colors.noche },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: '#5A5A5A', marginTop: spacing.xs },
  medallasRow: { flexDirection: 'row', gap: spacing.sm },
  medallaCard: { flex: 1, alignItems: 'center', paddingVertical: 14, gap: 8 },
  medallaSinGanar: { opacity: 0.5 },
  medallaCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  medallaLabel: { fontSize: 11, fontWeight: '600', color: colors.noche, textAlign: 'center' },
  opcionesCard: { padding: 0, overflow: 'hidden' },
  opcionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4, paddingVertical: 13, paddingHorizontal: spacing.sm + 6 },
  opcionBorde: { borderTopWidth: 1, borderTopColor: colors.gris200 },
  opcionLabel: { flex: 1, fontSize: 13, fontWeight: '600', color: colors.noche },
  cerrarSesionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#FECACA',
    marginTop: spacing.xs,
  },
  cerrarSesionText: { fontSize: 13, fontWeight: '700', color: colors.error },
});
