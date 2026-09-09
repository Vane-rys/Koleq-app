import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CreditCard, Landmark } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { mockPagos } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmarPago'>;
type Metodo = 'tarjeta' | 'transferencia';

export function ConfirmarPagoScreen({ navigation }: Props) {
  const [metodo, setMetodo] = useState<Metodo>('tarjeta');

  const onConfirmar = () => {
    if (metodo === 'transferencia') {
      navigation.navigate('DatosTransferencia');
    } else {
      navigation.navigate('PagoTarjeta');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackLink label="Pagos" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>Confirmar pago</Text>
        <Text style={styles.subtitle}>
          {mockPagos.pendiente.titulo} · {mockPagos.pendiente.monto}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.sectionLabel}>Método de pago</Text>

        <Pressable onPress={() => setMetodo('tarjeta')}>
          <HomeCard style={[styles.metodoCard, metodo === 'tarjeta' && styles.metodoCardActiva]}>
            <CreditCard size={18} color={colors.indigo} strokeWidth={2} />
            <Text style={styles.metodoLabel}>Tarjeta débito/crédito</Text>
            <View style={[styles.radio, metodo === 'tarjeta' && styles.radioActivo]} />
          </HomeCard>
        </Pressable>

        <Pressable onPress={() => setMetodo('transferencia')}>
          <HomeCard style={[styles.metodoCard, metodo === 'transferencia' && styles.metodoCardActiva]}>
            <Landmark size={18} color={colors.gris400} strokeWidth={2} />
            <Text style={styles.metodoLabel}>Transferencia</Text>
            <View style={[styles.radio, metodo === 'transferencia' && styles.radioActivo]} />
          </HomeCard>
        </Pressable>

        <Text style={styles.nota}>
          Al elegirla verás los datos bancarios del colegio y podrás subir tu comprobante.
        </Text>

        <HomeCard style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total a pagar</Text>
          <Text style={styles.totalValor}>{mockPagos.pendiente.monto}</Text>
        </HomeCard>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.primaryButton} onPress={onConfirmar}>
          <Text style={styles.primaryButtonText}>Confirmar pago</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.blanco },
  header: { backgroundColor: colors.noche, paddingTop: 56, paddingBottom: 16, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { ...typeScale.h3, fontSize: 20, color: colors.blanco, marginTop: spacing.sm },
  subtitle: { ...typeScale.caption, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  body: { padding: spacing.md + 2, gap: spacing.sm + 2 },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: '#5A5A5A' },
  metodoCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm + 4 },
  metodoCardActiva: { borderWidth: 1.5, borderColor: colors.indigo, backgroundColor: colors.cielo },
  metodoLabel: { flex: 1, fontSize: 13, fontWeight: '600', color: colors.noche },
  radio: { width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: colors.gris200 },
  radioActivo: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  nota: { fontSize: 11, color: colors.gris400, paddingHorizontal: 4 },
  totalCard: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xs },
  totalLabel: { fontSize: 13, color: '#5A5A5A' },
  totalValor: { fontFamily: 'PlusJakartaSans_700Bold', color: colors.noche, fontSize: 14 },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
