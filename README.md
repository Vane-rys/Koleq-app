# Koleq — App (React Native + Expo)

Implementación real de Koleq, a partir del handoff de diseño (`Koleq Flujo Apoderado.dc.html`) y `DESIGN.md`.

## Cómo correrlo (necesitas la app "Expo Go" en tu celular)
```
npm start
```
Se abre una ventana con un código QR — escanéalo con la cámara del celular (iOS) o desde la
app Expo Go (Android) y la app carga en vivo. Cada vez que guardemos un cambio en el código,
se actualiza sola en tu celular.

## Estructura
- `App.tsx` — punto de entrada: carga fuentes y arma la navegación (React Navigation)
- `src/navigation/types.ts` — rutas de la app y sus parámetros (`RootStackParamList`)
- `src/data/mockHome.ts` — datos de prueba (Home, Notas, Hoja de vida, Mensajes, Pagos)
- `src/screens/` — pantallas del flujo:
  - `BienvenidaScreen.tsx` — portada con "Comenzar"
  - `EligeRolScreen.tsx` — selector de rol (apoderado / profesor / estudiante)
  - `AccesoApoderadoScreen.tsx` — "Crear cuenta" / "Iniciar sesión" (solo apoderado)
  - `LoginScreen.tsx` — inicio de sesión real por rol
  - `RegistroScreen.tsx` — registro de apoderado en 2 pasos (datos + hijos vinculados)
  - `HomeScreen.tsx` — enruta al Home real de cada rol (`home/ApoderadoHome.tsx`, `ProfesorHome.tsx`, `EstudianteHome.tsx`)
  - **Flujo completo de apoderado** (alcance confirmado del caso de estudio):
    - `NotasScreen.tsx` — notas por semestre (tabs Sem. 1 / Sem. 2 / Final), con estado vacío
    - `HojaDeVidaScreen.tsx` — lista de anotaciones + detalle de cada una
    - `MensajesScreen.tsx`, `NuevoMensajeScreen.tsx`, `ChatScreen.tsx` — bandeja, redactar y conversación con un profesor
    - `PagosScreen.tsx`, `ConfirmarPagoScreen.tsx`, `DatosTransferenciaScreen.tsx` — mensualidad pendiente, elegir método, datos bancarios
    - `LicenciaMedicaScreen.tsx` — formulario, adjuntar archivo y seguimiento del estado
- `src/components/`
  - `KoleqIcon.tsx` — isotipo animado · `BackLink.tsx` — "‹ Volver"
  - `DarkHeader.tsx` / `HomeCard.tsx` / `QuickAction.tsx` / `BottomNavBar.tsx` / `Avatar.tsx` — piezas de las pantallas de Inicio
  - `DarkField.tsx` / `LightField.tsx` — campos de formulario para fondo oscuro y fondo claro
- `src/theme/` — tokens de diseño de Koleq (`colors.ts`, `typography.ts`, `spacing.ts`)

Los íconos usan `lucide-react-native`, siguiendo la recomendación del handoff de diseño.

**Nota:** todo corre con datos de prueba (`mockHome.ts`), sin backend — pagos, licencias y
mensajes solo actualizan el estado local de la app, listo para conectarse a la API real de
tu hermana más adelante.

  - **Flujo completo de profesor**:
    - `CursosScreen.tsx` — mis cursos · `CursoDetalleScreen.tsx` — lista de alumnos, buscar, pasar lista
    - `PasarListaScreen.tsx` — marcar asistencia por alumno
    - `FichaAlumnoScreen.tsx` — 3 tabs: Nota (registrar evaluación), Anotación (historial), Medalla (otorgar)
    - `NuevaAnotacionScreen.tsx` — para todo el curso o un alumno específico
    - `MensajesProfesorScreen.tsx`, `NuevoComunicadoScreen.tsx` — bandeja de apoderados y comunicados (con copia opcional a apoderados)
    - `NuevaTareaScreen.tsx`, `AsignarIntegrantesScreen.tsx`, `SeguimientoEntregasScreen.tsx`, `EntregaDetalleScreen.tsx` — tareas grupales/individuales, armar grupos, revisar y calificar entregas

  - **Flujo completo de estudiante**:
    - `NotasEstudianteScreen.tsx` — mis notas (mismos tabs Sem. 1/2/Final, solo lectura)
    - `AgendaScreen.tsx` — próximas evaluaciones, esta semana y la siguiente
    - `TrabajosScreen.tsx`, `TrabajoDetalleScreen.tsx` — trabajos grupales/individuales, subir mi respuesta
    - Mensajes abre directo el chat con el profesor (no hay bandeja propia para este rol en el handoff)

Con esto los 3 roles (apoderado, profesor, estudiante) tienen su flujo completo navegable de punta a punta con datos de prueba.

## Ajustes de feedback (revisión Vane, 9 sep)
- **Notas**: el Sem. 1 es ahora el que trae notas (ya se cursó) y el Sem. 2 parte vacío (recién empieza) — antes estaba al revés. Además cada ramo (apoderado y estudiante) se puede tocar para desplegar/cerrar el detalle de sus evaluaciones.
- **Chats**: el contenido de ejemplo ahora depende de quién está mirando la conversación (`Chat` recibe un `rol`), para que la burbuja "propia" siempre sea coherente con el punto de vista de quien abrió el chat (apoderado, profesor o estudiante).
- **Nuevo mensaje**: "Para" ahora es una lista real de contactos del colegio (se puede elegir a quién escribir), no un destinatario fijo.
- **Asignar integrantes**: cada grupo tiene un "+ agregar" funcional que despliega los alumnos del curso todavía sin grupo — se pueden ir sumando (o sacando, tocando su chip) en vez de quedar solo como texto.
- **Pago con tarjeta**: se agregó el paso que faltaba — `PagoTarjetaScreen.tsx` — donde se elige una tarjeta guardada (o se ingresan los datos de una nueva) antes de confirmar el pago, en vez de pagar de inmediato al elegir el método.
- **Pago por transferencia**: subir el comprobante ahora deja un estado real adjunto (con opción de sacarlo) y "Ya transferí" queda deshabilitado hasta que se adjunte, en vez de ser solo un aviso de "próximamente".

## Segunda ronda de feedback (9 sep)
- **Nuevo mensaje / Asignar integrantes**: la lista de contactos o de alumnos ya no queda siempre desplegada en la pantalla (no escala si hay 30 personas) — ahora se abre un selector (`PickerModal.tsx`) en modal de pantalla completa, con buscador, pensado para mobile. Nuevo mensaje usa selección simple; Asignar integrantes usa selección múltiple y marca en gris a quien ya está en otro grupo.
- **Notas del profesor**: el campo de nota (`FichaAlumnoScreen`) ahora se puede escribir directo con el teclado numérico además de los botones −0.1 / +0.1 — antes el número solo se veía, no se podía tocar.
- **Fecha de entrega**: `NuevaTareaScreen` usa un selector de calendario propio (`DatePickerField.tsx`, sin librería nativa para que siga funcionando en Expo Go) en vez de un campo de texto libre. Bloquea fechas pasadas.
- **Mensajes del estudiante**: se agregó una bandeja propia (`MensajesEstudianteScreen.tsx`, con sus profesores por ramo) y el botón "+" para escribir un mensaje nuevo — antes "Mensajes" abría directo un chat fijo con un solo profesor y no había forma de iniciar una conversación nueva.

## Perfiles por rol (9 sep)
El handoff solo mostraba el ícono "Perfil" en la barra inferior, sin pantalla propia — se construyó una por rol, reutilizando el lenguaje visual del resto de la app (`src/screens/perfil/`, enrutado por `PerfilScreen.tsx` igual que `HomeScreen.tsx`):
- **Apoderado**: datos de contacto, hijos vinculados (con su promedio), y cuenta (notificaciones, privacidad, términos, ayuda — placeholders por ahora).
- **Profesor**: datos de contacto, listado de sus cursos, y la misma sección de cuenta.
- **Estudiante**: racha y medallas (reutiliza la data ya usada en su Home), y la misma sección de cuenta.

Los 3 terminan en un botón real de "Cerrar sesión" (antes era un aviso de "esta sección se construye en el próximo paso"). Todos los íconos de "Perfil" que quedaban sin acción en las pantallas del flujo ya navegan aquí.

## Transferencia queda "en revisión", no pagada (9 sep)
Antes, subir el comprobante de transferencia marcaba el pago como completado de inmediato — igual que con tarjeta. Eso no es correcto: una transferencia hay que verificarla contra la cuenta del colegio, a diferencia de la tarjeta que se confirma al instante con la pasarela de pago. Ahora `Pagos` tiene 3 estados (`pendiente` / `revision` / `pagado`, ver `PagosScreen.tsx`):
- **Tarjeta**: sigue confirmando el pago al toque (`PagoTarjetaScreen` → `estado: 'pagado'`).
- **Transferencia**: al confirmar "Ya transferí" con el comprobante adjunto, pasa a `estado: 'revision'` — una tarjeta azul "En revisión" que explica que administración del colegio está verificando que la transferencia llegó, sin marcar el pago como completado.

No hay un rol de "administración" en la app (los 3 roles del handoff son apoderado/profesor/estudiante) — ese lado de la revisión es trabajo de backend a futuro, no una pantalla nueva acá.

## Próximos pasos
- Notificación push de ejemplo (grupo 2 del handoff)
- Formulario real de Registro para profesor/estudiante si el colegio decide habilitarlo
- Conectar con datos reales cuando el backend esté disponible (reemplazar `src/data/mockHome.ts`)
