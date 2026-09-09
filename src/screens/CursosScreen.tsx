import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChevronRight, House, GraduationCap, MessageCircle, User } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, typeScale } from '../theme';
import { DarkHeader } from '../components/DarkHeader';
import { HomeCard } from '../components/HomeCard';
import { BottomNavBar } from '../components/BottomNavBar';
import { mockCursos } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Cursos'>;

export function CursosScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <DarkHeader>
        <Text style={styles.title}>Mis cursos</Text>
        <Text style={styles.subtitle}>{mockCursos.length} cursos asignados</Text>
      </DarkHeader>

      <ScrollView contentContainerStyle={styles.body}>
        {mockCursos.map((c) => (
          <Pressable key={c.id} onPress={() => navigation.navigate('CursoDetalle', { cursoId: c.id })}>
            <HomeCard style={styles.rowCard}>
              <View>
                <Text style={styles.cursoNombre}>{c.nombre}</Text>
                <Text style={styles.cursoMeta}>{c.ramo} · {c.estudiantes} estudiantes</Text>
              </View>
              <ChevronRight size={16} color={colors.gris400} strokeWidth={2} />
            </HomeCard>
          </Pressable>
        ))}
      </ScrollView>

      <BottomNavBar
        activeKey="cursos"
        items={[
          { key: 'inicio', label: 'Inicio', icon: House, onPress: () => navigation.goBack() },
          { key: 'cursos', label: 'Cursos', icon: GraduationCap },
          {
            key: 'mensajes',
            label: 'Mensajes',
            icon: MessageCircle,
            onPress: () => navigation.navigate('MensajesProfesor'),
          },
          { key: 'perfil', label: 'Perfil', icon: User, onPress: () => navigation.navigate('Perfil', { rol: 'profesor' }) },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  title: { ...typeScale.h2, color: colors.blanco },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  body: { padding: spacing.md + 2, gap: spacing.sm + 2 },
  rowCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cursoNombre: { fontSize: 14, fontWeight: '600', color: colors.noche },
  cursoMeta: { fontSize: 12, color: colors.gris400, marginTop: 1 },
});
