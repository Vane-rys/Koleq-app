import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  House,
  GraduationCap,
  MessageCircle,
  User,
  FileText,
  Sparkles,
  Megaphone,
  CalendarDays,
} from 'lucide-react-native';
import { colors, spacing, typeScale } from '../../theme';
import { DarkHeader } from '../../components/DarkHeader';
import { HomeCard } from '../../components/HomeCard';
import { QuickAction } from '../../components/QuickAction';
import { BottomNavBar } from '../../components/BottomNavBar';
import { Avatar } from '../../components/Avatar';
import { mockProfesor, mockAlumnos } from '../../data/mockHome';
import type { RootStackParamList } from '../../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Los accesos de Nota/Anotación abren la ficha de Emilia (única alumna con
// datos de prueba completos); en producción vendrían de elegir curso/alumno.
const ALUMNO_DEMO = mockAlumnos[0];

export function ProfesorHome({ navigation, onAbrirPerfil }: { navigation: Nav; onAbrirPerfil: () => void }) {
  return (
    <View style={styles.container}>
      <DarkHeader>
        <Text style={styles.hsub}>Hola, {mockProfesor.nombre} 👋</Text>
        <Text style={styles.htitle}>Esta semana</Text>
      </DarkHeader>

      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <CalendarDays size={16} color={colors.advertencia} strokeWidth={2} />
            <Text style={styles.alertTitle}>
              {mockProfesor.evaluacionesSemana.length} evaluaciones esta semana
            </Text>
          </View>
          {mockProfesor.evaluacionesSemana.map((ev) => (
            <Text key={ev.dia} style={styles.alertLine}>
              {ev.dia} · {ev.detalle}
            </Text>
          ))}
        </View>

        <View style={styles.quickRow}>
          <QuickAction
            icon={FileText}
            label="Nota"
            onPress={() => navigation.navigate('FichaAlumno', { alumnoId: ALUMNO_DEMO.id, tabInicial: 'nota' })}
          />
          <QuickAction
            icon={Sparkles}
            label="Anotación"
            onPress={() => navigation.navigate('FichaAlumno', { alumnoId: ALUMNO_DEMO.id, tabInicial: 'anotacion' })}
          />
          <QuickAction icon={Megaphone} label="Comunicado" onPress={() => navigation.navigate('NuevoComunicado')} />
        </View>

        <Text style={styles.sectionLabel}>Mensajes nuevos</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('Chat', {
              nombre: mockProfesor.mensajeNuevo.de,
              iniciales: mockProfesor.mensajeNuevo.iniciales,
              cargo: mockProfesor.mensajeNuevo.curso,
              rol: 'profesor',
            })
          }
        >
          <HomeCard style={styles.msgCard}>
            <Avatar iniciales={mockProfesor.mensajeNuevo.iniciales} bg={colors.cielo} color={colors.indigo} size={32} />
            <View style={styles.flex}>
              <Text style={styles.cardTitle}>{mockProfesor.mensajeNuevo.de}</Text>
              <Text style={styles.cardCurso}>{mockProfesor.mensajeNuevo.curso}</Text>
              <Text style={styles.cardPreview} numberOfLines={1}>
                {mockProfesor.mensajeNuevo.preview}
              </Text>
            </View>
          </HomeCard>
        </Pressable>
      </ScrollView>

      <BottomNavBar
        activeKey="inicio"
        items={[
          { key: 'inicio', label: 'Inicio', icon: House },
          { key: 'cursos', label: 'Cursos', icon: GraduationCap, onPress: () => navigation.navigate('Cursos') },
          { key: 'mensajes', label: 'Mensajes', icon: MessageCircle, onPress: () => navigation.navigate('MensajesProfesor') },
          { key: 'perfil', label: 'Perfil', icon: User, onPress: onAbrirPerfil },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  flex: { flex: 1 },
  hsub: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)' },
  htitle: { ...typeScale.h2, color: colors.blanco, marginTop: 2 },
  body: {
    padding: spacing.md + 2,
    gap: spacing.sm + 2,
  },
  alertCard: {
    backgroundColor: colors.advertenciaBg,
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 16,
    padding: spacing.sm + 6,
  },
  alertHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs + 2 },
  alertTitle: { fontSize: 12, fontWeight: '600', color: colors.advertencia },
  alertLine: { fontSize: 13, color: colors.advertencia, marginTop: spacing.xs + 2 },
  quickRow: { flexDirection: 'row', gap: spacing.sm + 2 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5A5A5A',
    marginTop: spacing.xs,
  },
  msgCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 2 },
  cardTitle: { fontSize: 13, fontWeight: '600', color: colors.noche },
  cardCurso: { fontSize: 11, fontWeight: '600', color: colors.indigo, marginTop: 1 },
  cardPreview: { fontSize: 12, color: colors.gris400, marginTop: 1 },
});
