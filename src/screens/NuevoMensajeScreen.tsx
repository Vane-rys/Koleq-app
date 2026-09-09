import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, radii, typeScale } from '../theme';
import { BackLink } from '../components/BackLink';
import { HomeCard } from '../components/HomeCard';
import { LightField } from '../components/LightField';
import { Avatar } from '../components/Avatar';
import { PickerModal } from '../components/PickerModal';
import { mockMensajes, mockMensajesEstudiante } from '../data/mockHome';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'NuevoMensaje'>;

export function NuevoMensajeScreen({ route, navigation }: Props) {
  const rol = route.params?.rol ?? 'apoderado';
  // Estudiante le escribe a sus profesores por ramo; apoderado, a los
  // contactos del colegio (mismos que en Mensajes).
  const CONTACTOS = rol === 'estudiante' ? mockMensajesEstudiante.conversaciones : mockMensajes.conversaciones;

  const [destinatarioId, setDestinatarioId] = useState(CONTACTOS[0].id);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const destinatario = CONTACTOS.find((c) => c.id === destinatarioId) ?? CONTACTOS[0];
  const puedeEnviar = mensaje.trim().length > 0;

  const onEnviar = () => {
    if (!puedeEnviar) return;
    Alert.alert('Mensaje enviado', `Tu mensaje a ${destinatario.nombre} fue enviado.`);
    navigation.navigate('Chat', {
      nombre: destinatario.nombre,
      iniciales: destinatario.iniciales,
      cargo: destinatario.cargo,
      rol,
    });
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <BackLink label="Mensajes" onPress={() => navigation.goBack()} light={false} />
        <Text style={styles.title}>Nuevo mensaje</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.label}>Para</Text>
          <Pressable onPress={() => setPickerVisible(true)}>
            <HomeCard style={styles.destinatarioCard}>
              <Avatar
                iniciales={destinatario.iniciales}
                bg={destinatario.destacado ? colors.violeta : colors.cielo}
                color={destinatario.destacado ? colors.blanco : colors.indigo}
                size={32}
              />
              <Text style={styles.destinatarioNombre}>
                {destinatario.nombre} · {destinatario.cargo}
              </Text>
              <ChevronDown size={16} color={colors.gris400} strokeWidth={2} />
            </HomeCard>
          </Pressable>
        </View>

        <LightField
          label="Asunto"
          value={asunto}
          onChangeText={setAsunto}
          placeholder="Ej: Consulta sobre la prueba"
        />

        <LightField
          label="Mensaje"
          value={mensaje}
          onChangeText={setMensaje}
          placeholder="Escribe tu mensaje aquí…"
          multiline
          style={styles.mensajeInput}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={[styles.primaryButton, !puedeEnviar && styles.disabled]} disabled={!puedeEnviar} onPress={onEnviar}>
          <Text style={styles.primaryButtonText}>Enviar mensaje</Text>
        </Pressable>
      </View>

      <PickerModal
        visible={pickerVisible}
        title="Elegir destinatario"
        items={CONTACTOS.map((c) => ({
          id: c.id,
          nombre: c.nombre,
          sublabel: c.cargo,
          iniciales: c.iniciales,
          destacado: c.destacado,
        }))}
        selectedIds={[destinatarioId]}
        onClose={() => setPickerVisible(false)}
        onConfirm={(ids) => setDestinatarioId(ids[0])}
        searchPlaceholder="Buscar contacto…"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.blanco },
  header: { backgroundColor: colors.noche, paddingTop: 64, paddingBottom: 20, paddingHorizontal: spacing.lg, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  title: { ...typeScale.h3, fontSize: 20, color: colors.blanco, marginTop: spacing.sm },
  body: { padding: spacing.md + 2, gap: spacing.md },
  label: { ...typeScale.caption, color: '#5A5A5A', marginBottom: 6 },
  destinatarioCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  destinatarioNombre: { flex: 1, fontSize: 13, fontWeight: '600', color: colors.noche },
  mensajeInput: { textAlignVertical: 'top', minHeight: 96 },
  footer: { padding: spacing.md + 2, paddingBottom: spacing.xl },
  primaryButton: { backgroundColor: colors.indigo, borderRadius: radii.pill, paddingVertical: spacing.md, alignItems: 'center' },
  disabled: { opacity: 0.4 },
  primaryButtonText: { ...typeScale.button, color: colors.blanco },
});
