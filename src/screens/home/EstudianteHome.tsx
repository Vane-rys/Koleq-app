import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  House,
  GraduationCap,
  Briefcase,
  MessageCircle,
  User,
  CalendarDays,
  Award,
  Star,
  History,
} from 'lucide-react-native';
import { colors, spacing, typeScale, fonts } from '../../theme';
import { DarkHeader } from '../../components/DarkHeader';
import { HomeCard } from '../../components/HomeCard';
import { QuickAction } from '../../components/QuickAction';
import { BottomNavBar } from '../../components/BottomNavBar';
import { mockEstudiante } from '../../data/mockHome';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const MEDALLA_ICONO = { 'buena-onda': Award, 'top-esfuerzo': Star, constancia: History } as const;
const MEDALLA_BG = { 'buena-onda': colors.violeta, 'top-esfuerzo': colors.indigo } as const;

export function EstudianteHome({ navigation, onAbrirPerfil }: { navigation: Nav; onAbrirPerfil: () => void }) {
  return (
    <View style={styles.container}>
      <DarkHeader>
        <Text style={styles.hsub}>Hola, {mockEstudiante.nombre} 👋</Text>
        <Text style={styles.htitle}>🔥 {mockEstudiante.rachaDias} días de racha</Text>
        <Text style={styles.streakNote}>
          Has asistido {mockEstudiante.rachaDias} días seguidos. Si faltas un día, vuelve a
          empezar.
        </Text>

        <View style={styles.medallasRow}>
          {mockEstudiante.medallas.map((m) => {
            const Icon = MEDALLA_ICONO[m.key as keyof typeof MEDALLA_ICONO];
            const bg = MEDALLA_BG[m.key as keyof typeof MEDALLA_BG];
            return (
              <View key={m.key} style={[styles.medallaWrap, !m.ganada && styles.medallaSinGanar]}>
                <View
                  style={[
                    styles.medallaCircle,
                    m.ganada
                      ? { backgroundColor: bg }
                      : { borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)', borderStyle: 'dashed' },
                  ]}
                >
                  <Icon size={m.ganada ? 18 : 16} color={colors.blanco} strokeWidth={2} />
                </View>
                <Text style={styles.medallaLabel}>{m.label}</Text>
              </View>
            );
          })}
        </View>
      </DarkHeader>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.alertCard}>
          <CalendarDays size={16} color={colors.advertencia} strokeWidth={2} />
          <Text style={styles.alertTitle}>{mockEstudiante.proximaEvaluacion}</Text>
        </View>

        <View style={styles.quickRow}>
          <QuickAction icon={GraduationCap} label="Notas" onPress={() => navigation.navigate('NotasEstudiante')} />
          <QuickAction icon={CalendarDays} label="Agenda" onPress={() => navigation.navigate('Agenda')} />
          <QuickAction icon={Briefcase} label="Trabajos" onPress={() => navigation.navigate('Trabajos')} />
        </View>

        <Text style={styles.sectionLabel}>Notas nuevas</Text>
        <Pressable onPress={() => navigation.navigate('NotasEstudiante')}>
          <HomeCard style={styles.rowCard}>
            <View>
              <Text style={styles.cardTitle}>{mockEstudiante.notaNueva.ramo}</Text>
              <Text style={styles.cardSubtitle}>{mockEstudiante.notaNueva.detalle}</Text>
            </View>
            <Text style={styles.notaValor}>{mockEstudiante.notaNueva.nota}</Text>
          </HomeCard>
        </Pressable>
      </ScrollView>

      <BottomNavBar
        activeKey="inicio"
        items={[
          { key: 'inicio', label: 'Inicio', icon: House },
          { key: 'notas', label: 'Notas', icon: GraduationCap, onPress: () => navigation.navigate('NotasEstudiante') },
          { key: 'trabajos', label: 'Trabajos', icon: Briefcase, onPress: () => navigation.navigate('Trabajos') },
          { key: 'mensajes', label: 'Mensajes', icon: MessageCircle, onPress: () => navigation.navigate('MensajesEstudiante') },
          { key: 'perfil', label: 'Perfil', icon: User, onPress: onAbrirPerfil },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  hsub: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)' },
  htitle: { ...typeScale.h2, color: colors.blanco, marginTop: 2 },
  streakNote: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  medallasRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: spacing.sm + 4,
    marginTop: spacing.sm + 6,
  },
  medallaWrap: { flex: 1, alignItems: 'center' },
  medallaSinGanar: { opacity: 0.3 },
  medallaCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medallaLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, marginTop: 4 },
  body: {
    padding: spacing.md + 2,
    gap: spacing.sm + 2,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.advertenciaBg,
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 16,
    padding: spacing.sm + 4,
  },
  alertTitle: { fontSize: 13, fontWeight: '600', color: colors.advertencia, flexShrink: 1 },
  quickRow: { flexDirection: 'row', gap: spacing.sm + 2 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5A5A5A',
    marginTop: spacing.xs,
  },
  rowCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 13, fontWeight: '600', color: colors.noche },
  cardSubtitle: { fontSize: 12, color: colors.gris400, marginTop: 1 },
  notaValor: { fontFamily: fonts.displayBold, color: colors.indigo, fontSize: 15 },
});
