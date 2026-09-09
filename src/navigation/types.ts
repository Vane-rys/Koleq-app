export type Rol = 'apoderado' | 'profesor' | 'estudiante';

export type RootStackParamList = {
  Bienvenida: undefined;
  EligeRol: undefined;
  AccesoApoderado: undefined;
  Login: { rol: Rol };
  Registro: undefined;
  Home: { rol: Rol };
  Perfil: { rol: Rol };

  // Apoderado
  Notas: undefined;
  HojaDeVida: undefined;
  Mensajes: undefined;
  NuevoMensaje: { rol?: Rol } | undefined;
  Chat: { nombre: string; iniciales: string; cargo: string; rol?: Rol };
  Pagos: { estado?: 'pagado' | 'revision' } | undefined;
  ConfirmarPago: undefined;
  PagoTarjeta: undefined;
  DatosTransferencia: undefined;
  LicenciaMedica: undefined;

  // Profesor
  Cursos: undefined;
  CursoDetalle: { cursoId: string };
  PasarLista: { cursoId: string };
  FichaAlumno: { alumnoId: string; tabInicial?: 'nota' | 'anotacion' | 'medalla' };
  NuevaAnotacion: { modo: 'curso' | 'alumno'; cursoId?: string; alumnoId?: string };
  MensajesProfesor: undefined;
  NuevoComunicado: undefined;
  NuevaTarea: { cursoId: string };
  AsignarIntegrantes: { titulo: string; grupoDe: string; entrega: string; cursoId?: string };
  SeguimientoEntregas: { titulo: string };
  EntregaDetalle: { grupoNombre: string };

  // Estudiante
  MensajesEstudiante: undefined;
  NotasEstudiante: undefined;
  Agenda: undefined;
  Trabajos: undefined;
  TrabajoDetalle: { trabajoId: string };
};
