import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Plus } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, typeScale } from '../theme';
import { DarkHeader } from '../components/DarkHeader';
import { HomeCard } from '../components/HomeCard';
import { BackLink } from '../components/BackLink';
import { Avatar } from '../components/Avatar';
import { mockMensajes } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Mensajes'>;

export function MensajesScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <DarkHeader>
        <View style={styles.headerRow}>
          <BackLink label="Inicio" onPress={() => navigation.goBack()} />
          <Pressable style={styles.addButton} onPress={() => navigation.navigate('NuevoMensaje')} hitSlop={8}>
            <Plus size={16} color={colors.blanco} strokeWidth={2} />
          </Pressable>
        </View>
        <Text style={styles.title}>Mensajes</Text>
        <Text style={styles.subtitle}>Colegio Los Aromos · toca + para escribir a un profesor</Text>
      </DarkHeader>

      <ScrollView contentContainerStyle={styles.body}>
        {mockMensajes.conversaciones.map((c) => (
          <Pressable
            key={c.id}
            onPress={() =>
              navigation.navigate('Chat', { nombre: c.nombre, iniciales: c.iniciales, cargo: c.cargo, rol: 'apoderado' })
            }
          >
            <HomeCard style={styles.rowCard}>
              <Avatar
                iniciales={c.iniciales}
                bg={c.destacado ? colors.violeta : colors.cielo}
                color={c.destacado ? colors.blanco : colors.indigo}
                size={40}
              />
              <View style={styles.flex}>
                <Text style={styles.nombre}>{c.nombre}</Text>
                <Text style={styles.preview} numberOfLines={1}>
                  {c.preview}
                </Text>
              </View>
              <View style={styles.metaCol}>
                <Text style={styles.hora}>{c.hora}</Text>
                {c.noLeido && <View style={styles.dot} />}
              </View>
            </HomeCard>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  flex: { flex: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.indigo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { ...typeScale.h2, color: colors.blanco, marginTop: spacing.sm },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  body: { padding: spacing.md + 2, gap: spacing.sm + 2 },
  rowCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4 },
  nombre: { fontSize: 14, fontWeight: '600', color: colors.noche },
  preview: { fontSize: 13, color: colors.gris400, marginTop: 1 },
  metaCol: { alignItems: 'flex-end', gap: 6 },
  hora: { fontSize: 11, color: colors.gris400 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.indigo },
});
