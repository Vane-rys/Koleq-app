import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Upload, FileCheck, X } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { mockPagos } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DatosTransferencia'>;

const FILAS: [string, string][] = [
  ['Banco', mockPagos.datosTransferencia.banco],
  ['Tipo de cuenta', mockPagos.datosTransferencia.tipoCuenta],
  ['N° de cuenta', mockPagos.datosTransferencia.numeroCuenta],
  ['RUT', mockPagos.datosTransferencia.rut],
  ['Nombre', mockPagos.datosTransferencia.nombre],
  ['Monto', mockPagos.pendiente.monto],
];

export function DatosTransferenciaScreen({ navigation }: Props) {
  // Sin backend aún, "adjuntar" solo simula que se eligió un archivo —
  // igual exige el paso antes de dejar marcar el pago como transferido.
  const [comprobante, setComprobante] = useState<string | null>(null);

  const onAdjuntar = () => setComprobante('comprobante-transferencia.pdf');

  const onYaTransferi = () => {
    if (!comprobante) return;
    Alert.alert(
      'Comprobante recibido',
      'Administración del colegio revisará que la transferencia llegó antes de darla por pagada. Te avisaremos cuando quede confirmada.'
    );
    navigation.navigate('Pagos', { estado: 'revision' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackLink label="Confirmar pago" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>Datos de transferencia</Text>
        <Text style={styles.subtitle}>
          {mockPagos.pendiente.titulo} · {mockPagos.pendiente.monto}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        <HomeCard style={styles.datosCard}>
          {FILAS.map(([label, valor], i) => (
            <View key={label} style={[styles.fila, i === FILAS.length - 1 && styles.filaMonto]}>
              <Text style={styles.filaLabel}>{label}</Text>
              <Text style={[styles.filaValor, i === FILAS.length - 1 && styles.filaValorMonto]}>{valor}</Text>
            </View>
          ))}
        </HomeCard>

        {comprobante ? (
          <HomeCard style={styles.adjuntoCard}>
            <FileCheck size={20} color={colors.exito} strokeWidth={2} />
            <Text style={styles.adjuntoNombre}>{comprobante}</Text>
            <Pressable hitSlop={8} onPress={() => setComprobante(null)}>
              <X size={16} color={colors.gris400} strokeWidth={2} />
            </Pressable>
          </HomeCard>
        ) : (
          <Pressable style={styles.uploadBox} onPress={onAdjuntar}>
            <Upload size={20} color={colors.indigo} strokeWidth={2} />
            <Text style={styles.uploadText}>Subir comprobante</Text>
          </Pressable>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={[styles.primaryButton, !comprobante && styles.disabled]}
          disabled={!comprobante}
          onPress={onYaTransferi}
        >
          <Text style={styles.primaryButtonText}>Ya transferí</Text>
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
  body: { padding: spacing.md + 2, gap: spacing.md },
  datosCard: { gap: spacing.xs + 4 },
  fila: { flexDirection: 'row', justifyContent: 'space-between' },
  filaMonto: {},
  filaLabel: { fontSize: 12, color: colors.gris400 },
  filaValor: { fontSize: 13, fontWeight: '600', color: colors.noche },
  filaValorMonto: { color: colors.indigo, fontFamily: 'PlusJakartaSans_700Bold' },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: colors.niebla,
    gap: 6,
  },
  uploadText: { fontSize: 12, fontWeight: '600', color: colors.indigo },
  adjuntoCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, backgroundColor: colors.exitoBg, borderColor: '#A8DDB8' },
  adjuntoNombre: { flex: 1, fontSize: 12, fontWeight: '600', color: colors.noche },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  disabled: { opacity: 0.4 },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
