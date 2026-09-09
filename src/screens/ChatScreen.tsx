import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ChevronLeft, Send } from 'lucide-react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, spacing, typeScale } from '../theme';
import { Avatar } from '../components/Avatar';
import type { RootStackParamList, Rol } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

type Burbuja = { id: string; texto: string; propia: boolean };

// Conversación de ejemplo — el contenido real vendrá con el backend. La
// muestra sí depende del rol desde el que se abre el chat, para que
// "propia" (el lado derecho, en índigo) sea siempre quien está mirando la
// pantalla y el diálogo tenga sentido desde su punto de vista.
const CONVERSACIONES: Record<Rol, Burbuja[]> = {
  apoderado: [
    { id: '1', texto: 'Buenos días, quería avisarle que Emilia llegó 15 min atrasada hoy.', propia: false },
    { id: '2', texto: 'Gracias por avisar, hablaré con ella. ¿Todo bien igual?', propia: true },
    { id: '3', texto: 'Sí, tranquila. Solo quedó registrado como seguimiento.', propia: false },
  ],
  profesor: [
    { id: '1', texto: 'Buenos días profesora, quería consultarle por la tarea de mañana.', propia: false },
    { id: '2', texto: 'Buenos días, es sobre fracciones. La revisamos el viernes en clases.', propia: true },
    { id: '3', texto: 'Perfecto, muchas gracias por la información.', propia: false },
  ],
  estudiante: [
    { id: '1', texto: 'Hola Emilia, ¿tienes alguna duda con la guía de fracciones?', propia: false },
    { id: '2', texto: 'Sí profe, no entendí bien el ejercicio 3.', propia: true },
    { id: '3', texto: 'Tranquila, lo revisamos juntas mañana antes de la prueba.', propia: false },
  ],
};

export function ChatScreen({ route, navigation }: Props) {
  const { nombre, iniciales, cargo, rol = 'apoderado' } = route.params;
  const [mensajes, setMensajes] = useState<Burbuja[]>(CONVERSACIONES[rol]);
  const [texto, setTexto] = useState('');

  const onEnviar = () => {
    if (!texto.trim()) return;
    setMensajes((prev) => [...prev, { id: String(prev.length + 1), texto: texto.trim(), propia: true }]);
    setTexto('');
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8} style={styles.backChevron}>
          <ChevronLeft size={20} color="rgba(255,255,255,0.7)" strokeWidth={2} />
        </Pressable>
        <Avatar iniciales={iniciales} bg={colors.violeta} size={34} />
        <View>
          <Text style={styles.nombre}>{nombre}</Text>
          <Text style={styles.cargo}>{cargo}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {mensajes.map((m) => (
          <View key={m.id} style={[styles.bubble, m.propia ? styles.bubblePropia : styles.bubbleOtro]}>
            <Text style={[styles.bubbleText, m.propia && styles.bubbleTextPropia]}>{m.texto}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={texto}
          onChangeText={setTexto}
          placeholder="Escribe un mensaje…"
          placeholderTextColor={colors.gris400}
          onSubmitEditing={onEnviar}
        />
        <Pressable style={styles.sendButton} onPress={onEnviar} hitSlop={6}>
          <Send size={16} color={colors.blanco} strokeWidth={2} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.blanco },
  header: {
    backgroundColor: colors.noche,
    paddingTop: 56,
    paddingBottom: 16,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backChevron: { marginRight: 2 },
  nombre: { ...typeScale.h3, fontSize: 14, color: colors.blanco },
  cargo: { fontSize: 11, color: 'rgba(255,255,255,0.5)' },
  body: { padding: spacing.md + 2, gap: spacing.sm + 2 },
  bubble: { maxWidth: '78%', borderRadius: 14, paddingVertical: 10, paddingHorizontal: 14 },
  bubbleOtro: {
    backgroundColor: colors.niebla,
    borderBottomLeftRadius: 4,
    alignSelf: 'flex-start',
  },
  bubblePropia: {
    backgroundColor: colors.indigo,
    borderBottomRightRadius: 4,
    alignSelf: 'flex-end',
  },
  bubbleText: { fontSize: 13, color: colors.noche },
  bubbleTextPropia: { color: colors.blanco },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.gris200,
  },
  input: {
    flex: 1,
    backgroundColor: colors.niebla,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: colors.noche,
    fontSize: 13,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.indigo,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
