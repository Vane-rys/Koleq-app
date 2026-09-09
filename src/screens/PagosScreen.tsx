import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CircleAlert, Clock, House, GraduationCap, FileText, User } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { DarkHeader } from '../components/DarkHeader';
import { HomeCard } from '../components/HomeCard';
import { BackLink } from '../components/BackLink';
import { BottomNavBar } from '../components/BottomNavBar';
import { mockApoderado, mockPagos } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Pagos'>;
type Estado = 'pendiente' | 'revision' | 'pagado';

const hijo = mockApoderado.hijos[0];

export function PagosScreen({ navigation, route }: Props) {
  const [estado, setEstado] = useState<Estado>(route.params?.estado ?? 'pendiente');

  // ConfirmarPago (tarjeta) navega de vuelta con { estado: 'pagado' } — el
  // pago con tarjeta se confirma al instante. DatosTransferencia navega con
  // { estado: 'revision' }: una transferencia no se puede dar por pagada
  // hasta que administración del colegio verifique que el dinero llegó.
  useEffect(() => {
    if (route.params?.estado) setEstado(route.params.estado);
  }, [route.params?.estado]);

  return (
    <View style={styles.container}>
      <DarkHeader>
        <BackLink
          label="Inicio"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home', params: { rol: 'apoderado' } }] })}
        />
        <Text style={styles.title}>Pagos</Text>
        <Text style={styles.subtitle}>{hijo.nombre} · {hijo.curso}</Text>
      </DarkHeader>

      <ScrollView contentContainerStyle={styles.body}>
        {estado === 'pagado' && (
          <HomeCard style={styles.pagadoCard}>
            <Text style={styles.pagadoLabel}>Al día</Text>
            <Text style={styles.pagadoTitulo}>{mockPagos.pendiente.titulo}</Text>
            <Text style={styles.pagadoNota}>Pagado hoy · {mockPagos.pendiente.monto}</Text>
          </HomeCard>
        )}

        {estado === 'revision' && (
          <HomeCard style={styles.revisionCard}>
            <View style={styles.revisionHeader}>
              <Text style={styles.revisionLabel}>En revisión</Text>
              <Clock size={16} color={colors.info} strokeWidth={2} />
            </View>
            <Text style={styles.revisionTitulo}>{mockPagos.pendiente.titulo}</Text>
            <Text style={styles.revisionNota}>
              Recibimos tu comprobante · {mockPagos.pendiente.monto}
            </Text>
            <Text style={styles.revisionAyuda}>
              Administración del colegio está verificando que la transferencia llegó. Te
              avisaremos cuando quede confirmada.
            </Text>
          </HomeCard>
        )}

        {estado === 'pendiente' && (
          <View style={styles.pendienteCard}>
            <View style={styles.pendienteHeader}>
              <Text style={styles.pendienteLabel}>Pendiente</Text>
              <CircleAlert size={16} color={colors.error} strokeWidth={2} />
            </View>
            <Text style={styles.pendienteTitulo}>{mockPagos.pendiente.titulo}</Text>
            <Text style={styles.pendienteVence}>
              Vence en {mockPagos.pendiente.venceDias} días · {mockPagos.pendiente.monto}
            </Text>
            <Pressable style={styles.pagarButton} onPress={() => navigation.navigate('ConfirmarPago')}>
              <Text style={styles.pagarButtonText}>Pagar ahora</Text>
            </Pressable>
          </View>
        )}

        <Text style={styles.sectionLabel}>Historial</Text>
        {mockPagos.historial.map((h) => (
          <HomeCard key={h.mes} style={styles.rowCard}>
            <View>
              <Text style={styles.mesNombre}>{h.mes}</Text>
              <Text style={styles.mesEstado}>{h.estado}</Text>
            </View>
            <Text style={styles.mesMonto}>{h.monto}</Text>
          </HomeCard>
        ))}
      </ScrollView>

      <BottomNavBar
        activeKey="pagos"
        items={[
          {
            key: 'inicio',
            label: 'Inicio',
            icon: House,
            onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home', params: { rol: 'apoderado' } }] }),
          },
          { key: 'notas', label: 'Notas', icon: GraduationCap, onPress: () => navigation.navigate('Notas') },
          { key: 'hoja', label: 'Hoja de vida', icon: FileText, onPress: () => navigation.navigate('HojaDeVida') },
          { key: 'perfil', label: 'Perfil', icon: User, onPress: () => navigation.navigate('Perfil', { rol: 'apoderado' }) },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  title: { ...typeScale.h2, color: colors.blanco, marginTop: spacing.sm },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  body: { padding: spacing.md + 2, gap: spacing.sm + 2 },
  pendienteCard: {
    backgroundColor: colors.errorBg,
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 16,
    padding: spacing.sm + 6,
  },
  pendienteHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pendienteLabel: { fontSize: 11, fontWeight: '700', color: colors.error, textTransform: 'uppercase', letterSpacing: 0.5 },
  pendienteTitulo: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 20, color: colors.noche, marginTop: 6 },
  pendienteVence: { fontSize: 13, color: colors.error, marginTop: 2 },
  pagarButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: 12, alignItems: 'center', marginTop: 14 },
  pagarButtonText: { ...typeScale.button, color: colors.blanco },
  pagadoCard: { backgroundColor: colors.exitoBg, borderColor: '#A8DDB8' },
  pagadoLabel: { fontSize: 11, fontWeight: '700', color: colors.exito, textTransform: 'uppercase', letterSpacing: 0.5 },
  pagadoTitulo: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 18, color: colors.noche, marginTop: 6 },
  pagadoNota: { fontSize: 13, color: colors.exito, marginTop: 2 },
  revisionCard: {
    backgroundColor: colors.infoBg,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderRadius: 16,
    padding: spacing.sm + 6,
  },
  revisionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  revisionLabel: { fontSize: 11, fontWeight: '700', color: colors.info, textTransform: 'uppercase', letterSpacing: 0.5 },
  revisionTitulo: { fontFamily: 'PlusJakartaSans_700Bold', fontSize: 18, color: colors.noche, marginTop: 6 },
  revisionNota: { fontSize: 13, color: colors.info, marginTop: 2 },
  revisionAyuda: { fontSize: 12, color: '#5A5A5A', marginTop: 10, lineHeight: 17 },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: '#5A5A5A', marginTop: spacing.xs },
  rowCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mesNombre: { fontSize: 13, fontWeight: '600', color: colors.noche },
  mesEstado: { fontSize: 12, color: colors.exito, marginTop: 1 },
  mesMonto: { fontSize: 13, fontWeight: '600', color: colors.noche },
});
